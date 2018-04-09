// @flow
import styled from 'styled-components'
import { lifecycle } from 'recompose'

const Time = styled.h1`
grid-row: 1;
grid-column: 3 / -3;
text-align: center;
font-size: 5rem;
line-height: 1;

em {
  display: block;
  opacity: 0.2;
  font-style: normal;
  font-size: 1rem;
  font-weight: 400;
}
`

export default lifecycle({
  state: { curTime: 0 },

  componentDidMount () {
    setInterval(() => {
      this.setState({ curTime: new Date().toTimeString().slice(0, 8) })
    })
  }
})(({ curTime }) =>
  <Time>
    {curTime}
    <em>1000 watchers</em>
  </Time>
)
