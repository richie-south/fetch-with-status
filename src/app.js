const statusCodes = require('http').STATUS_CODES

const buildHttpStucture = (fn) => {
  const structure = {}

  for (const statusCode in statusCodes) {
    structure[`on${statusCode}`] = fn(statusCode)
  }

  return structure
}

const withStatus = (fetchPromise) => {
  const store = []

  const status = (status) => (fn) => {
    store.push({
      status,
      fn,
    })

    delete structure[`on${status}`]
    return structure
  }

  const build = () => {
    return fetchPromise
      .then((res) => {
        const {status} = res

        const object = store.find((({status}) =>
          status === res.status))

        if (!object) {
          return res
        }

        return object.fn(res)
      })
  }



  const structure = {
    ...buildHttpStucture(status),
    build,
  }

  return structure
}

module.exports = withStatus
