// 전체 상품 조회 api
export const getProducts = async () => {
    const response = await fetch('/api/products');

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 내 상품 조회 api
export const getMyProducts = async () => {
    const response = await fetch('/api/products/myProducts', {
        credentials: 'include',
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 내 상품 상세 조회 api
export const getMyProductDetail = async (productId) => {
    const response = await fetch(`/api/products/myProducts/${productId}`, {
        credentials: 'include',
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

// 내 상품 해지 api
export const productCancel = async (productId) => {
    const response = await fetch(`/api/products/myProducts/${productId}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
}

