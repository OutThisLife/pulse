// @flow
import { pure } from 'recompose'
import styled from 'styled-components'

import Section from '../../components/section'
import Search from './search'
import Feed from './feed'

const Home = styled(Section)`
  img + img {
    margin-top: var(--cellSize);
  }
`

export default pure(() => (
  <Home>
    <Section.Item start={3}>
      <Search />
    </Section.Item>

    <Section.Item row={2} start={4} end={16}>
      <img src="https://www.stevensegallery.com/g/600/600" />
      <img src="https://www.stevensegallery.com/g/600/600" />
      <img src="https://www.stevensegallery.com/600/600" />
      <img src="https://www.stevensegallery.com/600/600" />
      <img src="https://www.stevensegallery.com/g/600/600" />
    </Section.Item>

    <Section.Item row={2} start={17} end={25}>
      <Feed />
    </Section.Item>

    <Section.Item row={2} start={26} end={-4}>
      <img src="https://www.stevensegallery.com/g/600/600" />
      <img src="https://www.stevensegallery.com/600/600" />
      <img src="https://www.stevensegallery.com/600/600" />
      <img src="https://www.stevensegallery.com/g/600/600" />
    </Section.Item>
  </Home>
))
