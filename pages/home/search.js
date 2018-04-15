// @flow
import { pure } from 'recompose'
import styled from 'styled-components'
import theme from '../../utils/theme'

const Search = styled.div`
  padding: var(--cellSize) 0;

  input {
    display: block;
    color: ${theme.text};
    font-size: ${theme.scale(16, 24)};
    width: 100%;
    padding: calc(var(--cellSize) / 2);
    border: 2px solid transparent;
    background: rgba(0, 0, 0, 0.7);

    &::placeholder {
      opacity: 0.5;
      color: ${theme.text};
    }

    &:focus::placeholder {
      opacity: 0.2;
    }

    &:focus {
      outline: none;
      border-color: ${theme.link};
    }
  }
`

export default pure(() => (
  <Search>
    <input type="text" autoComplete="off" placeholder="#syria" />
  </Search>
))
