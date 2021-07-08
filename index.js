import {
  view,
  view_pt
} from './views/bootstrap5.js'
import {
  component
} from 'https://cdn.jsdelivr.net/gh/marcodpt/component/index.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'
import {
  query
} from 'https://cdn.jsdelivr.net/gh/marcodpt/query/index.js'
import translate from './language.js'
import operators from './operators.js'
import getFilters from './filters.js' 

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  const t = translate(language)
  const vw = language == 'pt' ? view_pt : view
  var N = null
  var O = operators(t)
  const F = {}
  const Q = {}
  const Z = {}
  const Query = {
    count: null,
    totals: null,
    Rows: null
  }
  const getQuery = (Q, key) => query('', Q, 
    key == 'totals' ? {
      _ids: null,
      _skip: null,
      _limit: null,
      _group: '',
      _filter: (Q._filter || []).concat(
        Q._ids && Q._ids.length ? 'id~eq~'+Q._ids : []
      )
    } : key == 'count' ? {
      _ids: null,
      _skip: null,
      _limit: null,
      _keys: '*'
    } : {
      _ids: null
    }
  )

  const refresh = state => {
    const R = [{...state}]
    Object.keys(Query).filter(key => F[key] != null).forEach(key => {
      const q = getQuery(Q, key)
      if (Query[key] != q) {
        Query[key] = q
        if (key == 'count') {
          Z.N = null
        } else {
          R[0][key] = null
        }
      }
      if (R[0][key] == null) {
        R.push([
          dispatch => {
            Promise.resolve().then(() => {
              return F[key](Q)
            }).then(res => {
              dispatch(state => {
                if (key == 'count') {
                  Z.N = res
                  if (Q._limit == null && F.limit && F.limit.length) {
                    Q._limit = F.limit[0]
                  } else {
                    Q._limit = parseInt(Q._limit)
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
                } else {
                  state[key] = res
                }
                return {...state}
              })
            })
          }
        ])
      }
    })

    return R
  }

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
    download,
    change
  }) => {
    const I = schema.items || {}
    const P = I.properties || {}
    const Fields = getFields(schema)
    const Filter = {
      field: null,
      operator: null,
      value: null,
      strict: false
    }
    const Values = {}

    if (data instanceof Array) {
      F.Rows = () => data
      F.count = () => data.length
      F.totals = totals == null ? null : () => totals(data, Q)
      F.values = key => {
        V = data.reduce((V, row) => {
          if (V.indexOf(row[key]) == -1) {
            V.push(row[key])
          }
          return V
        }, [])
        V.sort()
        return V
      }
    } else {
      F.Rows = data
      F.count = count
      F.totals = totals
      F.values = values
    }

    if (operators) {
      O = operators.then ? null : operators
    }

    return component(e, vw, [{
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
      Links: (I.links || []).map(link => row => row ? {
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
      Fields: Object.keys(P).map(name => row => ({
        title: P[name].title,
        href: row ? render(P[name].href, row) : null,
        data: !row || row[name] == null ? '' : row[name],
        format: P[name].format || P[name].type,
        name: row == null ? name : null
      })),
      tab: '',
      check: (row, exec) => {
        Q._ids = Q._ids || []
        if (exec) {
          return state => {
            const toggle = row => {
              const i = Q._ids.indexOf(row.id)
              if (i == -1) {
                Q._ids.push(row.id)
              } else {
                Q._ids.splice(i, 1)
              }
            }
            row ? toggle(row) : state.Rows.forEach(row => toggle(row))

            return refresh(state)
          }
        } else {
          return Q._ids.indexOf(row.id) != -1
        }
      },
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
              return refresh({...state})
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
          return F.limit.length <= 1 ? null : F.limit.map(l => ({
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
          if (F.limit == null) {
            F.limit = limit == null ? [] :
              limit instanceof Array ? limit : [limit]
            F.limit = F.limit.filter(l => !isNaN(l) && l > 0)
            if (F.limit.length && Q._limit == null) {
              Q._limit = parseInt(F.limit[0]) || 10
            }
          }
          return Q._limit
        }
      }
    }, O != null ? false : [
      dispatch => {
        Promise.resolve().then(() => {
          return operators
        }).then(res => {
          O = res
          dispatch(state => ({...state}))
        })
      }
    ]], (state, Query) => {
      Object.keys(Q).forEach(key => {
        delete Q[key]
      })
      Object.keys(Query).forEach(key => {
        Q[key] = Query[key]
      })
      return refresh(state)
    })
  }
}

const table = comp()
const table_pt = comp('pt')

export {table, table_pt}
