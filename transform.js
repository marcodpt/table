import operators from './operators.js' 
import getFilters from './filters.js' 

export default (data, base, reducer, finisher) => Q => {
  base = base || {}
  reducer = reducer || (B => B)
  finisher = finisher || (R => R)

  const O = operators(k => k)
  var x = data

  x = x.filter(row => Object.keys(Q).reduce(
    (pass, k) => pass && (k.substr(0, 1) == '_' || row[k] == Q[k]),
    true
  ))

  const F = getFilters(Q, O)

  x = x.filter(row => F.reduce((pass, O) => {
    return pass && (O.key == '_' ? Object.keys(row).reduce((pass, key) => {
      return pass || O.filter(O.value, row[key])
    }, false) : O.filter(O.value, row[O.key]))
  }, true))

  if (Q._sort) {
    var k = Q._sort.split(',')[0]
    var m = 1
    if (k.substr(0, 1) == '-') {
      k = k.substr(1)
      m = -1
    }
    x.sort((a, b) => a[k] > b[k] ? m : b[k] > a[k] ? (-1 * m) : 0)
  }

  if (Q._group != null) {
    const G = Q._group.split(',').filter(g => g.length)

    x = x.reduce((V, row) => {
      const X = G.reduce((X, k) => {
        X[k] = row[k]
        return X
      }, {})
      const R = V.filter(v => G.reduce(
        (pass, k) => pass && v[0][k] == X[k],
        true
      ))[0]

      if (R == null) {
        V.push([X, [row]])
      } else {
        R[1].push(row)
      }

      return V
    }, [])

    x = x.map(v => ({
      ...finisher(v[1].reduce(reducer, {...base})),
      ...v[0]
    }))
  }

  if (Q._limit != null && !isNaN(Q._limit)) {
    const limit = parseInt(Q._limit)
    const skip = !isNaN(Q._skip) ? parseInt(Q._skip) : 0
    x = x.slice(skip, skip + limit)
  }

  return x
}
