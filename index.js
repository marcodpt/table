import {
  view,
  view_pt
} from './views/bootstrap5.js'
import {
  component
} from 'https://cdn.jsdelivr.net/gh/marcodpt/component/index.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  const vw = language == 'pt' ? view_pt : view

  return (e, {
    schema,
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
    download
  }) => {
    const I = schema.items || {}
    const P = I.properties || {}

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
    }, (state, query) => ({
      ...state,
      query: q
    }))
  }
}

const table = comp()
const table_pt = comp('pt')

export {table, table_pt}
