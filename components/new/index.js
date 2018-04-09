// @flow
import Section from '../section'
import styled from 'styled-components'

const Add = styled(Section)`
grid-template-columns: 1fr;
grid-auto-rows: unset;
align-items: center;
margin-top: calc(var(--cellSize));
background: rgba(255,255,255,.01);

> a {
  display: inline-block;
  color: #FFF;
  line-height: 0;
  margin: auto;
  padding: 20px;
  border-radius: 100em;
  border: 1px solid var(--border);
  background: var(--border);

  &:not(:hover) {
    text-decoration: none;
  }

  &:hover {
    border-color: rgba(255,255,255,.2);

    &:active {
      transform: translate(0, 1px);
    }
  }
>
`

export default props =>
  <Add {...props}>
    <a href='javascript:;'>add another</a>
  </Add>
