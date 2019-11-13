import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
export default ({ children }) => {
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language="javascript"
      theme={nightOwl}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const props = getTokenProps({ token, key })
                console.log('props', props)
                if (props.className.indexOf('number') > -1) {
                  props.className = props.className.replace('number', 'xnumber')
                }
                return <span key={key} {...props} />
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
