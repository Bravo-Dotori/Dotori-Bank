export const getTransactions = async ({ page = 1, period = "all", type = "all" } = {}) => {
    const params = new URLSearchParams({
        page: String(page),
        period,
        type,
    });

    const response = await fetch(`/api/transactions?${params.toString()}`, {
        credentials: 'include',
    });
    
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}
