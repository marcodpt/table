import {
  spinner,
  data,
  link,
  field
} from 'https://cdn.jsdelivr.net/gh/marcodpt/views/index.js'
import translate from '../language.js'

const sm = l =>
  link({
    ...l,
    size: 'sm',
    title: l.icon ? null : l.title,
    type: l.href === undefined && l.click === undefined ? null : l.type
  })

const cell = (h, {
  head,
  left,
  full
}, content) => 
  h(head ? 'th' : 'td', {
    class: [
      'align-middle',
      left ? null : 'text-center'
    ],
    colspan: full ? '100%' : null
  }, content)

const base = (h, {Heads, Rows, Cols}) => 
  h('table', {
    class: [
      "table",
      "table-striped",
      "table-bordered",
      "table-hover",
      "table-center"
    ]
  }, [
    h('thead', {}, Heads.filter(h => h != null).map(({
      content,
      type
    }) => 
      ([
        'inline',
        'raw'
      ]).indexOf(type) != -1 ? h('tr', {}, 
        cell(h, {
          head: true,
          full: true
        }, [
          type == 'inline' ? h('div', {
            class: 'row gx-1 justify-content-center'
          }, content.filter(d => d).map(data => {
            return h('div', {
              class: 'col-auto'
            }, data)
          }
          )) : content
        ])
      ) : !Cols || !Cols.filter(c => c).length ? null :
        h('tr', {}, Cols.map(c => c && c(content, type)))
    )),
    !Cols || !Cols.filter(c => c).length ? null : h('tbody', {}, 
      !Rows ? h('tr', {}, [
        cell(h, {
          full: true
        }, spinner({size: '5x'}))
      ]) : Rows.map(row => h('tr', {}, Cols.map(c => c && c(row))))
    )
  ])

const vw = language => {
  const t = translate(language)

  return (h, text) => ({
    title,
    description,
    back,
    Actions,
    Links,
    Fields,
    check,
    sort,
    page,
    filter,
    group,
    search,
    csv,
    tab,
    totals,
    Rows
  }) => base(h, {
    Heads: [
      !title ? null : {
        type: 'raw',
        content: text(title)
      },
      !description ? null : {
        type: 'raw',
        content: h('div', {
          class: [
            'm-auto',
            'text-left'
          ],
          style: {
            maxWidth: '300px'
          }
        }, data({
          data: description,
          type: 'info'
        }))
      },
      !back && !Actions ? null : {
        type: 'inline',
        content: [!back ? null : {
          type: 'secondary',
          icon: 'arrow-left',
          title: t('back'),
          click: back
        }].concat(Actions || []).filter(a => a).map(a => link(a))
      },
      !page || !page('limit') ? null : {
        type: 'inline',
        content: [
          link({
            type: 'secondary',
            icon: 'fast-backward',
            click: page('rr')
          }),
          link({
            type: 'secondary',
            icon: 'step-backward',
            click: page('r')
          }),
          field({
            options: page('options'),
            change: page('change'),
            value: page('page')
          }),
          !page('limiters') ? null : field({
            options: page('limiters'),
            change: page('limiter'),
            value: page('limit')
          }),
          link({
            type: 'secondary',
            icon: 'step-forward',
            click: page('f')
          }),
          link({
            type: 'secondary',
            icon: 'fast-forward',
            click: page('ff')
          })
        ]
      },
      tab == 'filter' || tab == 'group' || !(
        csv || filter || group || search
      ) ? null : {
        type: 'raw',
        content: h('div', {
          class: "input-group"
        }, [
          !search ? null : link({
            icon: 'times',
            type: 'secondary',
            click: search('clear')
          }),
          !search ? null : field({
            change: search('change'),
            value: search('value'),
            placeholder: t('search')
          }),
          !filter ? null : link({
            icon: 'filter',
            type: 'info',
            title: t('filter'),
            click: filter('open')
          }),
          !filter || !filter('active') ? null : link({
            type: 'info',
            dropdown: true
          }),
          !filter || !filter('active') ? null : h('ul', {
            class: 'dropdown-menu'
          }, filter('items').map(f => 
            h('li', {}, [
              link({
                ...f,
                icon: 'times',
                cls: 'dropdown-item'
              })
            ])
          )),
          !group || group('active') ? null : link({
            icon: 'th',
            type: 'warning',
            title: t('group'),
            click: group('open')
          }),
          !group || !group('active') ? null : link({
            icon: 'times',
            type: 'warning',
            title: t('ungroup'),
            click: group('clear')
          }),
          !csv ? null : link({
            icon: 'file-csv',
            type: 'secondary',
            title: t('csv'),
            click: csv('run'),
            pending: csv('pending')
          })
        ])
      },
      !filter || tab != 'filter' ? null : {
        type: 'inline',
        content: [
          link({
            type: 'secondary',
            icon: 'times',
            click: filter('close')
          }),
          field({
            change: filter('onfield'),
            options: filter('fields'),
            value:  filter('field')
          }),
          field({
            change: filter('onoperator'),
            options: filter('operators'),
            value: filter('operator')
          }),
          field({
            change: filter('onvalue'),
            options: filter('values'),
            value: filter('value')
          }),
          link({
            icon: 'filter',
            type: 'info',
            title: t('filter'),
            click: filter('run')
          })
        ]
      },
      !group || tab != 'group' ? null : {
        type: 'inline',
        content: [
          link({
            type: 'secondary',
            icon: 'times',
            click: group('close')
          }),
          field({
            options: group('fields'),
            change: group('change')
          }),
          link({
            icon: 'th',
            type: 'warning',
            title: t('group')+group('current'),
            click: group('run')
          })
        ]
      },
      !totals ? null : {
        content: totals,
        type: 'totals'
      },
      {
        content: null,
        type: null
      }
    ],
    Cols: [
      !check ? null : (row, type) => 
        type == 'totals' ? cell(h, {}) :
        row == null ? cell(h, {
          head: true
        }, link({
          type: 'success',
          icon: 'check',
          size: 'sm',
          click: check(null, true)
        })) : cell(h, {}, field({
          type: 'checkbox',
          checked: check(row),
          change: check(row, true)
        }))
    ].concat((Links || []).map(l => (row, type) => 
      type == 'totals' ? cell(h, {}) :
      row == null ? cell(h, {
        head: true
      }, sm(l())) : cell(h, {}, sm(l(row)))
    )).concat((Fields || []).map(f => (row, type) => {
      const X = f(row)
      if (row == null) {
        return cell(h, {
          head: true
        }, link({
          click: sort ? sort(X.name, true) : null,
          title: X.title,
          after: sort ? sort(X.name) : null
        }))
      } else {
        return cell(h, {
          left: X.data != null && X.format == 'text'
        }, data({
          ...X,
          href: type == 'totals' ? null : X.href
        }))
      }
    })),
    Rows
  })
}

const view = vw('en')
const view_pt = vw('pt')

export {view, view_pt}
