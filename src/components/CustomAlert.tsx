import { useJobStatus } from "@/api/hooks/useJobStatus";
import { useJobSuperActive } from "@/api/hooks/useJobSuperActive";
import { modalTypes } from "@/common/types/strings";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
interface propsType {
    header: string,
    description: string
    modalOpen: boolean
    setModalOpen?: (value: boolean) => void;
    id?: string
    modalType?: string | null | undefined
}
export function CustomAlert({ header, description, modalOpen, setModalOpen, id, modalType }: propsType) {
    const { mutate, isPending, isError, error } = useJobStatus()
    const { superMutate, isPending: pending, isError: Error } = useJobSuperActive()

    const modalOperation = () => {
        if (modalType == modalTypes.JOB_ACTIVE) {
            mutate(id)
        } else if (modalType == modalTypes.SUPER_ACTIVE) {
            superMutate(id)
        }
        setModalOpen?.(false)
    }

    return (
        <AlertDialog open={modalOpen}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setModalOpen?.(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={modalOperation} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
