import React from 'react'
import { navigate } from '@reach/router'
export default () => {
  navigate('/1', { state: { move: 'forward' } })
  return <></>
}
