# GlDate类

instanceof Date,并扩展常用方法,属性。

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

- `year` can use as chain
- `month`  can use as chain
- `date`  can use as chain
- `hours`  can use as chain
- `minutes`  can use as chain
- `seconds`  can use as chain

- `format`
- `getTimeStamp`
- `get12Ts` 返回从12点开始的秒级时间戳,不会改变原时间
- `add` can use as chain
- `isBefore`
- `isAfter`
- `clone` 
- `setStart` 会改变原时间
- `duration` 获取一段时间的Date array

### static
- `getByOffset` 参数同add
- `max`
- `min`

