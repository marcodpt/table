import {table} from './index.js'
import simple from './samples/simple.js'
import complete from './samples/complete.js'
import remote from './samples/remote.js'

export default {
  title: 'Table component',
  gh: 'https://github.com/marcodpt/table',
  samples: {
    remote,
    simple,
    complete
  },
  comp: table,
  updates: {
    clear: {},
    age32: {
      age: 32
    }
  }
}
