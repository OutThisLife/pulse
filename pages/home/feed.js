// @flow
import { pure } from 'recompose'
import styled from 'styled-components'
import moment from 'moment'
import Linkify from 'react-linkify'

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
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 82px 1fr;

    + article {
      margin-top: calc(var(--cellSize) / 2);
    }

    span {
      grid-column: 2 / -1;
      word-break: break-word;
      padding: calc(var(--cellSize) / 2);
      background: rgba(0, 0, 0, 0.5);
    }

    time {
      grid-column: 1 / 1;
      opacity: 0.6;
      display: block;
      text-align: right;
      filter: grayscale(1);
      margin-bottom: 5px;
    }
  }

  p {
    margin: 0;
  }
`

export default pure(({ items = [] }: { items: {}[] }) => (
  <Feed id="feed">
    {!items && <em>None.</em>}
    {items.map(({ title, url, time }) => (
      <article key={`feed@${url}`}>
        <time>
          <a href={url} target="_blank" rel="noreferrer noopener" alt={time}>
            {moment.unix(parseInt(time)).fromNow()}
          </a>
        </time>

        <Linkify
          properties={{
            target: '_blank',
            rel: 'noreferrer noopener'
          }}>
          {title}
        </Linkify>
      </article>
    ))}
  </Feed>
))
