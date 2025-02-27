import { createFileRoute } from '@tanstack/react-router'
import { useActionState } from 'react'
import ResumeForm from '../components/ResumeForm/ResumeForm'
import SplitContainer from '../components/Split/SplitContainer'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

async function submitAction(previousState: unknown, formData: FormData) {
  console.log(previousState)
  console.log(formData.get('name'))
  return {
    name: formData.get('name'),
    title: formData.get('title'),
    surname: formData.get('surname'),
  } as TFormState
}

type TFormState = { name: string; title: string; surname: string }

function HomeComponent() {
  const [state, actionFn] = useActionState(submitAction, undefined)

  return (
    <SplitContainer>
      <ResumeForm actionFn={actionFn} />
      <div className='h-full w-full bg-green-400'>
        <p>Name: {state?.name}</p>
        <p>Title: {state?.title}</p>
        <p>Surname: {state?.surname}</p>
      </div>
    </SplitContainer>
  )
}
