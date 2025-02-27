import React, { Children, JSX, useCallback, useEffect, useRef, useState } from 'react'
import Splitter from './Splitter'

type SplitContainerProps = {
  children: JSX.Element[]
}

const SplitContainer = ({ children }: SplitContainerProps) => {
  const [isResizing, setIsResizing] = useState(false)
  const [splitPosition, setSplitPosition] = useState(25)
  const separatorRef = useRef<HTMLDivElement>(null)

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const viewport = document.documentElement.clientWidth
        const newPosition = (e.clientX / viewport) * 100
        setSplitPosition(Math.min(Math.max(newPosition, 10), 90))
      }
    },
    [isResizing],
  )

  useEffect(() => {
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, stopResizing])

  const modifiedChildren = [
    children[0],
    <Splitter key={'splitter'} separatorRef={separatorRef} startResizing={startResizing} />,
    children[1],
  ]

  const splittedChildren = Children.toArray(modifiedChildren).map((child, index) => {
    if (index === 0) {
      return (
        <div key={'split-one'} style={{ width: `${splitPosition}%` }}>
          {child}
        </div>
      )
    } else if (index === 1) {
      return <Splitter key={'splitter'} separatorRef={separatorRef} startResizing={startResizing} />
    } else {
      return (
        <div key={'split-two'} style={{ width: `${100 - splitPosition}%` }}>
          {child}
        </div>
      )
    }
  })
  return <div className='h-screen flex'>{splittedChildren}</div>
}

export default SplitContainer
