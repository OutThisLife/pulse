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

export default () =>
  <Results>
    <div>Time</div>
    <div>Source</div>
    <div>Title (click for story)</div>

    {[...Array(10).keys()].map(() =>
      <Fragment key={Math.random()}>
        <div>09/09/18 14:33:22</div>
        <div>twitter</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat iusto molestiae, totam culpa ducimus illum, eos sint ea, nisi tempore debitis! Placeat molestias alias neque quibusdam numquam, culpa corrupti iure.</div>
      </Fragment>
    )}
  </Results>
