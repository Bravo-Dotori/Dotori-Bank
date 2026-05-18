import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProductDetail, getMyProducts, getProducts, productCancel } from "../api/productApi";

// 전체 상품 조회
export const useProductsQuery  = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });
}

// 내 상품 조회
export const useMyProductsQuery  = () => {
    return useQuery({
        queryKey: ['myProducts'],
        queryFn: getMyProducts
    });
}

// 내 상품 상세
export const useMyProductDetailQuery  = (productId) => {
    return useQuery({
        queryKey: ['myProductDetail'],
        queryFn: () => getMyProductDetail(productId),
        enabled: !!productId
    });
}

// 상품 해지
export const useProductCancelMutation  = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: productCancel,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['myProducts'],
            });
        },
    });
}
