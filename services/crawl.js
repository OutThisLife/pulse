// @flow
import { spawn } from 'threads'

type Args = {
  url: string,
  selectors: []
}

export default spawn(
  ({ url = 'http://www.reddit.com', selectors = [] }: Args, done: Function) =>
    fetch('http://localhost:3000/crawl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, selectors })
    }).then(r => r.json())
)
