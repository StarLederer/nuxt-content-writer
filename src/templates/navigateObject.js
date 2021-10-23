function navigateObject (data, navigator) {
  let subnavigator = ''
  let arrayMode = false
  let arrayI = ''
  for (let i = 0; i <= navigator.length; ++i) {
    if (arrayMode) {
      if (navigator[i] === ']') {
        arrayMode = false
        if (data[subnavigator]) {
          return navigateObject(
            data[subnavigator][parseInt(arrayI, 10)],
            navigator.substring(i + 2)
          )
        } else {
          return undefined
        }
      } else {
        arrayI += navigator[i]
      }
    } else if (i >= navigator.length) {
      return data[subnavigator] ?? data
    } else if (navigator[i] === '.') {
      if (data[subnavigator]) {
        return navigateObject(data[subnavigator], navigator.substring(i + 1))
      } else {
        return undefined
      }
    } else if (navigator[i] === '[') {
      arrayMode = true
    } else {
      subnavigator += navigator[i]
    }
  }
}

export default navigateObject
