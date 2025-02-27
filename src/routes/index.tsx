import { createFileRoute } from '@tanstack/react-router'
import { useActionState } from 'react'
import SplitContainer from '../components/Split/SplitContainer'
import ResumeForm from '../features/ResumeForm/ResumeForm'
import ResumePreview from '../features/ResumePreview/ResumePreview'
import { TFormState } from '../shared/types'

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

function HomeComponent() {
  const [state, actionFn] = useActionState(submitAction, undefined)

  return (
    <SplitContainer>
      <ResumeForm actionFn={actionFn} />
      <ResumePreview state={state} />
    </SplitContainer>
  )
}
