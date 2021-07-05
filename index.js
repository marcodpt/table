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
  const Store = {
    data: null,
    totals: null,
    count: null
  }
  const Query = {
    data: null,
    totals: null,
    count: null
  }
  var update = null

  const refresh = F => Q => {
    const q = {
      totals: query('', Q, {
        _ids: null,
        _skip: null,
        _limit: null,
        _group: '',
        _filter: (Q._filter || []).concat(
          Q._ids && Q._ids.length ? 'id~eq~'+Q._ids : []
        )
      }),
      count: query('', Q, {
        _ids: null,
        _skip: null,
        _limit: null,
        _keys: '*'
      }),
      data: query('', Q, {
        _ids: null
      })
    }

    const getP = key => {
      if (q[key] !== Query[key] && F[key] != null) {
        Query[key] = q[key]
        return F[key](query(q[key]))
      } else {
        return Store[key]
      }
    }

    return Promise.resolve().then(() => {
      return getP('totals')
    }).then(res => {
      Store.totals = res
      return getP('count')
    }).then(res => {
      Store.count = res
      return getP('data')
    }).then(res => {
      Store.data = res
    })
  }

  return (e, {
    schema,
    query,
    data,
    totals,
    count,
    back,
    check,
    sort,
    page,
    filter,
    group,
    search,
    download,
    change
  }) => {
    const I = schema.items || {}
    const P = I.properties || {}
    update = refresh({data, totals, count})

    return component(e, vw, {
      title: schema.title,
      description: schema.description,
      back: back,
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
        data: !row || row[name] == null ? '' : row[name]
      })),
      tab: '',
      Rows: data
    }, (state, Q) => {
      const R = []
      refresh(Q)

      R.push({
      })

      return R
    })
  }
}

const table = comp()
const table_pt = comp('pt')

export {table, table_pt}
