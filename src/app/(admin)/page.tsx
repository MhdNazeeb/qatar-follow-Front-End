import JobPostingForm from "@/components/JobPostingForm";


export default function Home() {

  

  return (
    <div className="flex items-center justify-center min-w-[80%]">
       <JobPostingForm  isEdit={false} />
    </div>
  );
}
