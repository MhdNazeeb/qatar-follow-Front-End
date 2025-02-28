import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError, toastSuccess } from "@/utils/toast";



export function useJobStatus() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string | undefined) => {
            const { data } = await adminApi.patch(`/job/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toastSuccess(data)
            console.log('invalidateQueries Success');

            queryClient.invalidateQueries({ queryKey: ["jobs"] });

        },
        onError: (error: any) => {
            toastError(error)
        }



    });

    return {
        mutate: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}
