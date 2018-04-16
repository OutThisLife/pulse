const next = require('next')
const express = require('express')
const parser = require('body-parser')
const puppeteer = require('puppeteer')

const env = process.env
const port = env.PORT || 3000
const dev = env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const scrape = async ({ url, data }) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [' --no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor(1000)

  const results = await page.evaluate(eval(data))
  browser.close()

  return results
}

app.prepare().then(() => {
  express()
    .use(parser.json())

    .post('/crawl', async (req, res) => {
      try {
        res.json(await scrape(req.body))
      } catch (e) {
        throw new Error(e)
      }
    })

    .use(handle)
    .listen(port, () => console.log(`Listening on port ${port}`))
})
