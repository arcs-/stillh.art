function loadAssets(obj, exclude, cb) {

  const load = (url, path) => {

    let img = new Image()
    img.onload = function() {

      for (var subObj = obj, i = 0, len = path.length - 1; i < len; i++)
        subObj = subObj[path[i]]

      subObj[path[i]] = img

      pennding--
      attemptDone()
    }
    pennding++
    path = path.split('.')
    img.src = url

  }

  const traverse = (subObj, path = "") => {

    for (let prop in subObj) {

      if (typeof subObj[prop] === 'object' && !exclude.includes(prop))
        traverse(subObj[prop], path + prop + '.')

      else if (typeof subObj[prop] === 'string' && subObj[prop].startsWith("asset:"))
        load(subObj[prop].substring(6), path + prop)

    }

  }

  const attemptDone = () => done && pennding === 0 && cb && cb()

  var pennding = 0

  traverse(obj)

  var done = true

  attemptDone()

}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
