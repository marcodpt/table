const lang = {
  en: {
    back: 'Back',
    search: 'Search',
    filter: 'Filter',
    group: 'Group',
    ungroup: 'Ungroup',
    download: 'Download',
    pager: ({page, pages}) => `Page ${page} of ${pages}`
  },
  pt: {
    back: 'Voltar',
    search: 'Buscar',
    filter: 'Filtrar',
    group: 'Agrupar',
    ungroup: 'Desagrupar',
    download: 'Exportar',
    pager: ({page, pages}) => `Página ${page} de ${pages}`
  }
}

export default language => key =>
  (lang[language] || lang.en || {})[key] || key
