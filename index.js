import {
  view,
  view_pt
} from './views/bootstrap5.js'
import component from 
  'https://cdn.jsdelivr.net/gh/marcodpt/component@0.0.1/index.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'
import query from 'https://cdn.jsdelivr.net/gh/marcodpt/query@0.0.1/index.js'
import translate from './language.js'
import ops from './operators.js'
import getFilters from './filters.js' 
import transform from './transform.js'

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  const t = translate(language)
  const vw = language == 'pt' ? view_pt : view

  const getFields = schema => {
    const P = schema.items.properties
    return Object.keys(P).map(key => ({
      value: key,
      label: P[key].title
    }))
  }

  const getLabel = (X, value) => (X || []).reduce((label, x) => {
    if (value == label && x.value == value) {
      label = x.label
    }

    return label
  }, value)

  return (e, {
    schema,
    data,
    totals,
    count,
    values,
    operators,
    back,
    check,
    sort,
    limit,
    filter,
    group,
    search,
    csv,
    change,
    params
  }) => {
    var N = null
    var O = ops(t)
    const F = {}
    const Q = {}
    const Z = {}
    const Query = {
      count: null,
      totals: null,
      Rows: null
    }
    const getQuery = (key, R) => {
      const q = query('', Q, 
        key == 'totals' ? {
          _ids: null,
          _skip: null,
          _limit: null,
          _sort: null,
          _group: '',
          _filter: (Q._filter || []).concat(
            Q._ids ? 'id~eq~'+(Q._ids) : []
          )
        } : key == 'count' ? {
          _ids: null,
          _skip: null,
          _limit: null,
          _sort: null
        } : {
          _ids: null
        }
      )
      if (Query[key] != q && F[key] != null) {
        Query[key] = q
        if (key == 'count') {
          Z.N = null
        } else {
          R[0][key] = null
        }
      }
    }

    const Limiters = limit == null ? [] : 
      typeof limit == 'number' ? [limit] : limit
    const Filter = {
      field: null,
      operator: null,
      value: null,
      strict: false
    }
    const Group = []
    const Values = {}
    var Totals = []
    var pending = false

    if (data instanceof Array) {
      if (schema == null) {
        schema = {
          type: 'array',
          items: {
            type: 'object',
            properties: data.reduce((P, row) => {
              Object.keys(row).forEach(key => {
                P[key] = {
                  title: key
                }
              })
              return P
            }, {})
          }
        }
      }
      const handler = transform(data, totals == null ? data => ({}) : totals)
      F.Rows = handler
      F.count = (Q) => handler(Q).length
      F.totals = totals == null ? null : (Q) => handler(Q)[0] || {}
      F.values = key => {
        const V = data.reduce((V, row) => {
          if (V.indexOf(row[key]) == -1) {
            V.push(row[key])
          }
          return V
        }, [])
        V.sort(([
          'number',
          'integer'
        ]).indexOf(
          schema.items.properties[key].type
        ) != -1 ? (a, b) => a - b : undefined)
        return V
      }
    } else {
      F.Rows = data
      F.count = count
      F.totals = totals
      F.values = values
    }

    const I = schema.items || {}
    const P = I.properties || {}
    const Fields = getFields(schema)

    if (operators) {
      O = operators
    }

    const getState = () => {
      const G = (Q._group || '').split(',').filter(g => g.length)
      return {
        Links: G.length ? [] : 
          (I.links || []).map(link => row => row ? {
            href: render(link.href, row),
            icon: link.icon,
            type: link.type,
            title: link.title
          } : {
            href: link.multiple,
            icon: link.icon,
            type: link.type,
            title: link.title
          }),
        Fields: Object.keys(P).filter(key => 
          !G.length || Totals.indexOf(key) != -1 || G.indexOf(key) != -1
        ).map(name => row => ({
          title: P[name].title,
          href: row && !G.length ? render(P[name].href, row) : null,
          data: !row || row[name] == null ? '' : row[name],
          format: P[name].format || P[name].type,
          name: row == null ? name : null
        })),
        check: !check || G.length ? null : (row, exec) => {
          const I = Q._ids ? Q._ids.split(',') : [] 
          if (exec) {
            return state => {
              const toggle = row => {
                const i = I.indexOf(String(row.id))
                if (i == -1) {
                  I.push(row.id)
                } else {
                  I.splice(i, 1)
                }
                Q._ids = I.length ? I.join(',') : null
              }
              row ? toggle(row) : state.Rows.forEach(row => toggle(row))

              return refresh(state)
            }
          } else {
            return I.indexOf(String(row.id)) != -1
          }
        }
      }
    }

    const refresh = state => {
      const R = [{
        ...state,
        ...getState()
      }]

      var X = null
      R.push([
        dispatch => {
          Promise.resolve().then(() => {
            getQuery('count', R)
            return Z.N == null && F.count ?
              F.count(query(Query.count)) : Z.N
          }).then(res => {
            Z.N = res
            if (Q._limit == null && Limiters.length) {
              Q._limit = Limiters[0]
            } else {
              Q._limit = !isNaN(Q._limit) ? parseInt(Q._limit) : 0
            }
            Q._skip = isNaN(Q._skip) ? 0 : parseInt(Q._skip)
            Z.pages = Z.N && Q._limit ? Math.ceil(Z.N / Q._limit) : 1
            Z.page = Q._limit ? Math.ceil(Q._skip / Q._limit) + 1 : 1
            if (Z.page < 1) {
              Z.page = 1
            } else if (Z.page > Z.pages) {
              Z.page = Z.pages
            }
            Q._skip = (Z.page - 1) * Q._limit
            if (!Q._limit) {
              delete Q._skip
              delete Q._limit
            }
            getQuery('Rows', R)

            return R[0].Rows == null && F.Rows ?
              F.Rows(query(Query.Rows)) : R[0].Rows
          }).then(res => {
            X = res
            getQuery('totals', R)

            return R[0].totals == null && F.totals ?
              F.totals(query(Query.totals)) : R[0].totals
          }).then(res => {
            if (res) {
              Totals = Object.keys(res)
            }
            dispatch(state => ({
              ...state,
              Rows: X,
              totals: res
            }))
            change && change(Q)
          })
        }
      ])

      return R
    }

    const init = {
      title: schema.title,
      description: schema.description,
      back: !back ? null : state => {
        back()
        return state
      },
      Actions: (schema.links || []).map(link => ({
        href: link.href,
        icon: link.icon,
        type: link.type,
        title: link.title
      })),
      tab: '',
      sort: !sort ? null : (name, exec) => {
        if (exec) {
          return state => {
            if (Q[name] != null) {
              delete Q[name]
            } else {
              Q._sort = (Q._sort == name ? '-' : '')+name
            }
            return refresh(state)
          }
        } else {
          return Q[name] != null ? 'times' :
            Q._sort == name ? 'sort-down' :
            Q._sort == ('-'+name) ? 'sort-up' : 'sort'
        }
      },
      csv: !csv ? null : action => {
        if (action == 'pending') {
          return pending
        } else if (action == 'run') {
          return state => [
            {
              ...state
            }, [dispatch => {
              pending = true
              Promise.resolve().then(() => F.Rows({
                ...Q,
                _skip: null,
                _limit: null
              })).then(Data => {
                const nl = "\n"
                const sep = "\t"

                var data = ''
                data += Object.keys(P)
                  .map(key => P[key].title || key).join(sep)+nl
                data += Data.map(function (row) {
                  return Object.keys(P).map(function (field) {
                    return String(row[field])
                  }).join(sep)
                }).join(nl)

                pending = false
                dispatch(state => ({...state}))
                var link = document.createElement('a')
                link.setAttribute('href',
                  'data:text/plain;charset=utf-8,'+
                  encodeURIComponent(data)
                )
                link.setAttribute('download', csv)
                document.body.appendChild(link)
                link.click()
                link.parentNode.removeChild(link)
              })
            }]
          ]
        }
      },
      search: !search ? null : action => {
        const prefix = '_~ct~'
        const l = prefix.length
        if (action == 'clear' || action == 'change') {
          return (state, ev) => {
            Q._filter = (Q._filter || []).filter(f => f.substr(0, l) != prefix)
            if (action == 'change') {
              var v = ev.target.value
              if (v.length) {
                Q._filter.push(prefix+v)
              }
            }
            return refresh(state)
          }
        } else if (action == 'value') {
          return (Q._filter || []).reduce((search, item) => {
            if (!search.length && item.substr(0, l) == prefix) {
              search = item.substr(l)
            }
            return search
          }, '')
        }
      },
      filter: !filter ? null : action => {
        const getV = state => [
          {...state}, 
          !Filter.strict || Values[Filter.field] ? null : [
            dispatch => {
              Promise.resolve().then(() => {
                return F.values(Filter.field, Q)
              }).then(res => {
                Values[Filter.field] = res
                dispatch(state => ({...state}))
              })
            }
          ]
        ]
        if (action == 'open') {
          return !O || !O[0] ? null : state => {
            Filter.field = Fields[0] ? Fields[0].value : null
            Filter.operator = O[0].value
            Filter.strict = !F.values ? false : O[0].strict
            Filter.value = null

            return {
              ...state,
              tab: 'filter'
            }
          }
        } else if (action == 'active') {
          const prefix = '_~ct~'
          const l = prefix.length
          return (Q._filter || [])
            .filter(f => f.substr(0, l) != prefix).length > 0
        } else if (action == 'items') {
          return getFilters(Q, O).map(f => ({
            title: getLabel(Fields, f.key)+' '+f.label+' '+f.value,
            click: state => {
              Q._filter = Q._filter.filter(x => x != f.sign)
              return refresh(state)
            }
          }))
        } else if (action == 'close') {
          return state => ({
            ...state,
            tab: ''
          })
        } else if (action == 'onfield') {
          return (state, ev) => {
            Filter.field = ev.target.value
            Filter.value = null
            return getV(state)
          }
        } else if (action == 'fields') {
          return Fields
        } else if (action == 'field') {
          return Filter.field
        } else if (action == 'onoperator') {
          return (state, ev) => {
            Filter.operator = ev.target.value
            const strict = !F.values ? false : 
              O.filter(o => o.value == Filter.operator)[0].strict
            if (Filter.strict != strict) {
              Filter.value = null
              Filter.strict = strict
            }
            const k = Filter.field
            return getV(state)
          }
        } else if (action == 'operators') {
          return O
        } else if (action == 'operator') {
          return Filter.operator
        } else if (action == 'onvalue') {
          return (state, ev) => {
            Filter.value = ev.target.value
            return {...state}
          }
        } else if (action == 'values') {
          const V = Values[Filter.field]
          return Filter.strict ? V || null : undefined
        } else if (action == 'value') {
          return Filter.value
        } else if (action == 'run') {
          return Filter.value == null ? null : state => {
            Q._filter = (Q._filter || [])
            Q._filter.push(
              Filter.field+Filter.operator+Filter.value
            )
            return refresh({
              ...state,
              tab: ''
            })
          }
        }
      },
      group: !group ? null : action => {
        if (action == 'active') {
          return Q._group != null && Q._group.length
        } else if (action == 'current') {
          const label = Group.map(k => getLabel(Fields, k)).join(', ')
          return label ? ': '+label : ''
        } else if (action == 'open') {
          while (Group.length) {
            Group.pop()
          }
          return state => ({
            ...state,
            tab: 'group'
          })
        } else if (action == 'clear') {
          return state => {
            delete Q._group
            return refresh(state)
          }
        } else if (action == 'close') {
          return state => ({
            ...state,
            tab: ''
          })
        } else if (action == 'fields') {
          return Fields
        } else if (action == 'change') {
          return (state, ev) => {
            const k = ev.target.value
            const i = Group.indexOf(k)
            if (i != -1) {
              Group.splice(i, 1)
            } else {
              Group.push(k)
            }

            return {...state}
          }
        } else if (action == 'run') {
          return !Group.length ? null : state => {
            Q._group = Group.join(',')
            return refresh({
              ...state,
              tab: ''
            })
          }
        }
      },
      page: action => {
        if (action == 'rr') {
          return Z.page <= 1 ? null : state => {
            delete Q._skip
            return refresh(state)
          }
        } else if (action == 'r') {
          return Z.page <= 1 ? null : state => {
            Q._skip = (Z.page - 2) * Q._limit
            if (Q._skip <= 0) {
              delete Q._skip
            }
            return refresh(state)
          }
        } else if (action == 'f') {
          return Z.page >= Z.pages ? null : state => {
            Q._skip = Z.page * Q._limit
            return refresh(state)
          }
        } else if (action == 'ff') {
          return Z.page >= Z.pages ? null : state => {
            Q._skip = (Z.pages - 1) * Q._limit
            return refresh(state)
          }
        } else if (action == 'options') {
          const R = []
          for (var page = 1; page <= Z.pages; page++) {
            R.push({value: page, params: {page, pages: Z.pages}})
          }
          return R.map(r => ({
            value: r.value,
            label: t('pager', r.params)
          }))
        } else if (action == 'change') {
          return (state, ev) => {
            Z.page = parseInt(ev.target.value)
            Q._skip = (Z.page - 1) * Q._limit
            return refresh(state)
          }
        } else if (action == 'page') {
          return Z.page
        } else if (action == 'limiters') {
          return Limiters.length <= 1 ? null : Limiters.map(l => ({
            value: l,
            label: t('limiter', {limit: l})
          }))
        } else if (action == 'limiter') {
          return (state, ev) => {
            Q._limit = parseInt(ev.target.value)
            Q._skip = (Z.page - 1) * Q._limit
            return refresh(state)
          }
        } else if (action == 'limit') {
          return Q._limit
        }
      },
      ...getState()
    }

    const update = (state, Query) => {
      Object.keys(Q).forEach(key => {
        delete Q[key]
      })
      Object.keys(Query).forEach(key => {
        Q[key] = Query[key]
      })
      return refresh(state)
    }

    return component(
      e, vw, params !== null ? update(init, params || {}) : init, update
    )
  }
}

const table = comp()
const table_pt = comp('pt')

export {table, table_pt}
