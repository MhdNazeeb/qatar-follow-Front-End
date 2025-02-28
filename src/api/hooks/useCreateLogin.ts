import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError, toastSuccess } from "@/utils/toast";
import { setLocalData } from "@/utils/locallStorage";
import { useRouter } from "next/navigation";


export function useCreateLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        
        mutationFn: async (loginData: { email: string; password: string }) => {

            const { data } = await adminApi.post("/login", loginData);
            return data;
        },
        onSuccess: (data) => {
            setLocalData("user", data)
            toastSuccess(data)
              
            setTimeout(() => {
                router.replace("/")

            }, 1000);
        },
        onError: (error: any) => {
            console.log(error,'this is the error');
            
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
