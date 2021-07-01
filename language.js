const lang = {
  en: {
    back: 'Back',
    search: 'Search',
    filter: 'Filter',
    group: 'Group',
    ungroup: 'Ungroup',
    download: 'Download'
  },
  pt: {
    back: 'Voltar',
    search: 'Buscar',
    filter: 'Filtrar',
    group: 'Agrupar',
    ungroup: 'Desagrupar',
    download: 'Exportar'
  }
}

export default language => key =>
  (lang[language] || lang.en || {})[key] || key
