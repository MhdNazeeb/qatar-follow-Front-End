"use client"
import { useGetJobs } from '@/api/hooks/useGetJobs';
import PaginationPage from '@/components/PaginationPage';
import { CustomTable } from '@/components/ui/CustomTable'
import { useEffect, useState } from 'react';

export default function JobListing() {
  const [page, setPage] = useState<number | any>(1)
  const { data: jobs, isLoading, isError, error } = useGetJobs(page);
  useEffect(() => {
    console.log(jobs?.length, 'this is page bro>>>>>>');
  }, [page])
  return (
    <div className='w-[80%] flex-col flex justify-center' >
      <CustomTable data={jobs?.jobs || []} />
      <PaginationPage page={page} setPage={setPage} totalPages={jobs?.meta?.totalPages} />
    </div>
  )
}
