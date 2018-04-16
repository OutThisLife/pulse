// @flow
import { pure } from 'recompose'

import IFrame from '../../components/iframe'
import { Media } from './media'

export default pure(({ streams = [] }: { streams: {}[] }) => (
  <Media>
    <h2>Livestreams</h2>
    {!streams && <em>None.</em>}
    {streams
      .filter(i => i.videoRenderer)
      .map(({ videoRenderer: { videoId } }) => (
        <IFrame key={videoId} src={`https://www.youtube.com/watch?v=${videoId}`} />
      ))}
  </Media>
))
