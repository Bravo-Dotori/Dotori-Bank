// 전체 거래 내역
export const getAdminTransactions = async ({ keyword = "", page = 1, period = "all", type = "all" } = {}) => {
    const params = new URLSearchParams({
        keyword,
        page: String(page),
        period,
        type,
    });

    const response = await fetch(`/api/admin/transactions?${params.toString()}`, {
        credentials: 'include',
    });
    
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 고객 관리
export const getAdminUser = async ({ keyword = "", page = 1, period = "all" } = {}) => {
    const params = new URLSearchParams({
        keyword,
        page: String(page),
        period,
    });

    const response = await fetch(`/api/admin/accounts?${params.toString()}`, {
        credentials: 'include',
    });
    
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 계좌 활성화 
export const accountActive = async (account_id,is_active) => {
  const response = await fetch(`/api/admin/accounts/${account_id}/active`,{
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type":
        "application/json",
      },
      body: JSON.stringify({
        is_active,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
};
