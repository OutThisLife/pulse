// @flow
import { lifecycle } from 'recompose'
import greenlet from 'greenlet'

import Section from '../section'
import Search from './search'
import Graph from './graph'
import Results from './results'

export default lifecycle({
  state: {
    search: '#syria',
    results: [{
      time: '09/09/18 14:14:14',
      source: 'twitter',
      title: 'Lorem ipsum dolar sit amet'
    }, {
      time: '09/09/18 14:14:14',
      source: 'twitter',
      title: 'Lorem ipsum dolar sit amet'
    }]
  },

  componentDidMount () {
    // xray('https://blog.ycombinator', 'post', [{
    //   title: 'h1 a',
    //   link: '.article-title@href',
    //   source: 'hackernews'
    // }])((err, results) => {
    //   if (err) {
    //     throw new Error(err)
    //   }

    //   this.setState({ results })
    // })
  }
})(props =>
  <Section {...props}>
    <Search {...props} />
    <Graph {...props} />
    <Results {...props} />
  </Section>
)
