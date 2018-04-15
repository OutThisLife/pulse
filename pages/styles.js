import { css } from 'styled-components'
import theme from '../utils/theme'

export default css`
  :root {
    --cells: 40;
    --cellSize: calc(100vw / var(--cells));

    @media (min-width: 2000px) {
      --cellSize: 50px;
    }
  }

  * {
    box-sizing: border-box;
  }

  body,
  html {
    margin: 0;
    padding: 0;
  }

  html {
    color: ${theme.text};
    font-size: ${theme.scale(12, 14)};
    letter-spacing: -0.01em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    line-height: 1.5;
  }

  body {
    min-height: 100vh;
    background: ${theme.bg};

    &:before {
      z-index: -2;
      pointer-events: none;
      content: '';
      opacity: 0.1;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url(/static/map.svg) center 10vh / cover no-repeat;
    }
  }

  ::selection {
    color: #000;
    background: #fff;
  }

  figure {
    margin: 0;
    padding: 0;
  }

  img,
  svg,
  canvas,
  video {
    max-width: 100%;
    height: auto;
    border: 0;
  }

  a {
    color: ${theme.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
