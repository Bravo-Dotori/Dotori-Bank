import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactionsApi";

export const useTransactionsQuery  = ({ page = 1, period = "all", type = "all" } = {}) => {
    return useQuery({
        queryKey: ['transactions', page, period, type],
        queryFn: () => getTransactions({ page, period, type }),
        refetchInterval: 5000,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
}
