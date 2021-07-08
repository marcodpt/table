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

export default {
  schema: {
    ...schema,
    title: 'Remote table',
    description: ''
  },
  data: Q => wait(transform(data)(Q), 1000),
  count: Q => transform(data)({
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
  operators: wait(operators(translate()), 1000),
  sort: true,
  search: true,
  filter: true,
  limit: [10, 2, 5, 20, 50, 100]
}
