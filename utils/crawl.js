// @flow
import { spawn } from 'threads'

const crawl = () => spawn(({ url = 'http://www.reddit.com', selectors = [] }: { url: string, selectors: [] }) =>
  fetch('http://localhost:3000/crawl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, selectors })
  }).then(r => r.json())
)

let thread
export const fromTwitter = (keyword: string, cb: Function) => {
  if (!thread) {
    thread = crawl()
    thread.on('message', ({ items }: { items: [] }) => {
      cb(items.sort((a, b) => parseInt(a.time) > parseInt(b.time)))
    })
  }

  thread.send({
    url: `https://twitter.com/search?f=tweets&vertical=news&q=${encodeURIComponent(keyword)}&src=typd`,
    selectors: {
      parent: '.tweet',
      title: '.tweet-text',
      time: '._timestamp@data-time-ms',
      url: '.js-permalink@href',
      video: '.AdaptiveMedia-container video@src',
      image: '.AdaptiveMedia-container img@src'
    }
  })
}