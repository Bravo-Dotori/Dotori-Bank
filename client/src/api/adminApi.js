// 전체 거래 내역
export const getAdminTransactions = async (keyword = "") => {
    const response = await fetch(`/api/admin/transactions?keyword=${keyword}`, {
        credentials: 'include',
    });
    
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 고객 관리
export const getAdminUser = async () => {
    const response = await fetch('/api/admin/accounts', {
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