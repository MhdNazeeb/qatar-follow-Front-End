import { useJobStatus } from "@/api/hooks/useJobStatus";
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
}
export function CustomAlert({ header, description, modalOpen, setModalOpen, id }: propsType) {
    const { mutate, isPending, isError, error } = useJobStatus()
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
                    <AlertDialogAction onClick={()=>{
                        mutate(id)
                        setModalOpen?.(false)
                        }} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
