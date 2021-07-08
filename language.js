const lang = {
  en: {
    back: 'Back',
    search: 'Search',
    filter: 'Filter',
    group: 'Group',
    ungroup: 'Ungroup',
    download: 'Download',
    pager: ({page, pages}) => `Page ${page} of ${pages}`,
    limiter: ({limit}) => `${limit} items per page`,
    ct: 'contains',
    nc: 'not contains',
    eq: 'equals',
    ne: 'not equals',
    gt: 'greater than',
    ge: 'greater than or equal',
    lt: 'less than',
    le: 'less than or equal'
  },
  pt: {
    back: 'Voltar',
    search: 'Buscar',
    filter: 'Filtrar',
    group: 'Agrupar',
    ungroup: 'Desagrupar',
    download: 'Exportar',
    pager: ({page, pages}) => `Página ${page} de ${pages}`,
    limiter: ({limit}) => `${limit} itens por página`,
    ct: 'contêm',
    nc: 'não contêm',
    eq: 'igual',
    ne: 'diferente',
    gt: 'maior que',
    ge: 'maior que ou igual',
    lt: 'menor que',
    le: 'menor que ou igual'
  }
}

export default language => (key, params) => {
  const F = (lang[language] || lang.en || {})[key]
  return F == null ? key : typeof F == 'function' ? F(params) : F
}
