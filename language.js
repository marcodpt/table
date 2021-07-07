const lang = {
  en: {
    back: 'Back',
    search: 'Search',
    filter: 'Filter',
    group: 'Group',
    ungroup: 'Ungroup',
    download: 'Download',
    pager: ({page, pages}) => `Page ${page} of ${pages}`,
    limiter: ({limit}) => `${limit} items per page`
  },
  pt: {
    back: 'Voltar',
    search: 'Buscar',
    filter: 'Filtrar',
    group: 'Agrupar',
    ungroup: 'Desagrupar',
    download: 'Exportar',
    pager: ({page, pages}) => `Página ${page} de ${pages}`,
    limiter: ({limit}) => `${limit} itens por página`
  }
}

export default language => (key, params) => {
  const F = (lang[language] || lang.en || {})[key]
  return F == null ? key : typeof F == 'function' ? F(params) : key
}
