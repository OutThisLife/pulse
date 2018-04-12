import next from 'next'
import express from 'express'
import compression from 'compression'
import parser from 'body-parser'
import Xray from 'x-ray'

const env = process.env
const port = env.PORT || 3000
const dev = env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler(app)
const x = Xray()

app.prepare().then(() => {
  express()
    .use(parser.json())
    .use(compression())

    .post('/crawl', (req, res, next) => {
      const { url, selectors } = req.body
      const { parent, ...children } = selectors

      const s = x(url, {
        title: 'title',
        items: x(parent, [children])
      })
        .stream()
        .pipe(res)
    })

    .use(handle)
    .listen(port, () => console.log(`Listening on port ${port}`))
})
