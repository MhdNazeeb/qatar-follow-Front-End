import JobPostingForm from "@/components/JobPostingForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditJob({ params }: PageProps) {
  return (
    <div className="flex items-center justify-center min-w-[80%]">
      <JobPostingForm isEdit={true} jobId={params.id} />
    </div>
  );
}
