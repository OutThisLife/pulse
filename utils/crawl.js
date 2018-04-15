// @flow
import { spawn } from 'threads'

type Args = {
  url: string,
  selectors: []
}

export default spawn(({ url = 'http://www.reddit.com', selectors = [] }: Args) =>
  fetch('http://localhost:3000/crawl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, selectors })
  }).then(r => r.json())
)

// const results = crawl.send({
//   url: 'https://twitter.com/search?f=tweets&vertical=news&q=%23syria&src=typd',
//   selectors: {
//     parent: '.tweet',
//     title: '.tweet-text',
//     time: '._timestamp@data-time-ms',
//     url: '.js-permalink@href'
//   }
// })

// results.on('message', console.log)
