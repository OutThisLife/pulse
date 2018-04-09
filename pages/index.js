// @flow
import styled from 'styled-components'

import Time from '../components/time'
import Search from '../components/search'
import Graph from '../components/graph'
import Results from '../components/results'

const Section = styled.section.attrs({
  style: ({ start = 3, end = -3, row = 'auto' }) => ({
    gridColumn: `${start} / ${end}`,
    gridRow: row
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

export default (): Element<'any'> =>
  <Section>
    <Time />

    <Section start={3} end={20}>
      <Search />
      <Graph />
      <Results />
    </Section>

    <Section start={21} end={-3}>
      <Search />
      <Graph />
      <Results />
    </Section>

    <Section start={3} end={20}>
      <Search />
      <Graph />
      <Results />
    </Section>

    <Section start={21} end={-3}>
      <Search />
      <Graph />
      <Results />
    </Section>

    <Section>
      <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
        <a href='javascript:;' style={{ display: 'block', fontSize: '1.5rem' }}>Add More</a>
      </div>
    </Section>
  </Section>
