// @flow
import { pure } from 'recompose'
import styled from 'styled-components'

const Section = styled.section.attrs({
  style: ({ start = 3, end = -3, row = 'auto', align = 'initial' }) => ({
    gridColumn: `${start} / ${end}`,
    gridRow: row,
    alignItems: align
  })
})`
  display: grid;
  grid-template-columns: repeat(var(--cells), 1fr);
  grid-auto-rows: minmax(max-content, var(--cellSize));

  @media (max-width: 800px) {
    grid-column: 3 / -3 !important;
  }

  > section {
    padding: calc(var(--cellSize)) 0;
  }
`

export default pure(props => <Section {...props} />)
