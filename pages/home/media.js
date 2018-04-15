// @flow
import { pure, withHandlers } from 'recompose'
import mediumZoom from 'medium-zoom'

export default withHandlers(() => ({
  imgLoad: () => ({ target }) => {
    if (!target || target.classList.contains('medium-zoom-image')) {
      return
    }

    mediumZoom(target, { background: 'rgba(0,0,0,.8)' })
  }
}))(
  pure(({ items = [], imgLoad }: { items: {}[], imgLoad: Function }) => (
    <div>
      <h2>Media</h2>

      {items.filter(i => i.video || i.image).map(({ video, image }) =>
        video ?
          <video key={`media@${video}`} src={video} controls />
        :
          <img key={`media@${image}`} src={image} onLoad={imgLoad} />
      )}
    </div>
  ))
)
