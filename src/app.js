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

        return object.fn(res)
      })

  const publicApi = {
    when,
    build,
  }

  return publicApi
}

export default withStatus
