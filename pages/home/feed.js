// @flow
import { compose, withState, withHandlers } from 'recompose'
import styled from 'styled-components'
import { TweenLite } from 'gsap'
import faker from 'faker'

const Feed = styled.div`
  position: sticky;
  top: var(--cellSize);
  max-height: calc(100vh - var(--cellSize) * 2);
  overflow: auto;
  padding: 0 15px 0 0;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: #fff;
  }

  article {
    overflow: hidden;
    padding: calc(var(--cellSize) / 2);
    background: rgba(0, 0, 0, 0.5);

    + article {
      margin-top: calc(var(--cellSize) / 2);
    }

    header {
      display: flex;
      align-items: center;
      padding-bottom: 15px;

      time {
        opacity: 0.3;
        margin-left: auto;

        a {
          filter: grayscale(1);
        }
      }

      > a:hover {
        text-decoration: none;

        span {
          text-decoration: underline;
        }
      }

      i {
        filter: grayscale(1);
        opacity: 0.3;
        margin-right: 8px;
      }
    }
  }

  p {
    margin: 0;
  }
`

type Props = {
  onRef: Function,
  items: {}[]
}

export default compose(
  withState('items', 'setItems', []),
  withHandlers(() => {
    return {
      onRef: ({ setItems }) => (ref: ?HTMLElement) => {
        if (!ref) {
          return
        }

        const $feed = document.getElementById('feed')

        setItems(items => {
          items.push(faker.lorem.sentence())
          return items
        })

        setInterval(
          () =>
            setItems(
              items => {
                items.push(faker.lorem.sentence())
                return items
              },
              () => {
                // prettier-ignore
                TweenLite.from($feed.children[0], 1, {
                  opacity: 0,
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0
                }, 0)
              }
            ),
          3500
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
        <article key={Math.random()}>
          <header>
            <a href="javascript:;">
              <i className="zocial-twitter" />
              <span>@username</span>
            </a>

            <time>
              <a href="javascript:;">3 seconds ago</a>
            </time>
          </header>

          <p>{i}</p>
        </article>
      ))}
  </Feed>
))
