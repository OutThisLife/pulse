// @flow
import { pure } from 'recompose'
import faker from 'faker'
import styled from 'styled-components'
import theme from '../../utils/theme'

import Section from '../../components/section'
import Search from './search'
import Feed from './feed'

const Home = styled(Section)`
  padding-bottom: var(--cellSize);

  img + img {
    margin-top: var(--cellSize);
  }

  h2 {
    font-size: ${theme.scale(32, 41)};
    line-height: 1.3;
    font-weight: 300;
    margin: 0 0 calc(var(--cellSize) / 2);

    &:after {
      content: '';
      display: block;
      width: 10%;
      height: 5px;
      margin-top: 5px;
      background: #fff;
    }
  }

  .iframe-container {
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 56.3%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`

export default pure(() => (
  <Home>
    <Section.Item start={3}>
      <Search />
    </Section.Item>

    <Section.Item row={2} start={4} end={12}>
      <Feed />
    </Section.Item>

    <Section.Item row={2} start={13} end={25}>
      <h2>Images / Videos</h2>
      {[...Array(5).keys()].map(() => <img src={faker.random.image()} />)}
    </Section.Item>

    <Section.Item row={2} start={26} end={-4}>
      <h2>Livestreams</h2>

      <div className="iframe-container">
        <iframe src="https://www.youtube.com/embed/1DRNmZcVAEM" allowfullscreen />
      </div>
    </Section.Item>
  </Home>
))
