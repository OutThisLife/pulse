// @flow
import { pure } from 'recompose'
import styled from 'styled-components'

type Props = {
  start: number,
  end: number,
  row: string | number,
  align: string
}

const Section = styled.section.attrs({
  style: ({ start = 3, end = -3, row, align = 'initial' }: Props) => ({
    gridColumn: `${start} / ${end}`,
    gridRow: row || 'auto',
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
