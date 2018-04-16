// @flow
import { spawn } from 'threads'

let thread
let data = []

const openWorker = () =>
  spawn(({ url = '', data = '' }: { url: string, data: string }) =>
    fetch(`${location.origin}/crawl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, data })
    }).then(r => r.json())
  )

const init = cb => {
  if (thread) {
    return
  }

  thread = openWorker()
  thread.on('message', (result: {}) => {
    data = { ...data, ...result }
    cb(data)
  })
}

export default (keyword: string, cb: Function) => {
  init(cb)

  const s = encodeURIComponent(keyword)
  const services = {
    twitter: {
      url: `https://twitter.com/search?f=tweets&vertical=news&q=${s}&src=typd`,
      data: `() => ({
        items: ${collect(
          'tweet',
          `
          title: el.querySelector('.tweet-text').innerText,
          time: el.querySelector('._timestamp').dataset.time,
          url: el.querySelector('.js-permalink').href,
          video: el.querySelector('video').getAttribute('src'),
          image: el.querySelector('.AdaptiveMedia-container img').getAttribute('src')
          `
        )}
      })`
    },

    youtube: {
      url: `https://www.youtube.com/results?sp=EgJAAQ%253D%253D&search_query=${s.replace('#', '')}`,
      data: `() => ({
        streams: window.ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents["0"].itemSectionRenderer.contents
      })`
    }
  }

  Object.keys(services).map(s => thread.send(services[s]))
}

const collect = (parent, selectors) => `
[...document.getElementsByClassName('${parent}')].reduce((acc, el) => {
  if (el.children) {
    acc.push({
      ${selectors.split(',').reduce((acc: string, id: string) => {
        const query = id.match(/el\.querySelector\((.*?)\)/)[0]
        acc += id.replace(query, `${query} && ${query}`) + ','
        return acc
      }, '')}
    })
  }

  return acc
}, [])
`
