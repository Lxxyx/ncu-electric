var ele = require('./dist/ele.js')

ele.getInfo('090230')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })