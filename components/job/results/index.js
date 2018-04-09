// @flow
import { Fragment } from 'react'
import styled from 'styled-components'

const Results = styled.div`
grid-row: 3;
grid-column: 1 / -1;
display: grid;
grid-template-columns: auto auto 1fr;

> div {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-bottom: 0;

  &:first-child, + div {
    border-left: 0;
  } &:nth-child(3n) {
    border-right: 0;
  }
}

> div:nth-child(-n+3) {
  color: rgba(255,255,255,.2);
  background: var(--thead);
}

> div:nth-child(3) ~ div:nth-child(3n):hover {
  cursor: pointer;
  text-decoration: underline;
  background: rgba(255,255,255,.05);
}

> div:nth-last-child(-n+9) {
  opacity: 0.7;
} > div:nth-last-child(-n+6) {
  opacity: 0.4;
} > div:nth-last-child(-n+3) {
  opacity: 0.2;
}
`

export default ({ results = [] }) =>
  <Results>
    <div>Time</div>
    <div>Source</div>
    <div>Title (click for story)</div>

    {results.map(({ time, source, title }) =>
      <Fragment key={Math.random()}>
        <div>{time}</div>
        <div>{source}</div>
        <div>{title}</div>
      </Fragment>
    )}
  </Results>
