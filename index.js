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

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  const vw = language == 'pt' ? view_pt : view
  const F = {}
  const Q = {}
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
        R[0][key] = null
      }
      if (R[0][key] == null) {
        R.push([
          dispatch => {
            Promise.resolve().then(() => {
              return F[key](Q)
            }).then(res => {
              dispatch(state => {
                state[key] = res
                return {...state}
              })
            })
          }
        ])
      }
    })

    return R
  }

  return (e, {
    schema,
    data,
    totals,
    count,
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

    if (data instanceof Array) {
      F.Rows = () => data
      F.count = () => data.length
      F.totals = totals == null ? null : () => totals(data, Q)
    } else {
      F.Rows = data
      F.count = count
      F.totals = totals
    }

    return component(e, vw, {
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
      page: !limit ||
        !limit.length ||
        isNaN(Q._limit) ||
        !parseInt(Q._limit)
      ? null : (action) => {
        const limit = parseInt(Q._limit)
        const skip = isNaN(Q._skip) ? 0 : parseInt(Q._skip)

        if (action == 'rr') {
          return !skip || skip < limit ? null : state => {
            delete Q._skip
            return refresh(state)
          }
        } else if (action == 'r') {
          return !skip || skip < limit ? null : state => {
            Q._skip = skip - limit
            if (Q._skip <= 0) {
              delete Q._skip
            }
            return refresh(state)
          }
        } else if (action == 'f') {
          return skip + limit > N ? null : state => {
            Q._skip = skip + limit
            return refresh(state)
          }
        } else if (action == 'ff') {
          return skip + limit > N ? null : state => {
            Q._skip = Math.floor(N / limit)
            return refresh(state)
          }
        } else if (action == 'options') {
          const p = 4
          const R = []
          for (var i = 1; i <= p; i++) {
            R.push({value: i, label: `Page ${i} of ${p}`})
          }
          return R
        } else if (action == 'change') {
          return (state, ev) => {
            alert(`page: ${ev.target.value}`)
            return state
          }
        } else if (action == 'page') {
          return 1
        } else if (action == 'limiters') {
          return null
        } else if (action == 'limiter') {
          return null
        } else if (action == 'limit') {
          return null
        }
      }
    }, (state, Query) => {
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
