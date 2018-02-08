# dateLib is a class extends Date

instanceof Date,and extend properties and methods,you can use as Date;

## Installing

npm install date-library

### Using

```js
 const dateLib = require('date-library')
 import dateLib from 'date-library'

```
### doc
[document](https://lgl1993.github.io/gldate/)

## Property

- `year` get or set
- `month` get or set
- `week` get
- `date` get or set 返回当月的第几天
- `day` get 返回星期几
- `hours` get or set
- `minutes` get or set
- `seconds` get or set
- `timeStamp` get or set

## Method

- `format` yy MM dd hh mm ss
- `get12Ts` 返回从12点开始的秒级时间戳,不会改变原时间
- `add` can use as chain
- `isBefore`
- `isAfter`
- `clone` 
- `setStart` 会改变原时间

### static
- `getByOffset` 参数同add
- `max`
- `min`
- `duration` 获取一段时间的Date array
