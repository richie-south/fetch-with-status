export const withStatus = (fetchPromise) => {
  const store = []

  const when = (status, fn) => {
    store.push({
      status,
      fn,
    })

    return publicApi
  }

  const build = () =>
    fetchPromise
      .then((res) => {
        const object = store.find((({status}) =>
          status === res.status))

        if (!object) {
          return res
        }

        return new Promise (resolve =>
          object.fn(res, value => resolve(value)))
      })

  const publicApi = {
    when,
    build,
  }

  return publicApi
}

export default withStatus
