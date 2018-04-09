// @flow
import styled from 'styled-components'

import Section from '../components/section'
import Time from '../components/time'
import Job from '../components/job'
import New from '../components/new'

export default (): Element<'any'> =>
  <Section align='flex-start'>
    <Time />

    <Job start={3} end={20} />
    <New start={21} end={-3} align='center' />
  </Section>
