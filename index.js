const next = require('next')
const express = require('express')
const parser = require('body-parser')
const Xray = require('x-ray')

const env = process.env
const port = env.PORT || 3000
const dev = env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  express()
    .use(parser.json())
    .post('/crawl', (req, res, next) => {
      const x = Xray()
      const { url, selectors } = req.body
      const { parent, ...children } = selectors

      x(url, {
        title: 'title',
        items: x(parent, [children])
      })
        .stream()
        .pipe(res)

      return next()
    })

    .use(handle)
    .listen(port, () => console.log(`Listening on port ${port}`))
})
