import {view, view_pt} from './views/bootstrap5.js'

const back = state => {
  return [state, [() => alert("back")]]
}

const click = state => {
  return [state, [() => alert("click")]]
}

export default [
  [
    "table",
    view,
    [
      [
        {},
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
            </thead>
          </table>
        `,
        "no params"
      ], [
        {
          title: "sample table"
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                ><span>sample table</span></th>
              </tr>
            </thead>
          </table>
        `,
        "title"
      ], [
        {
          title: 'sample table',
          description: [
            "Hello world!",
            "This is my table, and this table have a description support! :)",
            "This is a long text test for see how it fits in the layout!",
            "Hope you enjoy!"
          ].join('\n')
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                ><span title="${[
                  "Hello world!",
                  "This is my table, and this table have a description support! :)",
                  "This is a long text test for see how it fits in the layout!",
                  "Hope you enjoy!"
                ].join('\n')}">sample table</span></th>
              </tr>
            </thead>
          </table>
        `,
        "description"
      ], [
        {
          back: back
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-arrow-left"></i> Back</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "back"
      ], [
        {
          Actions: [
            {
              type: "success",
              href: "#insert",
              icon: "pencil-alt",
              title: "Insert"
            }, {
              type: "warning",
              href: "#edit",
              icon: "edit",
              title: "Update"
            }, {
              type: "danger",
              href: "#remove",
              icon: "trash",
              title: "Remove"
            }
          ]
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <a
                        class="btn btn-success"
                        href="#insert"
                      ><i class="fas fa-pencil-alt"></i> Insert</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-warning"
                        href="#edit"
                      ><i class="fas fa-edit"></i> Update</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-danger"
                        href="#remove"
                      ><i class="fas fa-trash"></i> Remove</a>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Actions"
      ], [
        {
          page: (action) => {
            if (action == 'rr') {
              return null
            } else if (action == 'r') {
              return null
            } else if (action == 'f') {
              return state => {
                alert('f')
                return state
              }
            } else if (action == 'ff') {
              return state => {
                alert('ff')
                return state
              }
            } else if (action == 'options') {
              const p = 4
              const R = []
              for (var i = 1; i <= p; i++) {
                R.push({value: i, label: `Page ${i} of ${p}`})
              }
              return R
            } else if (action == 'change') {
              return (state, ev) => {
                alert(`page: ${ev.target.value}`)
                return state
              }
            } else if (action == 'page') {
              return 1
            } else if (action == 'limiters') {
              return null
            } else if (action == 'limiter') {
              return null
            } else if (action == 'limit') {
              return 10
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary disabled"
                      ><i class="fas fa-fast-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary disabled"
                      ><i class="fas fa-step-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="1"
                          label="Page 1 of 4"
                          selected></option>
                        <option
                          value="2"
                          label="Page 2 of 4"
                        ></option>
                        <option
                          value="3"
                          label="Page 3 of 4"
                        ></option>
                        <option
                          value="4"
                          label="Page 4 of 4"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-forward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-forward"></i></button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Pager without limiter"
      ], [
        {
          page: (action) => {
            if (action == 'rr') {
              return state => {
                alert('r')
                return state
              }
            } else if (action == 'r') {
              return state => {
                alert('rr')
                return state
              }
            } else if (action == 'f') {
              return state => {
                alert('f')
                return state
              }
            } else if (action == 'ff') {
              return state => {
                alert('ff')
                return state
              }
            } else if (action == 'options') {
              const p = 4
              const R = []
              for (var i = 1; i <= p; i++) {
                R.push({value: i, label: `Page ${i} of ${p}`})
              }
              return R
            } else if (action == 'change') {
              return (state, ev) => {
                alert(`page: ${ev.target.value}`)
                return state
              }
            } else if (action == 'page') {
              return 3
            } else if (action == 'limiters') {
              const L = [5, 10, 25, 50, 100]
              const R = []
              for (var i = 0; i < L.length; i++) {
                R.push({value: L[i], label: `${L[i]} items per page`})
              }
              return R
            } else if (action == 'limiter') {
              return (state, ev) => {
                alert(`limit: ${ev.target.value}`)
                return state
              }
            } else if (action == 'limit') {
              return 10
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="1"
                          label="Page 1 of 4"
                        ></option>
                        <option
                          value="2"
                          label="Page 2 of 4"
                        ></option>
                        <option
                          value="3"
                          label="Page 3 of 4"
                          selected></option>
                        <option
                          value="4"
                          label="Page 4 of 4"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="5"
                          label="5 items per page"
                        ></option>
                        <option
                          value="10"
                          label="10 items per page"
                          selected></option>
                        <option
                          value="25"
                          label="25 items per page"
                        ></option>
                        <option
                          value="50"
                          label="50 items per page"
                        ></option>
                        <option
                          value="100"
                          label="100 items per page"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-forward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-forward"></i></button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Pager"
      ], [
        {
          search: (action) => {
            if (action == 'clear') {
              return state => {
                alert('clear')
                return state
              }
            } else if (action == 'change') {
              return (state, ev) => {
                alert('change: '+ev.target.value)
                return state
              }
            } else if (action == 'value') {
              return ''
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-times"></i></button>
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="Search"
                    />
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Search"
      ], [
        {
          filter: action => {
            if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'active') {
              return false
            } else if (action == 'items') {
              return []
            } else if (action == 'close') {
              return null
            } else if (action == 'onfield') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'field') {
              return null
            } else if (action == 'onoperator') {
              return null
            } else if (action == 'operators') {
              return null
            } else if (action == 'operator') {
              return null
            } else if (action == 'onvalue') {
              return null
            } else if (action == 'values') {
              return null
            } else if (action == 'value') {
              return null
            } else if (action == 'run') {
              return null
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-info"
                    ><i class="fas fa-filter"></i> Filter</button>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Filter"
      ], [
        {
          filter: action => {
            if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'active') {
              return true
            } else if (action == 'items') {
              return [
                {
                  title: 'First filter',
                  click: state => {
                    alert('First')
                    return state
                  }
                }, {
                  title: 'Second filter',
                  click: state => {
                    alert('Second')
                    return state
                  }
                }
              ]
            } else if (action == 'close') {
              return null
            } else if (action == 'onfield') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'field') {
              return null
            } else if (action == 'onoperator') {
              return null
            } else if (action == 'operators') {
              return null
            } else if (action == 'operator') {
              return null
            } else if (action == 'onvalue') {
              return null
            } else if (action == 'values') {
              return null
            } else if (action == 'value') {
              return null
            } else if (action == 'run') {
              return null
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-info"
                    ><i class="fas fa-filter"></i> Filter</button>
                    <button
                      class="btn btn-info dropdown-toggle"
                      data-bs-toggle="dropdown"
                    ></button>
                    <ul class="dropdown-menu">
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> First filter</span>
                      </li>
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> Second filter</span>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Filter Active"
      ], [
        {
          filter: action => {
            if (action == 'open') {
              return null
            } else if (action == 'active') {
              return null
            } else if (action == 'items') {
              return null
            } else if (action == 'close') {
              return state => {
                alert('close')
                return state
              }
            } else if (action == 'onfield') {
              return (state, ev) => {
                alert('field: '+ev.target.value)
                return state
              }
            } else if (action == 'fields') {
              return ['id', 'created', 'name']
            } else if (action == 'field') {
              return ''
            } else if (action == 'onoperator') {
              return (state, ev) => {
                alert('operator: '+ev.target.value)
                return state
              }
            } else if (action == 'operators') {
              return ['equal', 'not equal', 'contains']
            } else if (action == 'operator') {
              return 'equal'
            } else if (action == 'onvalue') {
              return (state, ev) => {
                alert('value: '+ev.target.value)
                return state
              }
            } else if (action == 'values') {
              return ['x', 'y', 'z']
            } else if (action == 'value') {
              return ''
            } else if (action == 'run') {
              return state => {
                alert('run')
                return state
              }
            }
          },
          tab: 'filter'
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-times"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="id"
                          label="id"
                        ></option>
                        <option
                          value="created"
                          label="created"
                        ></option>
                        <option
                          value="name"
                          label="name"
                        ></option>
                        <option
                          value=""
                          selected
                          disabled>⌄</option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="equal"
                          label="equal"
                          selected></option>
                        <option
                          value="not equal"
                          label="not equal"
                        ></option>
                        <option
                          value="contains"
                          label="contains"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="x"
                          label="x"
                        ></option>
                        <option
                          value="y"
                          label="y"
                        ></option>
                        <option
                          value="z"
                          label="z"
                        ></option>
                        <option
                          value=""
                          selected
                          disabled>⌄</option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-info"
                      ><i class="fas fa-filter"></i> Filter</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Filter Tab"
      ], [
        {
          group: action => {
            if (action == 'current') {
              return ''
            } else if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'clear') {
              return null
            } else if (action == 'close') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'change') {
              return null
            } else if (action == 'run') {
              return null
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-warning"
                    ><i class="fas fa-th"></i> Group</button>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Group"
      ], [
        {
          group: action => {
            if (action == 'active') {
              return true
            } else if (action == 'current') {
              return ': name'
            } else if (action == 'open') {
              return null
            } else if (action == 'clear') {
              return state => {
                alert('clear')
                return state
              }
            } else if (action == 'close') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'change') {
              return null
            } else if (action == 'run') {
              return null
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-warning"
                    ><i class="fas fa-times"></i> Ungroup</button>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Group active"
      ], [
        {
          group: action => {
            if (action == 'current') {
              return ': name'
            } else if (action == 'open') {
              return null
            } else if (action == 'clear') {
              return null
            } else if (action == 'close') {
              return state => {
                alert('close')
                return state
              }
            } else if (action == 'fields') {
              return ['id', 'created', 'name']
            } else if (action == 'change') {
              return (state, ev) => {
                alert('change: '+ev.target.value)
                return state
              }
            } else if (action == 'run') {
              return state => {
                alert('run')
                return state
              }
            }
          },
          tab: 'group'
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-times"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="id"
                          label="id"
                        ></option>
                        <option
                          value="created"
                          label="created"
                        ></option>
                        <option
                          value="name"
                          label="name"
                        ></option>
                        <option
                          value=""
                          selected
                          disabled>⌄</option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-warning"
                      ><i class="fas fa-th"></i> Group: name</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Group tab"
      ], [
        {
          csv: action => {
            if (action == 'run') {
              return state => {
                alert('csv')
                return state
              }
            } else if (action == 'pending') {
              return false
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-file-csv"></i> Download</button>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Download"
      ], [
        {
          csv: action => {
            if (action == 'run') {
              return state => {
                alert('csv')
                return state
              }
            } else if (action == 'pending') {
              return true
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-secondary disabled"
                    ><i class="fas fa-spinner fa-spin"></i> Download</button>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        `,
        "Download pending"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ]
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th class="align-middle text-center">
                  <span>Id</span>
                </th>
                <th class="align-middle text-center">
                  <span>Name</span>
                </th>
                <th class="align-middle text-center">
                  <span>Value</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </td>
              </tr>
            </tbody>
          </table>
        `,
        "Loading"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Rows: [
            {id: 1, name: 'Car', value: '30000'},
            {id: 2, name: 'Bike', value: '500'},
            {id: 3, name: 'Boat', value: '200000'}
          ]
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                ><span>Id</span></th>
                <th
                  class="align-middle text-center"
                ><span>Name</span></th>
                <th
                  class="align-middle text-center"
                ><span>Value</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Car</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bike</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Boat</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "Simple table"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Rows: [
            {id: 1, name: 'Car', value: '30000'},
            {id: 2, name: 'Bike', value: '500'},
            {id: 3, name: 'Boat', value: '200000'}
          ],
          totals: {
            id: 3,
            value: 230500
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap"></span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">230500</span></td>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                ><span>Id</span></th>
                <th
                  class="align-middle text-center"
                ><span>Name</span></th>
                <th
                  class="align-middle text-center"
                ><span>Value</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Car</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bike</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Boat</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "table with totals"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Links: [
            row => 
              row == null ? {
                icon: 'trash',
                title: 'Delete'
              } : {
                type: 'danger',
                icon: 'trash',
                href: 'delete/'+row.id,
                title: 'Delete'
              },
            row => 
              row == null ? {
                title: 'Edit'
              } : {
                type: 'warning',
                title: 'Edit',
                href: 'put/'+row.id
              }
          ],
          totals: {
            id: 3,
            value: 230500
          },
          Rows: [
            {id: 1, name: 'Car', value: '30000'},
            {id: 2, name: 'Bike', value: '500'},
            {id: 3, name: 'Boat', value: '200000'}
          ]
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap"></span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">230500</span></td>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                ><span><i class="fas fa-trash"></i></span></th>
                <th
                  class="align-middle text-center"
                ><span>Edit</span></th>
                <th
                  class="align-middle text-center"
                ><span>Id</span></th>
                <th
                  class="align-middle text-center"
                ><span>Name</span></th>
                <th
                  class="align-middle text-center"
                ><span>Value</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/1"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/1"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Car</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/2"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/2"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bike</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/3"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/3"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Boat</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "table with links"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Links: [
            row => 
              row == null ? {
                icon: 'trash',
                title: 'Delete'
              } : {
                type: 'danger',
                icon: 'trash',
                href: 'delete/'+row.id,
                title: 'Delete'
              },
            row => 
              row == null ? {
                title: 'Edit'
              } : {
                type: 'warning',
                title: 'Edit',
                href: 'put/'+row.id
              }
          ],
          totals: {
            id: 3,
            value: 230500
          },
          Rows: [
            {id: 1, name: 'Car', value: '30000'},
            {id: 2, name: 'Bike', value: '500'},
            {id: 3, name: 'Boat', value: '200000'}
          ],
          check: (row, exec) => {
            if (exec) {
              return state => {
                alert('check: '+(row != null ? row.id : 'all'))
                return state
              }
            } else {
              return row.id % 2 == 0
            }
          },
          sort: (name, exec) => {
            if (exec) {
              return state => {
                alert('sort: '+name)
                return state
              }
            } else {
              return name == 'name' ? 'sort-up' : 'sort'
            }
          }
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap"></span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">230500</span></td>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                >
                  <button
                    class="btn btn-success btn-sm"
                  ><i class="fas fa-check"></i></button>
                </th>
                <th
                  class="align-middle text-center"
                ><span><i class="fas fa-trash"></i></span></th>
                <th
                  class="align-middle text-center"
                ><span>Edit</span></th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Id <i class="fas fa-sort"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Name <i class="fas fa-sort-up"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Value <i class="fas fa-sort"></i></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/1"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/1"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Car</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked/>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/2"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/2"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bike</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/3"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/3"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Boat</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "table with links, checkbox and sort"
      ], [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Name',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Value',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Links: [
            row => 
              row == null ? {
                icon: 'trash',
                title: 'Delete'
              } : {
                type: 'danger',
                icon: 'trash',
                href: 'delete/'+row.id,
                title: 'Delete'
              },
            row => 
              row == null ? {
                title: 'Edit'
              } : {
                type: 'warning',
                title: 'Edit',
                href: 'put/'+row.id
              }
          ],
          Actions: [
            {
              type: "success",
              href: "#insert",
              icon: "pencil-alt",
              title: "Insert"
            }, {
              type: "warning",
              href: "#edit",
              icon: "edit",
              title: "Update"
            }, {
              type: "danger",
              href: "#remove",
              icon: "trash",
              title: "Remove"
            }
          ],
          totals: {
            id: 3,
            value: 230500
          },
          Rows: [
            {id: 1, name: 'Car', value: '30000'},
            {id: 2, name: 'Bike', value: '500'},
            {id: 3, name: 'Boat', value: '200000'}
          ],
          check: (row, exec) => {
            if (exec) {
              return state => {
                alert('check: '+(row != null ? row.id : 'all'))
                return state
              }
            } else {
              return row.id % 2 == 0
            }
          },
          sort: (name, exec) => {
            if (exec) {
              return state => {
                alert('sort: '+name)
                return state
              }
            } else {
              return name == 'name' ? 'sort-up' : 'sort'
            }
          },
          csv: action => {
            if (action == 'run') {
              return state => {
                alert('csv')
                return state
              }
            } else if (action == 'pending') {
              return false
            }
          },
          group: action => {
            if (action == 'current') {
              return ''
            } else if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'clear') {
              return null
            } else if (action == 'close') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'change') {
              return null
            } else if (action == 'run') {
              return null
            }
          },
          filter: action => {
            if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'active') {
              return true
            } else if (action == 'items') {
              return [
                {
                  title: 'First filter',
                  click: state => {
                    alert('First')
                    return state
                  }
                }, {
                  title: 'Second filter',
                  click: state => {
                    alert('Second')
                    return state
                  }
                }
              ]
            } else if (action == 'close') {
              return null
            } else if (action == 'onfield') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'field') {
              return null
            } else if (action == 'onoperator') {
              return null
            } else if (action == 'operators') {
              return null
            } else if (action == 'operator') {
              return null
            } else if (action == 'onvalue') {
              return null
            } else if (action == 'values') {
              return null
            } else if (action == 'value') {
              return null
            } else if (action == 'run') {
              return null
            }
          },
          search: action => {
            if (action == 'clear') {
              return state => {
                alert('clear')
                return state
              }
            } else if (action == 'change') {
              return (state, ev) => {
                alert('change: '+ev.target.value)
                return state
              }
            } else if (action == 'value') {
              return ''
            }
          },
          page: action => {
            if (action == 'rr') {
              return state => {
                alert('r')
                return state
              }
            } else if (action == 'r') {
              return state => {
                alert('rr')
                return state
              }
            } else if (action == 'f') {
              return state => {
                alert('f')
                return state
              }
            } else if (action == 'ff') {
              return state => {
                alert('ff')
                return state
              }
            } else if (action == 'options') {
              const p = 4
              const R = []
              for (var i = 1; i <= p; i++) {
                R.push({value: i, label: `Page ${i} of ${p}`})
              }
              return R
            } else if (action == 'change') {
              return (state, ev) => {
                alert(`page: ${ev.target.value}`)
                return state
              }
            } else if (action == 'page') {
              return 3
            } else if (action == 'limiters') {
              const L = [5, 10, 25, 50, 100]
              const R = []
              for (var i = 0; i < L.length; i++) {
                R.push({value: L[i], label: `${L[i]} items per page`})
              }
              return R
            } else if (action == 'limiter') {
              return (state, ev) => {
                alert(`limit: ${ev.target.value}`)
                return state
              }
            } else if (action == 'limit') {
              return 10
            }
          },
          back: back,
          title: "sample table",
          description: [
            "Hello world!",
            "This is my table, and this table have a description support! :)",
            "This is a long text test for see how it fits in the layout!",
            "Hope you enjoy!"
          ].join('\n')
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                ><span title="${[
                  "Hello world!",
                  "This is my table, and this table have a description support! :)",
                  "This is a long text test for see how it fits in the layout!",
                  "Hope you enjoy!"
                ].join('\n')}">sample table</span></th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-arrow-left"></i> Back</button>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-success"
                        href="#insert"
                      ><i class="fas fa-pencil-alt"></i> Insert</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-warning"
                        href="#edit"
                      ><i class="fas fa-edit"></i> Update</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-danger"
                        href="#remove"
                      ><i class="fas fa-trash"></i> Remove</a>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="1"
                          label="Page 1 of 4"
                        ></option>
                        <option
                          value="2"
                          label="Page 2 of 4"
                        ></option>
                        <option
                          value="3"
                          label="Page 3 of 4"
                          selected></option>
                        <option
                          value="4"
                          label="Page 4 of 4"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="5"
                          label="5 items per page"
                        ></option>
                        <option
                          value="10"
                          label="10 items per page"
                          selected></option>
                        <option
                          value="25"
                          label="25 items per page"
                        ></option>
                        <option
                          value="50"
                          label="50 items per page"
                        ></option>
                        <option
                          value="100"
                          label="100 items per page"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-forward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-forward"></i></button>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-times"></i></button>
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="Search"
                    />
                    <button
                      class="btn btn-info"
                    ><i class="fas fa-filter"></i> Filter</button>
                    <button
                      class="btn btn-info dropdown-toggle"
                      data-bs-toggle="dropdown"
                    ></button>
                    <ul class="dropdown-menu">
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> First filter</span>
                      </li>
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> Second filter</span>
                      </li>
                    </ul>
                    <button
                      class="btn btn-warning"
                    ><i class="fas fa-th"></i> Group</button>
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-file-csv"></i> Download</button>
                  </div>
                </th>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap"></span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">230500</span></td>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                >
                  <button
                    class="btn btn-success btn-sm"
                  ><i class="fas fa-check"></i></button>
                </th>
                <th
                  class="align-middle text-center"
                ><span><i class="fas fa-trash"></i></span></th>
                <th
                  class="align-middle text-center"
                ><span>Edit</span></th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Id <i class="fas fa-sort"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Name <i class="fas fa-sort-up"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Value <i class="fas fa-sort"></i></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/1"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/1"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Car</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked/>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/2"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/2"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bike</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/3"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/3"
                  >Edit</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Boat</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "full table example"
      ]
    ]
  ], [
    "table pt",
    view_pt,
    [
      [
        {
          Fields: [
            row => 
              row == null ? {
                title: 'Id',
                name: 'id'
              } : {
                data: row.id
              },
            row => 
              row == null ? {
                title: 'Nome',
                name: 'name'
              } : {
                data: row.name
              },
            row => 
              row == null ? {
                title: 'Valor',
                name: 'value'
              } : {
                data: row.value
              }
          ],
          Links: [
            row => 
              row == null ? {
                icon: 'trash',
                title: 'Excluir'
              } : {
                type: 'danger',
                icon: 'trash',
                href: 'delete/'+row.id,
                title: 'Excluir'
              },
            row => 
              row == null ? {
                title: 'Atualizar'
              } : {
                type: 'warning',
                title: 'Atualizar',
                href: 'put/'+row.id
              }
          ],
          Actions: [
            {
              type: "success",
              href: "#insert",
              icon: "pencil-alt",
              title: "Inserir"
            }, {
              type: "warning",
              href: "#edit",
              icon: "edit",
              title: "Atualizar"
            }, {
              type: "danger",
              href: "#remove",
              icon: "trash",
              title: "Excluir"
            }
          ],
          totals: {
            id: 3,
            value: 230500
          },
          Rows: [
            {id: 1, name: 'Carro', value: '30000'},
            {id: 2, name: 'Bicicleta', value: '500'},
            {id: 3, name: 'Barco', value: '200000'}
          ],
          check: (row, exec) => {
            if (exec) {
              return state => {
                alert('check: '+(row != null ? row.id : 'all'))
                return state
              }
            } else {
              return row.id % 2 == 0
            }
          },
          sort: (name, exec) => {
            if (exec) {
              return state => {
                alert('sort: '+name)
                return state
              }
            } else {
              return name == 'name' ? 'sort-up' : 'sort'
            }
          },
          csv: action => {
            if (action == 'run') {
              return state => {
                alert('csv')
                return state
              }
            } else if (action == 'pending') {
              return false
            }
          },
          group: action => {
            if (action == 'current') {
              return ''
            } else if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'clear') {
              return null
            } else if (action == 'close') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'change') {
              return null
            } else if (action == 'run') {
              return null
            }
          },
          filter: action => {
            if (action == 'open') {
              return state => {
                alert('open')
                return state
              }
            } else if (action == 'active') {
              return true
            } else if (action == 'items') {
              return [
                {
                  title: 'Primeiro filtro',
                  click: state => {
                    alert('First')
                    return state
                  }
                }, {
                  title: 'Segundo filtro',
                  click: state => {
                    alert('Second')
                    return state
                  }
                }
              ]
            } else if (action == 'close') {
              return null
            } else if (action == 'onfield') {
              return null
            } else if (action == 'fields') {
              return null
            } else if (action == 'field') {
              return null
            } else if (action == 'onoperator') {
              return null
            } else if (action == 'operators') {
              return null
            } else if (action == 'operator') {
              return null
            } else if (action == 'onvalue') {
              return null
            } else if (action == 'values') {
              return null
            } else if (action == 'value') {
              return null
            } else if (action == 'run') {
              return null
            }
          },
          search: action => {
            if (action == 'clear') {
              return state => {
                alert('clear')
                return state
              }
            } else if (action == 'change') {
              return (state, ev) => {
                alert('change: '+ev.target.value)
                return state
              }
            } else if (action == 'value') {
              return ''
            }
          },
          page: action => {
            if (action == 'rr') {
              return state => {
                alert('r')
                return state
              }
            } else if (action == 'r') {
              return state => {
                alert('rr')
                return state
              }
            } else if (action == 'f') {
              return state => {
                alert('f')
                return state
              }
            } else if (action == 'ff') {
              return state => {
                alert('ff')
                return state
              }
            } else if (action == 'options') {
              const p = 4
              const R = []
              for (var i = 1; i <= p; i++) {
                R.push({value: i, label: `Página ${i} de ${p}`})
              }
              return R
            } else if (action == 'change') {
              return (state, ev) => {
                alert(`page: ${ev.target.value}`)
                return state
              }
            } else if (action == 'page') {
              return 3
            } else if (action == 'limiters') {
              const L = [5, 10, 25, 50, 100]
              const R = []
              for (var i = 0; i < L.length; i++) {
                R.push({value: L[i], label: `${L[i]} itens por página`})
              }
              return R
            } else if (action == 'limiter') {
              return (state, ev) => {
                alert(`limit: ${ev.target.value}`)
                return state
              }
            } else if (action == 'limit') {
              return 10
            }
          },
          back: back,
          title: "Tabela em Português",
          description: [
            "Olá mundo!",
            "Esta é minha tabela, e esta tabela tem suporte para descrição! :)",
            "Este é um texto longo de teste para ver como fica visualmente!",
            "Espero que goste!"
          ].join('\n')
        },
        `
          <table
            class="table table-striped table-bordered table-hover table-center"
          >
            <thead>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                ><span title="${[
                  "Olá mundo!",
                  "Esta é minha tabela, e esta tabela tem suporte para descrição! :)",
                  "Este é um texto longo de teste para ver como fica visualmente!",
                  "Espero que goste!"
                ].join('\n')}">Tabela em Português</span></th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-arrow-left"></i> Voltar</button>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-success"
                        href="#insert"
                      ><i class="fas fa-pencil-alt"></i> Inserir</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-warning"
                        href="#edit"
                      ><i class="fas fa-edit"></i> Atualizar</a>
                    </div>
                    <div class="col-auto">
                      <a
                        class="btn btn-danger"
                        href="#remove"
                      ><i class="fas fa-trash"></i> Excluir</a>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div
                    class="row gx-1 justify-content-center"
                  >
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-backward"></i></button>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="1"
                          label="Página 1 de 4"
                        ></option>
                        <option
                          value="2"
                          label="Página 2 de 4"
                        ></option>
                        <option
                          value="3"
                          label="Página 3 de 4"
                          selected></option>
                        <option
                          value="4"
                          label="Página 4 de 4"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <select class="form-control">
                        <option
                          value="5"
                          label="5 itens por página"
                        ></option>
                        <option
                          value="10"
                          label="10 itens por página"
                          selected></option>
                        <option
                          value="25"
                          label="25 itens por página"
                        ></option>
                        <option
                          value="50"
                          label="50 itens por página"
                        ></option>
                        <option
                          value="100"
                          label="100 itens por página"
                        ></option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-step-forward"></i></button>
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-secondary"
                      ><i class="fas fa-fast-forward"></i></button>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                  colspan="100%"
                >
                  <div class="input-group">
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-times"></i></button>
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="Buscar"
                    />
                    <button
                      class="btn btn-info"
                    ><i class="fas fa-filter"></i> Filtrar</button>
                    <button
                      class="btn btn-info dropdown-toggle"
                      data-bs-toggle="dropdown"
                    ></button>
                    <ul class="dropdown-menu">
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> Primeiro filtro</span>
                      </li>
                      <li>
                        <span
                          class="dropdown-item"
                          style="cursor:pointer"
                        ><i class="fas fa-times"></i> Segundo filtro</span>
                      </li>
                    </ul>
                    <button
                      class="btn btn-warning"
                    ><i class="fas fa-th"></i> Agrupar</button>
                    <button
                      class="btn btn-secondary"
                    ><i class="fas fa-file-csv"></i> Exportar</button>
                  </div>
                </th>
              </tr>
              <tr>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap"></span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">230500</span></td>
              </tr>
              <tr>
                <th
                  class="align-middle text-center"
                >
                  <button
                    class="btn btn-success btn-sm"
                  ><i class="fas fa-check"></i></button>
                </th>
                <th
                  class="align-middle text-center"
                ><span><i class="fas fa-trash"></i></span></th>
                <th
                  class="align-middle text-center"
                ><span>Atualizar</span></th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Id <i class="fas fa-sort"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Nome <i class="fas fa-sort-up"></i></span>
                </th>
                <th
                  class="align-middle text-center"
                >
                  <span
                    style="cursor:pointer"
                  >Valor <i class="fas fa-sort"></i></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/1"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/1"
                  >Atualizar</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">1</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Carro</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">30000</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked/>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/2"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/2"
                  >Atualizar</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">2</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Bicicleta</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">500</span></td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  />
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-danger btn-sm"
                    href="delete/3"
                  ><i class="fas fa-trash"></i></a>
                </td>
                <td class="align-middle text-center">
                  <a
                    class="btn btn-warning btn-sm"
                    href="put/3"
                  >Atualizar</a>
                </td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">3</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">Barco</span></td>
                <td
                  class="align-middle text-center"
                ><span style="white-space:pre-wrap">200000</span></td>
              </tr>
            </tbody>
          </table>
        `,
        "full table example"
      ]
    ]
  ]
]
