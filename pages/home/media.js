// @flow
import { pure, withHandlers } from 'recompose'
import mediumZoom from 'medium-zoom'
import styled from 'styled-components'

import IFrame from '../../components/iframe'

export const Media = styled.div`
  h2 ~ * {
    margin-bottom: var(--cellSize);
  }
`

export default withHandlers(() => ({
  imgLoad: () => ({ target }) => {
    if (!target || target.classList.contains('medium-zoom-image')) {
      return
    }

    mediumZoom(target, { background: 'rgba(0,0,0,.8)' })
  }
}))(
  pure(({ items = [], imgLoad }: { items: {}[], imgLoad: Function }) => (
    <Media>
      <h2>Media</h2>

      {items
        .filter(
          (item, index, self) =>
            (item.video || item.image) &&
            self.findIndex(t => t.image === item.image && t.video === item.video) === index
        )
        .map(
          ({ video, image }, i) =>
            video ? (
              <IFrame key={`media@${video + i}`} src={video} />
            ) : (
              <img key={`media@${image + i}`} src={image} onLoad={imgLoad} />
            )
        )}
    </Media>
  ))
)
