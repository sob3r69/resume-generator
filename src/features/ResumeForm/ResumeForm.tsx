type ResumeFormProps = {
  actionFn: (payload: FormData) => void
}

const ResumeForm = ({ actionFn }: ResumeFormProps) => {
  return (
    <form action={actionFn} className='p-4 space-y-4 w-full'>
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
        // formAction={actionFn}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </button>
    </form>
  )
}

export default ResumeForm
