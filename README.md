# table
> A table [component](https://github.com/marcodpt/component/)

[Live demo](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Ftable%2Fsample.js)

[Tests](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Ftable%2Ftests.js)

## Params
 - object `schema`: json schema for the table, must be an array!
 - array `data` or function `data(params)`: the table data, can be an array
or a function that recieve query params and returns an array (maybe inside
promise).
 - function `totals(params|data)`: return an object (maybe inside promise) with
totals, if `data` is an array it will pass as paramenter `data`, otherwise
query `params`.
 - function `count(params)`: only use in case data is a function (and is a must 
if you want to use pagination), returns the number of rows for that given
query.
 - function `values(key)`: function that returns an array of objects (`value`,
`label`) to be used in a select field representing the list of possible values
for a given `key`
 - array `operators`: An array of objects (`value`, `label`) to be used in a
select field representing filter operators.
 - function `back`: A back button function
 - boolean `check`: Is table rows checkable?
 - boolean `sort`: Is table columns sortable?
 - number|array `limit`: Pagination rows per page, in case of many items it can
be choosed by the user.
 - boolean `filter`: Is table filterable?
 - boolean `group`: Is table groupable?
 - boolean `search`: Is table searchable?
 - string `csv`: Csv file name for download
 - function `change(params)`: A function called every change on data
   - object `params`: the current query params on data, described below

## Update
 - object `params`: the current query params on data, properties:
   - integer `_skip`: rows to be skiped 
   - integer `_limit`: limit number of rows
   - string `_sort`: the column name to be sorted, use `-` at the beginning for
DESC
   - string `_group`: the columns to be grouped separated with `,`, or empty
string for full group
   - array `_filter`: actives filters with items as string 
`key`+`operator`+`value`
   - string `_ids`: selected `id` separated with `,`
