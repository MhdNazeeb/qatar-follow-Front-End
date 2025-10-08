import { JobData, modalType } from "@/common/types/types";
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
import { useRouter } from "next/navigation";
import { modalTypes, permissions ,userRols} from "@/common/types/strings";
import { useRestrictions } from "@/hooks/useRestrictions";


interface CustomTableProps {
    data: JobData[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
    const { isRestricted } = useRestrictions()
    const [jobs, setJobs] = useState<JobData[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [modalType, setModalType] = useState<modalType[keyof modalType] | null>(null)
    const [id, setId] = useState<string>()
    const router = useRouter()
    useEffect(() => {
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
                    {/* <TableHead >Dicription</TableHead> */}
                    <TableHead >VIEW</TableHead>
                    {!isRestricted(permissions.SUPER_ACTIVE) && <TableHead className="w-[100px]">SuperActive</TableHead>}
                </TableRow>
            </TableHeader>

            <TableBody>
                {jobs?.map((item: JobData) => (
                    <TableRow
                        key={item?._id}
                        className={`transition rounded-xl border-b shadow-sm ${item.role === userRols.HR
                                ? "bg-gray-400 hover:bg-gray-400"
                                : "bg-white hover:bg-gray-50"
                            }`}                    >
                        <TableCell className="py-4 px-4 font-medium">{item?.companyName}</TableCell>
                        <TableCell className="py-4 px-4">{item?.jobTitle}</TableCell>
                        <TableCell
                            className="py-5 px-4 text-center text-white rounded-lg cursor-pointer bg-black"
                            onClick={() => {
                                setModalOpen((state) => !state);
                                setDescription("this is for editing Job_active")
                                setModalType(modalTypes.JOB_ACTIVE)
                                setId(item?._id);
                            }}
                        >
                            {item?.jobsStatus === true ? "blocked" : "active"}
                        </TableCell>

                        {/* <TableCell className="py-4 px-4">{item?.jobDescription}</TableCell> */}
                        <TableCell className="py-4 px-4" onClick={() => {
                            router.push(`/editjob/${item?._id}`);
                        }}>
                            <GrView className="cursor-pointer" />
                        </TableCell>
                        {!isRestricted(permissions.SUPER_ACTIVE) && <TableCell
                            className={`py-5 px-4 text-center text-white rounded-lg cursor-pointer 
                    ${item?.super_active === true ? "bg-green-600" : "bg-red-600"}`}

                            onClick={() => {
                                setModalOpen((state) => !state);
                                setModalType(modalTypes.SUPER_ACTIVE)
                                setDescription("this is for editing super_active")
                                setId(item?._id);
                            }}
                        >
                            {item?.super_active === true ? "active" : "blocked"}
                        </TableCell>}
                    </TableRow>
                ))}
            </TableBody>

            <CustomAlert header="" modalType={modalType} description={description} modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />

        </Table>

    )

}
