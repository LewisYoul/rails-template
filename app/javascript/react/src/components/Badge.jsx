import * as React from 'react'

export default function Badge(props) {
  const { className, children } = props;

  return(
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>{children}</span>
  )
}
