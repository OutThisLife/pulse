// @flow
import { setStatic, pure } from 'recompose'
import styled from 'styled-components'

type Props = {
  start: number,
  end: ?number,
  row: string | number,
  align: string
}

const style = ({ start = 3, end, row, align = 'initial' }: Props) => ({
  gridColumn: `${start} / ${end || -start}`,
  gridRow: row || 'auto',
  alignItems: align
})

const Section = styled.section.attrs({ style })`
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

const Item = styled.div.attrs({ style })``

export default setStatic('Item', pure(props => <Item {...props} />))(pure(props => <Section {...props} />))
