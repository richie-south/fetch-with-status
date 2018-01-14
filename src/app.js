import {statusCodes} from './status-codes'

const buildHttpStucture = (fn) =>
  statusCodes.reduce((structure, statusCode) => ({
    ...structure,
    [`on${statusCode}`]: fn(statusCode),
  }), {})

export const withStatus = (fetchPromise) => {
  const store = []

  const status = (status) => (fn) => {
    store.push({
      status,
      fn,
    })

    delete structure[`on${status}`]
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
    ...buildHttpStucture(status),
    build,
  }

  return structure
}

export default withStatus
