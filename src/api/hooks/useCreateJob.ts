import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError, toastSuccess } from "@/utils/toast";
import { FormInputs } from "@/components/JobPostingForm";


export function useCreateJob() {
    const queryClient = useQueryClient();
    const mutation = useMutation({

        mutationFn: async (formData: FormInputs) => {
            const { data } = await adminApi.post("/job", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return data;
        },
        onSuccess: (data) => {
            toastSuccess(data)
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
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
