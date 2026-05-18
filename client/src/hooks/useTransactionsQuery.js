import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactionsApi";

export const useTransactionsQuery  = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions
    });
}
