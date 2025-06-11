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
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [id, setId] = useState<string>()
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
                {jobs?.map((item: JobData) => (
                    <TableRow
                        key={item?._id}
                        className="bg-white hover:bg-gray-50 transition rounded-xl border-b shadow-sm"
                    >
                        <TableCell className="py-4 px-4 font-medium">{item?.companyName}</TableCell>
                        <TableCell className="py-4 px-4">{item?.jobTitle}</TableCell>
                        <TableCell
                            className="py-5 px-4 text-center text-white rounded-lg cursor-pointer bg-black"
                            onClick={() => {
                                setModalOpen((state) => !state);
                                setId(item?._id);
                            }}
                        >
                            {item?.jobsStatus === true ? "blocked" : "active"}
                        </TableCell>
                        <TableCell className="py-4 px-4">{item?.jobDescription}</TableCell>
                        <TableCell className="py-4 px-4">
                            <GrView className="cursor-pointer" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <CustomAlert header="" description="" modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />

        </Table>

    )

}
