const statusCodes = require('./status-codes')

const buildHttpStucture = (fn) =>
  statusCodes.reduce((structure, statusCode) => ({
    ...structure,
    [`on${statusCode}`]: fn(statusCode)
  }), {})

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
