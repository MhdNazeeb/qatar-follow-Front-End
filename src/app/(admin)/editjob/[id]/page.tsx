
import JobPostingForm from "@/components/JobPostingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJob({ params }: PageProps) {
  // Await the params Promise to get the id
  const { id } = await params;
  
  return (
    <div className="flex items-center justify-center min-w-[80%]">
      <JobPostingForm isEdit={true} jobId={id} />
    </div>
  );
}