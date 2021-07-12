import schema from './schema.js'
import data from './data.js'

export default {
  schema: schema,
  data: data,
  totals: data => {
    const R = (data || []).reduce((R, row) => {
      R.id += 1
      R.age += row.age
      R.balance += row.balance

      return R
    }, {
      id: 0,
      age: 0, 
      balance: 0
    })

    R.age = (R.age / (R.id || 1)).toFixed(1)
    R.balance = R.balance.toFixed(2)
    return R
  },
  params: {
    _sort: '-id',
    _ids: '1,2,3'
  },
  back: () => location.hash = '',
  sort: true,
  search: true,
  filter: true,
  group: true,
  check: true,
  csv: 'data.csv',
  limit: [10, 2, 5, 20, 50, 100],
  change: (Q) => console.log(Q)
}
