import { useQuery } from "@tanstack/react-query";
import { fetchDepositDetail } from "../api/depositApi";

export const useDepositDetailQuery = (depositId) => {
    return useQuery({
        queryKey: ['depositDetail', depositId],
        queryFn: () => fetchDepositDetail(depositId),
        enabled: !!depositId,
        retry: false,
    });
};