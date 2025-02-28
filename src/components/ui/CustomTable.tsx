import { JobData } from "@/common/types/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { CustomAlert } from "../CustomAlert";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";



interface CustomTableProps {
    data: JobData[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
    const [jobs, setJobs] = useState<JobData[]>([])
    const [modalOpen,setModalOpen] = useState<boolean>(false)
    const [id,setId] = useState<string>()
    useEffect(() => {
        console.log(data, 'data jobs new');
        setJobs(data)
    }, [data])
    return (
        <Table>
            <TableCaption>A list of your jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Comany Name</TableHead>
                    <TableHead>jobTitile</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead >Dicription</TableHead>
                    <TableHead >VIEW</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs?.map((item:JobData) => (
                    <TableRow key={item?._id} >
                        <TableCell className="font-medium">{item?.companyName}</TableCell>
                        <TableCell>{item?.jobTitle}</TableCell>
                        <TableCell onClick={()=>{
                            setModalOpen((state)=>!state)
                            setId(item?._id)
                            }} className="bg-black text-center text-white rounded-xl max-w-[1%] cursor-pointer">{`${item?.jobsStatus == true ? "blocked" : "active"}`}</TableCell>
                        <TableCell >{item?.jobDescription}</TableCell>
                        <GrView />

                    </TableRow>
                ))}
            </TableBody>
            <CustomAlert header="" description="" modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />

        </Table>
        
    )

}
