export const createDeposit = async ({
    product_id,
    target_period_months,
    target_amount,
}) => {
    const response = await fetch('/api/deposits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            product_id,
            target_period_months,
            target_amount,
        }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message);
    }

    return data;
};

export const fetchDepositDetail = async (depositId) => {
    const response = await fetch(`/api/products/${depositId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "상품 조회 실패");
        
    }
    return data;
};