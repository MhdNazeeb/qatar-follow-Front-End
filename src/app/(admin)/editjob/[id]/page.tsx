import JobPostingForm from '@/components/JobPostingForm';
import React from 'react'

function EditJob({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center justify-center min-w-[80%]">
      <JobPostingForm isEdit={true} jobId={params?.id} />
    </div>
  )
}

export default EditJob
