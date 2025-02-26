import { createFileRoute } from '@tanstack/react-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
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

  return (
    <div className='h-screen flex'>
      <div className='h-full' style={{ width: `${splitPosition}%` }}>
        <form className='p-4 space-y-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              id='title'
              name='title'
              type='text'
              className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2'
            />
          </div>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2'
            />
          </div>
          <div>
            <label htmlFor='surname' className='block text-sm font-medium text-gray-700'>
              Surname
            </label>
            <input
              id='surname'
              name='surname'
              type='text'
              className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Submit
          </button>
        </form>
      </div>
      <div
        ref={separatorRef}
        className='w-2 bg-gray-200 cursor-col-resize hover:bg-gray-300 active:bg-gray-400'
        onMouseDown={startResizing}
      />
      <div className='h-full bg-green-400' style={{ width: `${100 - splitPosition}%` }} />
    </div>
  )
}
