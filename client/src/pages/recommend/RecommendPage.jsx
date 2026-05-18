import { useLocation } from 'react-router-dom';

import useStore from '@/store/useStore';

import styles from "./recommend.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import RecommendDepositCard from "@/components/card/depositCard/RecommendDepositCard"
import DepositCard from "@/components/card/depositCard/DepositCard"

const RecommendPage = () => {
    const location = useLocation();

    const { user } = useStore();

    const recommendations =
        location.state?.recommendations || [];

    const topProduct = recommendations[0];
    const otherProducts = recommendations.slice(1);

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.recommend}>
                    <PageHeader
                        title="도토리님께 딱 맞는 예금 상품"
                        description="설문 답변을 바탕으로 가장 어울리는 3가지 상품을 추천해드려요"
                        big
                    />

                    <div className={styles.cardWrapper}>
                        {topProduct && (
                            <RecommendDepositCard
                                name={user?.name}
                                title={topProduct.product_name}
                                rate={Number(topProduct.interest_rate)}
                                period={`${topProduct.period_months}개월`}
                                minAmount={`${Number(topProduct.min_amount).toLocaleString()}원~`}
                                description="안정적인 고금리 예금 상품"
                                reasons={[
                                    `${topProduct.period_months}개월 예치에 적합`,
                                    `최소 ${Number(topProduct.min_amount).toLocaleString()}원부터 가입 가능`,
                                    `연 ${topProduct.interest_rate}% 금리 제공`,
                                ]}
                            />
                        )}

                        {otherProducts.map((product) => (
                            <DepositCard
                                key={product.id}
                                title={product.product_name}
                                rate={Number(product.interest_rate)}
                                period={`${product.period_months}개월`}
                                description={`${Number(product.min_amount).toLocaleString()}원부터 가입 가능`}
                                value='/depositDetail'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendPage