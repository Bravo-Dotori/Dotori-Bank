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