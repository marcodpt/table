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
  back: () => alert('back'),
  sort: true
}
