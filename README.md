# fetch-with-status
fetch with status helpers

[![npm version](https://badge.fury.io/js/fetch-with-status.svg)](https://badge.fury.io/js/fetch-with-status)

```javascript
const withStatus = require('./src/app')

const withStatusReturn = withStatus(fetch('https://jsonplaceholder.typicode.com/posts/1'))
  .on200((on200) => {
    // only requests with status 200 land here
    return on200.json()
  })
  .on404((on404) => {
    // only requests with status 404 land here
    throw new Error('Oh no!')
  })
  .build()
  // now we have a normal promise and all returns from fns above land here
  .then((json) => {

    console.log(json)
  })
  .catch((error) => {
    console.log('error', error.message)
  })

  console.log('withStatusReturn', withStatusReturn)
```

# TODO:
- make stuff immutable (more fp)
- more status codes
- tests

