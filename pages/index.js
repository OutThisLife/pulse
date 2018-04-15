// @flow
import { Fragment } from 'react'
import Head from 'next/head'
import { pure } from 'recompose'

import BG from '../components/bg'
import Section from '../components/section'

export default pure(() => (
  <Fragment>
    <Head>
      <script src="https://cdn.jsdelivr.net/combine/npm/three@0.91.0,npm/three@0.91.0/examples/js/controls/OrbitControls.min.js" />
    </Head>

    <BG t={+new Date()} />

    <Section>i go here.</Section>
  </Fragment>
))
