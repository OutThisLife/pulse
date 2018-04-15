// @flow
import { pure } from 'recompose'
import styled from 'styled-components'

const IFrame = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

export default pure(({ src }: { src: string }) => (
  <IFrame>
    <iframe src={src} />
  </IFrame>
))
