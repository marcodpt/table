import schema from './schema.js'
import data from './data.js'
import transform from './transform.js'

export default {
  schema: schema,
  data: Q => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(transform(data)(Q))
      }, 1000)
    })
  },
  count: Q => transform(data)({
    ...Q,
    _limit: null,
    _skip: null
  }).length,
  back: () => alert('back'),
  sort: true,
  search: true,
  limit: [10, 2, 5, 20, 100]
}
