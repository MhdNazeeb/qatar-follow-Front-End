import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError, toastSuccess } from "@/utils/toast";
import { setLocalData } from "@/utils/locallStorage";
import { useRouter } from "next/navigation";
import { FormValues } from "@/app/(admin)/user_creation/page";


export function useUserCreation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({

        mutationFn: async (userData: FormValues) => {
            console.log(userData,'this is the user data');
            
            const { data } = await adminApi.post("/user_creation", userData);

            return data;
        },
        onSuccess: (data) => {
            toastSuccess(data)
        },
        onError: (error: any) => {
            toastError(error)
        }



    });

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}
