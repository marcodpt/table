export default (t) => [
  {
    value: '~ct~',
    label: t('ct'),
    strict: false,
    filter: (fixed, value) => String(value)
      .toLowerCase().indexOf(fixed.toLowerCase()) != -1
  }, {
    value: '~nc~',
    label: t('nc'),
    strict: false,
    filter: (fixed, value) => String(value)
      .toLowerCase().indexOf(fixed.toLowerCase()) == -1
  }, {
    value: '~eq~',
    label: t('eq'),
    strict: true,
    filter: (fixed, value) => value == fixed
  }, {
    value: '~ne~',
    label: t('ne'),
    strict: true,
    filter: (fixed, value) => value != fixed
  }, {
    value: '~gt~',
    label: t('gt'),
    strict: true,
    filter: (fixed, value) => value > fixed
  }, {
    value: '~ge~',
    label: t('ge'),
    strict: true,
    filter: (fixed, value) => value >= fixed
  }, {
    value: '~lt~',
    label: t('lt'),
    strict: true,
    filter: (fixed, value) => value < fixed
  }, {
    value: '~le~',
    label: t('le'),
    strict: true,
    filter: (fixed, value) => value <= fixed
  }
]
