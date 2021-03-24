import Defaults from './defaults'
const COC = {}

// Loggers =====================================================

// Warning Loggers
COC.DevWarn = options => {
  if (COC.Mode !== 'development') {
    return
  }
  if (options.component) {
    console.warn(
      `%c Component : ${options.component}`,
      'color : #2196f3; font-size : 15px;'
    )
  }
  if (options.message) {
    console.warn(
      `%c Message : ${options.message}`,
      'color : #880e4f; font-size : 12px;'
    )
  }
  if (options.log) console.log(options.log)
}

COC.GetAlignment = (instance = COC) => {
  return {
    master: instance.App.Defaults.Design.Alignment,
    inverse:
      instance.App.Defaults.Design.Alignment === 'left' ? 'right' : 'left'
  }
}

// Info Loggers

COC.DevInfoLog = options => {
  if (COC.Mode !== 'development') {
    return
  }
  console.log('%cCOC Info Log!', 'color : #1565c0; font-size : 20px;')
  if (options.component) {
    console.log(
      `%cComponent : ${options.component}`,
      'color : #2196f3; font-size : 15px;'
    )
  }
  if (options.message) {
    console.log(
      `%cMessage : ${options.message}`,
      'color : #880e4f; font-size : 12px;'
    )
  }
  if (options.log) console.log(options.log)
  if (options.comments) {
    let i
    for (i = 0; i < options.comments.length; i += 1) {
      console.info(
        `%cComment : ${options.comments[i]}`,
        'color : #757575; font-size : 12px;'
      )
    }
  }
}

// Loggers Ends ===============================================

COC.isNumber = value => !Number.isNaN(value)
// Arrays Core ================================================

//Matching

COC.IsMatchedArrays = (arrayOne, arrayTwo) => {
  let i
  const lenOne = arrayOne.length
  const lenTwo = arrayTwo.length
  if (lenOne === 0 || lenTwo === 0) return false
  for (i = 0; i < lenOne; i += 1) {
    if (COC.GetIndex(arrayTwo, arrayOne[i]) !== -1) return true
  }
  return false
}

//Finding

COC.GetIndex = (array, val) => {
  let i
  const len = array.length
  if (len === 0) return -1
  for (i = 0; i < len; i += 1) if (array[i] === val) return i
  return -1
}
// Advanced Searching

COC.BinarySearch = (array, value) => {
  let guess

  let min = 0

  let max = array.length - 1

  while (min <= max) {
    guess = Math.floor((min + max) / 2)
    if (array[guess] === value) return guess
    if (array[guess] < value) min = guess + 1
    else max = guess - 1
  }

  return -1
}

//Declaring

COC.ArrayIncludes = (arr, val) => COC.GetIndex(arr, val) !== -1

// Plucking

COC.FilterArrayOfObjects = (array, key) => {
  const arr = []
  const len = array.length
  let i
  if (len === 0) return []
  for (i = 0; i < len; i += 1) {
    if (array[i][key] !== undefined) {
      arr.push(array[i][key])
    }
  }
  return arr
}

// Remove Dublications

COC.RemoveArrayDublications = array => {
  const unique = {}
  array.forEach(i => {
    if (!unique[i]) {
      unique[i] = true
    }
  })
  return Object.keys(unique)
}

COC.FilterObjectOfObjects = (array, key) => {
  const arr = []
  let i
  const keys = Object.keys(array)
  for (i = 0; i < keys.length; i += 1) {
    if (array[keys[i]][key] !== undefined) {
      arr.push(array[keys[i]][key])
    }
  }
  return arr
}

COC.Pluck = object => COC.FilterArrayOfObjects(object.array, object.key)
COC.CapitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1)
COC.Percentage = (part, whole) => (part * 100) / whole

COC.SelectionSort = arrs => {
  const arr = arrs
  let minIdx
  let temp
  const len = arr.length
  for (let i = 0; i < len; i += 1) {
    minIdx = i
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIdx]
    arr[minIdx] = temp
  }
  return arr
}
COC.QuickSort = arr => COC.QuickSortRec(arr, 0, arr.length - 1)
COC.QuickSortRec = (arr, left, right) => {
  let pivot
  let partitionIndex
  if (left < right) {
    pivot = right
    partitionIndex = COC.Partition(arr, pivot, left, right)
    COC.QuickSortRec(arr, left, partitionIndex - 1)
    COC.QuickSortRec(arr, partitionIndex + 1, right)
  }
  return arr
}
COC.Partition = (arr, pivot, left, right) => {
  const pivotValue = arr[pivot]
  let partitionIndex = left
  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      COC.Swap(arr, i, partitionIndex)
      partitionIndex += 1
    }
  }
  COC.Swap(arr, right, partitionIndex)
  return partitionIndex
}
COC.Swap = (arrs, i, j) => {
  const arr = arrs
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr
}

COC.HasValue = val => {
  if (val !== null && val !== undefined) {
    if (typeof val === 'object') return Object.keys(val).length > 0
    return val.length > 0
  }
  return false
}
// COC VALIDATORS
COC.Validate = {}
COC.Validate.HasValue = (...args) => COC.HasValue(args[0].val)
COC.Validate.InMaxRange = (...args) => {
  if (!COC.HasValue(args[0].val)) return true
  return args[0].val.length <= args[0].credentials
}
COC.Validate.InMinRange = (...args) => {
  if (!COC.HasValue(args[0].val)) return false
  return args[0].val.length >= args[0].credentials
}
COC.Validate.SameAs = (...args) => {
  if (!COC.HasValue(args[0].val)) return false
  return args[0].val === args[0].credentials
}
COC.Validate.MatchsRegex = (...args) => {
  if (!COC.HasValue(args[0].val)) return false
  return args[0].val.match(args[0].credentials) != null
}
COC.Validate.MinPicks = (...args) => {
  if (!COC.HasValue(args[0].val)) return false
  return args[0].val.length >= args[0].credentials
}
COC.Validate.MaxPicks = (...args) => {
  if (!COC.HasValue(args[0].val)) return false
  return args[0].val.length <= args[0].credentials
}
COC.Validate.Start = (...args) => {
    const options  = args[0].options; // eslint-disable-line
  let i
  const errs = []
  let round
  for (i = 0; i < options.length; i += 1) {
    if (options[i].pre) {
      if (options[i].variable) {
        round = options[i].credentials
      } else {
        round = COC.Validate[options[i].name]({
          val: args[0].val,
          credentials: options[i].credentials
        })
      }
      if (round === false) {
        errs.push(options[i].name)
        return { errors: errs, valid: false }
      }
    }
  }
  return { errors: errs, valid: true }
}
COC.TrimExtraZeros = num => (num % 1 === 0 ? parseInt(num) : num);  // eslint-disable-line
COC.GetRange = (num, min, max) => Math.min(max, Math.max(num, min))
COC.InRange = (num, min, max) => num >= min && num <= max

COC.MigaNumber = num => {
  if (num / 10000000 > 1) {
    return `${COC.TrimExtraZeros((num / 10000000).toFixed(2))}M`
  }
  if (num / 1000 > 1) {
    return `${COC.TrimExtraZeros((num / 1000).toFixed(1))}K`
  }
  return num
}

COC.NextCircularIndex = (index, arr) =>
  index === arr.length - 1 ? 0 : index + 1
COC.CircularSubtract = (slave, master, round) =>
  slave > master ? round - slave + master : master - slave
// Greetings
COC.Greetings = () => {
  if (process.browser && (!COC.Mode || !COC.Mode !== 'production')) {
    console.log(
      '%cCOC',
      'color: #e91e63; font-size: 80px; font-family: monospace;'
    )
    console.log(
      '%cdevelopment mode',
      'color: #e91e63; font-size: 25px; font-family: monospace;'
    )
  }
}
// App Instance
COC.App = {
  Defaults
}
COC.Config = {
  Meta(options) {
    COC.App = { ...COC.App, ...options }
    if (COC.App && COC.App.mode) {
      COC.Mode = COC.App.mode
    }
    COC.Greetings()
  },
  Defaults(options) {
    Object.keys(options).forEach(key => {
      COC.App.Defaults[key] = options[key]
    })
  }
}

export default COC
