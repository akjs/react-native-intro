import React, { useEffect } from 'react'
import { Router, Location, navigate, Redirect } from '@reach/router'
import classnames from 'classnames'
import { Button, Title } from '@brightleaf/elements'
import { MDXProvider } from '@mdx-js/react'
import { useStyleSheet, useStyles } from '@brightleaf/react-hooks'
import Home from '../features/home'
import FirstSlide from '../slides/001.mdx'
import SecondSlide from '../slides/002.mdx'
import ThirdSlide from '../slides/003.mdx'
import FourthSlide from '../slides/004.mdx'
import FifthSlide from '../slides/005.mdx'
import SixthSlide from '../slides/006.mdx'

// import CodeBlock from '../components/code-block'
import './app.scss'
import './animate.scss'
import './slide.scss'

const components = {
  h1: Title,
  /*
  pre: props => <div {...props} />,
  code: CodeBlock,
  */
}
const nextKey = 'ArrowRight'
const backKey = 'ArrowLeft'

const SlideHolder = ({ component: Component, next, ...props }) => {
  const onKeyPressEventHandler = e => {
    if (e.key === nextKey) {
      navigate(`/${next}`, { state: { move: 'forward' } })
    }
    if (e.key === backKey) {
      const backNum = next - 2 > 0 ? next - 2 : 1
      navigate(`/${backNum}`, { state: { move: 'back' } })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPressEventHandler)
    if (window.ExpoSnack) {
      setTimeout(() => {
        window.ExpoSnack.initialize()
      }, 100)
    }

    return () => {
      window.removeEventListener('keydown', onKeyPressEventHandler)
    }
  }, [Component])
  return (
    <div className="slide">
      <Component {...props} />
    </div>
  )
}

const SlideTransitionRouter = props => {
  return (
    <Location>
      {({ location }) => {
        console.log('SlideTransitionRouter location', location)
        return (
          <div
            key={location.key}
            className={classnames('animated', 'mainframe', {
              slideInRight:
                location.state === null ||
                (location.state && location.state.move === 'forward'),
              slideInLeft: location.state && location.state.move === 'back',
            })}
          >
            <Router location={location}>{props.children}</Router>
          </div>
        )
      }}
    </Location>
  )
}

const App = () => {
  useStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans')
  useStyles(`
    html,
    body {
        font-family: 'Open Sans';
    }
    `)

  return (
    <MDXProvider components={components}>
      <React.Suspense fallback={<div>Loading</div>}>
        <SlideTransitionRouter>
          <Home path="/" />
          <SlideHolder path="/1" component={FirstSlide} next={2} />
          <SlideHolder path="/2" component={SecondSlide} next={3} />
          <SlideHolder path="/3" component={ThirdSlide} next={4} />
          <SlideHolder path="/4" component={FourthSlide} next={5} />
          <SlideHolder path="/5" component={FifthSlide} next={6} />
          <SlideHolder path="/6" component={SixthSlide} next={1} />
        </SlideTransitionRouter>
      </React.Suspense>
    </MDXProvider>
  )
}

export default App
