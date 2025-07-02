import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastSuccess } from "@/utils/toast";

export const useEditJobs = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data: any) => adminApi.put(`/job/${data.id}`, { data }),
        onSuccess: (data: any) => {
            toastSuccess(data);
            queryClient.invalidateQueries({
                predicate: (query) => {
                    const key = query.queryKey;
                    return key[0] === "jobs" || key[0] === "job";
                },
            });
        },
        onError: (error: any) => {
            toastSuccess(error)
        },
    });
    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
