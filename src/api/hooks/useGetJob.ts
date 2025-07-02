import { useQuery } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError } from "@/utils/toast";
import { JobData } from "@/common/types/types";

export function useGetJob(id: string, shouldFetch: boolean) {
    return useQuery<any>({
        queryKey: ["job", id],
        enabled: shouldFetch, 
        queryFn: async () => {
            try {
                const { data } = await adminApi.get<JobData[] | any>(`/job_data/${id}`)
                return data;
            } catch (error: any) {
                console.log(error, 'this is error bro>>>>>>');
                toastError(error?.message || "Failed to fetch jobs");
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000,
    });
}
