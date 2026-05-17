// 전체 상품 조회 api
export const getProducts = async () => {
    const response = await fetch('/api/products');

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}
