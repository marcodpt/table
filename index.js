import {
  table,
  table_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/views/index.js'
import {
  createNanoEvents
} from 'https://cdn.jsdelivr.net/npm/nanoevents@6.0.0/index.js'

const comp = language => {
  const view = language == 'pt' ? table_pt : table

  return (e, params) => {
    const emitter = createNanoEvents()

    app({
      init: setInit(params),
      view: view,
      node: e,
      subscriptions: () => [[
        dispatch => {
          const unbind = emitter.on('update', query => {
            requestAnimationFrame(() => dispatch(state => ({
              ...state,
              model: {
                ...state.model,
                ...model
              }
            })))
          })
          return () => unbind()
        }
      ]]
    })

    return model => {
      emitter.emit('update', query)
    }
  }
}
