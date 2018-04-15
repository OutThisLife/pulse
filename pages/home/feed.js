// @flow
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'
import { TweenLite } from 'gsap'
import faker from 'faker'

const Feed = styled.div`
  position: sticky;
  top: 10vh;
  max-height: 80vh;
  overflow: auto;
  padding: 0 15px 0 0;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: #fff;
  }

  a {
    display: block;
  }
`

type Props = {
  onRef: Function,
  items: {}[]
}

export default compose(
  withState('items', 'setItems', []),
  withHandlers(() => {
    let int = null

    return {
      onRef: ({ setItems }) => (ref: ?HTMLElement) => {
        if (!ref) {
          return
        }

        console.log('on ref ran')

        const $feed = document.getElementById('feed')

        clearInterval(int)
        int = setInterval(
          () =>
            setItems(
              items => {
                items.push(faker.lorem.sentence())
                return items
              },
              () => {
                // prettier-ignore
                TweenLite.fromTo($feed.children[0], 1, {
                  opacity: 0,
                  height: 0,
                  y: -20
                }, {
                  opacity: 1,
                  y: 0,
                  height: 20
                }, 0)
              }
            ),
          500
        )
      }
    }
  })
)(({ onRef, items = [] }: Props) => (
  <Feed ref={onRef} id="feed">
    {items
      .slice()
      .reverse()
      .map(i => (
        <a key={Math.random()} href="javascript:;">
          {i}
        </a>
      ))}
  </Feed>
))
