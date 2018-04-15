// @flow
import { pure } from 'recompose'
import styled from 'styled-components'
import theme from '../../utils/theme'

const Search = styled.form`
  padding: var(--cellSize) 0;

  input {
    display: block;
    color: ${theme.text};
    font-size: ${theme.scale(16, 24)};
    text-align: center;
    width: 100%;
    padding: calc(var(--cellSize) / 2);
    border: 2px solid transparent;
    background: rgba(0, 0, 0, 0.7);

    &::placeholder {
      opacity: 0.3;
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

export default pure(props => (
  <Search action='javascript:;' method='get' {...props}>
    <input type="text" name='s' autoComplete="off" placeholder="Enter tags like #syria, #trump, #oil to see what the world is saying." />
  </Search>
))
