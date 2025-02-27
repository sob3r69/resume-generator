import { TFormState } from '../../shared/types'

type ResumePreviewProps = {
  state: TFormState | undefined
}

const ResumePreview = ({ state }: ResumePreviewProps) => {
  return (
    <div className='h-full w-full bg-green-400'>
      <p>Name: {state?.name}</p>
      <p>Title: {state?.title}</p>
      <p>Surname: {state?.surname}</p>
    </div>
  )
}

export default ResumePreview
