import schema from './schema.js'
import data from './data.js'
import transform from '../transform.js'
import operators from '../operators.js'
import translate from '../language.js'

const wait = (res, time) => new Promise(resolve => {
  setTimeout(() => {
    resolve(res)
  }, time)
})

const handler = transform(data, {
  id: 0,
  age: 0, 
  balance: 0
}, (R, row) => {
  R.id += 1
  R.age += row.age
  R.balance += row.balance

  return R
}, R => {
  R.age = (R.age / (R.id || 1)).toFixed(1)
  R.balance = R.balance.toFixed(2)
  return R
})

export default {
  schema: {
    ...schema,
    title: 'Remote table',
    description: ''
  },
  data: Q => wait(handler(Q), 1000),
  totals: Q => wait(handler({
    ...Q,
    _group: ''
  })[0], 1000),
  count: Q => handler({
    ...Q,
    _limit: null,
    _skip: null
  }).length,
  back: () => location.hash = '',
  values: key => {
    const V = data.reduce((V, row) => {
      if (V.indexOf(row[key]) == -1) {
        V.push(row[key])
      }
      return V
    }, [])
    V.sort()
    return wait(V, 1000)
  },
  operators: operators(translate()),
  sort: true,
  search: true,
  filter: true,
  group: true,
  check: true,
  limit: [10, 2, 5, 20, 50, 100]
}
