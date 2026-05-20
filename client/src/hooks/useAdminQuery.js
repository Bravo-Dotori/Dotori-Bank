import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminTransactions,
  getAdminUser,
  accountActive,
} from "../api/adminApi";

// 전체 거래 내역 조회
export const useAdminTransactionsQuery = ({ keyword, page, period, type }) => {
    return useQuery({
      queryKey: [ "adminTransaction", keyword, page, period, type],
      queryFn: () => getAdminTransactions({ keyword, page, period, type }),
        refetchInterval: 5000,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
  };

// 회원 목록 조회
export const useAdminUserQuery = ({ keyword, page, period }) => {
    return useQuery({
      queryKey: ["adminUser", keyword, page, period],
      queryFn: () => getAdminUser({ keyword, page, period }),
      refetchInterval: 5000,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });
  };

// 계좌 활성화 / 비활성화
export const useAccountStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({account_id, is_active, }) => accountActive(account_id,is_active),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["adminUser"],
        });
      },
    });
  };
