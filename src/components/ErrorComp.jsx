import React from 'react'

const ErrorComp = (props) => {
  return (
    <div>
      Fejl:
      { props.children }
      - Prøv igen senere
    </div>
  )
}

export default ErrorComp