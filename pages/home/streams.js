// @flow
import { pure } from 'recompose'

import IFrame from '../../components/iframe'

export default pure(() => (
  <div>
    <h2>Livestreams</h2>

    <IFrame src="https://www.youtube.com/embed/1DRNmZcVAEM" />
  </div>
))
