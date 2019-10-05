import React, { useEffect } from 'react'
import { Router, Location, navigate, Redirect } from '@reach/router'
import classnames from 'classnames'
import { Button } from '@brightleaf/elements'
import { MDXProvider } from '@mdx-js/react'
import { useStyleSheet, useStyles } from '@brightleaf/react-hooks'
import Home from '../features/home'
import FirstSlide from '../slides/001.mdx'
import SecondSlide from '../slides/002.mdx'
import ThirdSlide from '../slides/003.mdx'
import FourthSlide from '../slides/004.mdx'
import CodeBlock from '../components/code-block'
import './app.scss'
import './animate.scss'
import './slide.scss'

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}
const nextKey = 'ArrowRight'
const backKey = 'ArrowLeft'
const SlideHolder = ({ component: Component, next, ...props }) => {
  const onKeyPressEventHandler = e => {
    console.log('e.key', e.key)
    if (e.key === nextKey) {
      navigate(`/${next}`, { state: { move: 'forward' } })
    }
    if (e.key === backKey) {
      navigate(`/${next - 2}`, { state: { move: 'back' } })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPressEventHandler)
    return () => {
      window.removeEventListener('keydown', onKeyPressEventHandler)
    }
  }, [Component])
  return (
    <div className="slide">
      <Component {...props} />
      <Button
        onClick={e => {
          navigate(`/${next - 2}`, { state: { move: 'back' } })
        }}
      >
        Back
      </Button>
      <Button
        onClick={e => {
          navigate(`/${next}`, { state: { move: 'forward' } })
        }}
      >
        Next
      </Button>
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
          <SlideHolder path="/4" component={FourthSlide} next={1} />
          <Redirect to="/" from="/0" />
        </SlideTransitionRouter>
      </React.Suspense>
    </MDXProvider>
  )
}

export default App
