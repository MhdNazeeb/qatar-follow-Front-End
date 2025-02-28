"use client"
import { useGetJobs } from '@/api/hooks/useGetJobs';
import { CustomTable } from '@/components/ui/CustomTable'
import { useEffect } from 'react';

export default function JobListing() {
  const { data: jobs, isLoading, isError, error } = useGetJobs();
  return (
    <div className='w-[80%] flex justify-center' >
      <CustomTable  data={jobs || []} />
    </div>
  )
}
