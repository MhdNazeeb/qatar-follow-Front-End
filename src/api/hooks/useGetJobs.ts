
// import { useQuery } from "@tanstack/react-query";
// import adminApi from "../axios.instence";
// import { toastError } from "@/utils/toast";
// import { JobData } from "@/common/types/types";

// export function useGetJobs(page:any) {
//     return useQuery<JobData[]>({

//         queryKey: ["jobs"],
//         queryFn: async () => {
//             console.log('get jobs bro here awe are dong enthoko');

//             try {
//                 const { data } = await adminApi.get<JobData[]>("/job",{params:page,10});

//                 return data;
//             } catch (error: any) {
//                 toastError(error || "Failed to fetch jobs");
//                 throw error;
//             }
//         },
//         staleTime: 5 * 60 * 1000,
//     });
// }

import { useQuery } from "@tanstack/react-query";
import adminApi from "../axios.instence";
import { toastError } from "@/utils/toast";
import { JobData } from "@/common/types/types";

export function useGetJobs(page: number) {
    return useQuery<any>({
        queryKey: ["jobs", page],
        queryFn: async () => {
            try {
                const { data } = await adminApi.get<JobData[] | any>("/job", {
                    params: { page, limit: 10 },
                });

                return data;
            } catch (error: any) {
                toastError(error?.message || "Failed to fetch jobs");
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000,
    });
}
