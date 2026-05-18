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
export const useAdminTransactionsQuery =
  () => {
    return useQuery({
      queryKey: [
        "adminTransaction",
      ],

      queryFn:
        getAdminTransactions,
    });
  };

// 회원 목록 조회
export const useAdminUserQuery =
  () => {
    return useQuery({
      queryKey: ["adminUser"],

      queryFn: getAdminUser,
    });
  };

// 계좌 활성화 / 비활성화
export const useAccountStatusMutation =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        account_id,
        is_active,
      }) =>
        accountActive(
          account_id,
          is_active
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "adminUser",
            ],
          }
        );
      },
    });
  };