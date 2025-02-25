import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='basis-1/2 text-2xl bg-red-400 h-full w-full'></div>
      <div className='basis-1/2 text-2xl bg-green-400 h-full w-full'></div>
      {/* <h3>Welcome Home!</h3> */}
    </div>
  )
}
