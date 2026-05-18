export const getTransactions = async () => {
    const response = await fetch('/api/transactions', {
        credentials: 'include',
    });
    
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}