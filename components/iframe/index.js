// @flow
import { withState } from 'recompose'
import styled from 'styled-components'
import embed from 'embed-video'

const IFrame = styled.div`
  position: relative;
  width: 100%;

  &.open {
    height: 0px;
    padding-top: 56.25%;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

export default withState('isOpen', 'handleOpen', false)(
  ({ src, handleOpen, isOpen }: { src: string, isOpen: boolean }) =>
    ['youtube', 'vimeo'].some(s => src.toString().includes(s)) ? (
      <IFrame
        onClick={() => !isOpen && handleOpen(true)}
        className={isOpen ? 'open' : ''}
        key={src}
        dangerouslySetInnerHTML={{
          __html: isOpen
            ? embed(src, {
                query: {
                  autoplay: 1
                }
              })
            : embed.image(src, {
                image: 'hqdefault'
              })
        }}
      />
    ) : null
)
