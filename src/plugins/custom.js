let dateTime = (value, format) => {
  // 时间格式 ‘yyyy-MM-dd HH:mm:ss’
  if (!value) { return }
  var now = new Date(value)
  var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  return now.getFullYear() + format +
  month + format +
  (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + ' ' +
  (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
  (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
  (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds())
}

let date = (value, format) => {
  // 时间格式 ‘yyyy-MM-dd’
  if (!value) { return }
  if (!format) { format = '-' }
  var now = new Date(value)
  var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  return now.getFullYear() + format +
  month + format +
  (now.getDate() < 10 ? '0' + now.getDate() : now.getDate())
}

let dateCharacter = value => {
  // 时间格式 ‘yyyy年MM月dd日’
  if (!value) { return }
  var now = new Date(value)
  var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  return now.getFullYear() + '年' +
  month + '月' +
  (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + '日'
}

let monthDay = (value, format) => {
  // 时间格式 ‘MM-dd’
  if (!value) { return }
  var now = new Date(value)
  var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  return month + format +
  (now.getDate() < 10 ? '0' + now.getDate() : now.getDate())
}

let number = number => {
  // 金额格式 并保留 2位小数
  if (number === undefined) { return }
  let outputcents = amount => {
    amount = Math.round(((amount) - Math.floor(amount)) * 100)
    return (amount < 10 ? '.0' + amount : '.' + amount)
  }
  // number = number.replace(g, '')
  if (isNaN(number) || number === '') { return '' }
  number = Math.round(number * 100) / 100
  if (number < 0) {
    return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0)
  } else {
    return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0)
  }
}

let outputdollars = number => {
  if (number.length <= 3) {
    return (output = number === '' || number === '0' ? '0' : number)
  } else {
    var mod = number.length % 3
    var output = (mod === 0 ? '' : (number.substring(0, mod)))
    for (let i = 0; i < Math.floor(number.length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        output += number.substring(mod + 3 * i, mod + 3 * i + 3)
      } else {
        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3)
      }
    }
    return (output)
  }
}
let amount = number => {
  // 金额格式 并小数位数不变
  if (number === undefined) { return }
  let outputcents = amount => {
    amount = Math.round(((amount) - Math.floor(amount)) * 100)
    if (amount <= 0) {
      return ''
    } else {
      return (amount < 10 ? '.0' + amount : amount % 10 === 0 ? '.' + amount / 10 : '.' + amount)
    }
  }
  if (isNaN(number) || number === '') { return '' }
  number = Math.round(number * 100) / 100
  if (number < 0) {
    return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0)
  } else {
    return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0)
  }
}

export { date }
export { number }
export { dateTime }
export { dateCharacter }
export { monthDay }
export { amount }
