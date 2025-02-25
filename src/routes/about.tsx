import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className='p-2'>
      <h3>This is resume generator</h3>
    </div>
  )
}
