export const withStatus = (fetchPromise) => {
  const store = []

  const when = (status, fn) => {
    store.push({
      status,
      fn,
    })

    return structure
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

  const structure = {
    when,
    build,
  }

  return structure
}

export default withStatus
