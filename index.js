import {
  table,
  table_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/views/index.js'
import {
  createNanoEvents
} from 'https://cdn.jsdelivr.net/npm/nanoevents@6.0.0/index.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'
import {query} from 'https://cdn.jsdelivr.net/gh/marcodpt/query/index.js'
import {app} from 'https://cdn.jsdelivr.net/npm/hyperapp@2.0.18/index.min.js'

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  const view = language == 'pt' ? table_pt : table

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
    const emitter = createNanoEvents()
    const I = schema.items || {}
    const P = I.properties || {}

    app({
      init: {
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
      },
      view: view,
      node: e,
      subscriptions: () => [[
        dispatch => {
          const unbind = emitter.on('update', q => {
            requestAnimationFrame(() => dispatch(state => ({
              ...state,
              query: q
            })))
          })
          return () => unbind()
        }
      ]]
    })

    return model => {
      emitter.emit('update', q)
    }
  }
}

const t = comp()
const t_pt = comp('pt')

export {
  t as table,
  t_pt as table_pt
}
