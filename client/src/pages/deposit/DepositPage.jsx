import styles from "@/pages/products/products.module.css"
import PageHeader from "@/components/pageHeader/PageHeader"
import DepositCard from "@/components/card/depositCard/DepositCard"
import { useProductsQuery } from "../../hooks/useProductsQuery";
import BannerCard from './../../components/card/bannerCard/BannerCard';

import mountain from '@/assets/mountain.png'
import StatusCard from "../../components/card/StatusCard/StatusCard";

const ProductsPage = () => {
    const { data, isLoading, isError, error } = useProductsQuery();

    const products = data?.products || [];


    return (
        <div className='main'>
            
            <div className={styles.container}>
                <BannerCard 
                    badge="신규 회원 이벤트"
                    title="회원가입 즉시 300만원 지원"
                    desc="도토리은행 신규 회원에게 드리는 가입 축하금 · 입출금계좌로 즉시 입금"
                    btnText="회원가입하고 받기"
                    img={mountain}
                />
                <div className={styles.products}>
                    <PageHeader
                    title="가입 상품"
                    description="가입한 예금 상품을 확인하세요"
                    big
                    left
                    />

                    <div className={styles.cardGrid}>
                    {isLoading ? (
                        <StatusCard title="상품을 불러오고 있어요" />
                    ) : isError ? (
                        <StatusCard title={error.message} isError />

                    ) : products.length === 0 ? (
                        <StatusCard desc="가입 가능한 상품이 없습니다." />

                    ) : (
                        products.map((product, index) => (
                            <DepositCard
                                key={index}
                                title={product.product_name}
                                rate={product.interest_rate}
                                maxPeriod={product.max_period_months}
                                description={product.product_desc}
                                value={'/productsDetail'}
                                btnText="가입하기"
                            />
                        ))
                    )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductsPage