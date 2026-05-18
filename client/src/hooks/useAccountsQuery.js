import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../api/accountApi";

export const useAccountsQuery  = () => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: getAccounts
    });
}
