import {h, text, app} from 'https://unpkg.com/hyperapp'
import {table} from './index.js'
import simple from './samples/simple.js'

const X = {
  simple
}

window.setView = select => {
  const v = select.value
  const app = document.getElementById('app')
  const e = app.cloneNode(false)
  app.replaceWith(e)
  if (X[v]) {
    const update = table(e, X[v])
  }
}

window.addEventListener('load', () => {
  const s = document.body.querySelector('select')
  const o = s.querySelector('option')
  Object.keys(X).forEach(key => {
    const p = o.cloneNode(false)
    p.setAttribute('value', key)
    p.setAttribute('label', key)
    s.appendChild(p)
  })
})
