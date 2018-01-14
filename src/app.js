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
    on200: status(200),
    on404: status(404),
    build,
  }

  return structure
}

module.exports = withStatus
