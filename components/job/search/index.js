// @flow
import styled from 'styled-components'

const Search = styled.form`
grid-row: 1;
grid-column: 1 / -1;
line-height: 1;

input {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: 1.3rem;
  font-family: inherit;
  border: 0;
  border-top: 1px solid #454545;
  padding: 0 calc(var(--cellSize) / 4);
  background: var(--bg);

  &:focus {
    outline: none;

    &::-webkit-input-placeholder {
      opacity: 0.34;
    }
  }
}
`

export default ({ search }) =>
  <Search action='javascript:;'>
    <input
      type='text'
      name='s'
      defaultValue={search}
      placeholder='What do you want to watch? #breaking, #usdcad, ...'
    />
  </Search>
