// @flow
import { lifecycle } from 'recompose'

import Section from '../section'
import Search from './search'
import Graph from './graph'
import Results from './results'

import crawl from '../../services/crawl'
const results = crawl.send({
  url: 'https://twitter.com/search?f=tweets&vertical=news&q=%23syria&src=typd',
  selectors: {
    parent: '.tweet',
    title: '.tweet-text',
    time: '._timestamp@data-time-ms',
    url: '.js-permalink@href'
  }
})

results.on('message', console.log)

export default lifecycle({
  state: {
    search: '#syria',
    results: [
      {
        time: '09/09/18 14:14:14',
        source: 'twitter',
        title: 'Lorem ipsum dolar sit amet'
      },
      {
        time: '09/09/18 14:14:14',
        source: 'twitter',
        title: 'Lorem ipsum dolar sit amet'
      }
    ]
  }
})(props => (
  <Section {...props}>
    <Search {...props} />
    <Graph {...props} />
    <Results {...props} />
  </Section>
))
