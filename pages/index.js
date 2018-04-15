// @flow
import { Fragment } from 'react'
import { pure } from 'recompose'

import BG from '../components/bg'
import Home from './home'

export default pure(() => (
  <Fragment>
    <BG />
    <Home />
  </Fragment>
))
