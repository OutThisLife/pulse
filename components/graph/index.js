// @flow
import styled from 'styled-components'
import { TimeSeries } from 'pondjs'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  Resizable
} from 'react-timeseries-charts'

const data = require('../../static/usd_vs_aud.json')
const points = data.widget[0].data.reverse()
const series = new TimeSeries({
  name: 'USD_vs_AUD',
  columns: ['time', 'value'],
  points
})

const Graph = styled(Resizable)`
grid-row: 2;
grid-column: 1 / -1;
width: 100%;
height: 100px;
color: #00ff00;
font-size: 10px;
font-family: monospace;
margin: auto;
border: 0;
background: #000058;
`

export default () => (
  <Graph>
    <ChartContainer timeRange={series.range()} format="%b '%y" timeAxisTickCount={5}>
      <ChartRow height="150">
        <YAxis
          id="price"
          label="Price ($)"
          min={series.min()}
          max={series.max()}
          width="60"
          format="$,.2f"
        />

        <Charts>
          <LineChart axis="price" series={series} />

          <Baseline
            axis="price"
            value={series.max()}
            label="Max"
            position="right"
          />

          <Baseline
            axis="price"
            value={series.min()}
            label="Min"
            position="right"
          />

          <Baseline axis="price" value={series.avg() - series.stdev()} />
          <Baseline axis="price" value={series.avg() + series.stdev()} />
          <Baseline axis="price" value={series.avg()} label="Avg" />
        </Charts>
      </ChartRow>
    </ChartContainer>
  </Graph>
)
