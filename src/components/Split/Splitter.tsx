import React from 'react'

type SpliiterProps = {
  separatorRef: React.RefObject<HTMLDivElement | null>
  startResizing: (e: React.MouseEvent) => void
}

const Splitter = ({ separatorRef, startResizing }: SpliiterProps) => {
  return (
    <div
      ref={separatorRef}
      className='w-2 bg-gray-200 cursor-col-resize hover:bg-gray-300 active:bg-gray-400'
      onMouseDown={startResizing}
    />
  )
}

export default Splitter
