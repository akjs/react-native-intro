import React from 'react'
import { navigate } from '@reach/router'
export default () => (
  <main>
    <h1>Slide Deck App</h1>
    <a
      href="/1"
      onClick={e => {
        e.preventDefault()
        navigate('/1', { state: { move: 'forward' } })
      }}
    >
      Slide 1
    </a>
  </main>
)
