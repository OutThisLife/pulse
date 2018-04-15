// @flow
import { Fragment } from 'react'
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'

import theme from '../../utils/theme'
import { fromTwitter } from '../../utils/crawl'

import Section from '../../components/section'
import Search from './search'
import Feed from './feed'
import Media from './media'
import Streams from './streams'

const Home = styled(Section)`
  padding-bottom: var(--cellSize);

  img + img {
    margin-top: var(--cellSize);
  }

  h2 {
    font-size: ${theme.scale(32, 41)};
    line-height: 1.3;
    font-weight: 300;
    margin: 0 0 var(--cellSize);

    &:after {
      content: '';
      display: block;
      width: 10%;
      height: 5px;
      margin-top: 5px;
      background: #fff;
    }
  }
`

type Props = {
  data: {}[],
  onSubmit: Function
}

let int = null

export default compose(
  withState('data', 'setData', []),
  withState('loading', 'setLoading', false),
  withHandlers(() => ({
    onSubmit: ({ data, setLoading, setData }) => ({
      target: {
        s: { value }
      }
    }) => {
      setLoading(true)

      clearInterval(int)
      const fetch = () =>
        fromTwitter(value, newData => {
          if (newData !== data) {
            window.requestAnimationFrame(() => setData(newData, () => setLoading(false)))
          }
        })

      fetch()
      int = setInterval(fetch, 1000)
    }
  }))
)(({ data, loading, onSubmit }: Props) => (
  <Home>
    <Section.Item start={3}>
      <Search onSubmit={onSubmit} />
    </Section.Item>

    {!loading &&
      data.length > 0 && (
        <Fragment>
          <Section.Item row={2} start={4} end={14}>
            <Feed items={data} />
          </Section.Item>

          <Section.Item row={2} start={15} end={26}>
            <Media items={data} />
          </Section.Item>

          <Section.Item row={2} start={27} end={-4}>
            <Streams items={data} />
          </Section.Item>
        </Fragment>
      )}

    {loading && (
      <Section.Item>
        <p>Loading</p>
      </Section.Item>
    )}
  </Home>
))
