export default (Q, O) => (Q._filter || [])
  .map(f => O.map(o => {
    const F = f.split(o.value)
    const l = F.length
    const key = F.shift()
    const value = F.join(o.value)
    return {
      len: l,
      filter: o.filter,
      key: key,
      label: o.label,
      value: value,
      sign: f
    }
  }).filter(F => F.len > 1)[0])
  .filter(f => f != null)
