import { useState } from 'react';

import useStore from '@/store/useStore';

import styles from "./recommend.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import RecommendDepositCard from "@/components/card/depositCard/RecommendDepositCard"
import DepositCard from "@/components/card/depositCard/DepositCard"

const RecommendPage = () => {
    const { userName, setUserName } = useStore();
    const [interestRate, setInterestRate] = useState(4.0);

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
                        <RecommendDepositCard
                            rate={interestRate}
                            name={userName}
                        />

                        <DepositCard
                            title="꾸준 정기예금"
                            rate={4.5}
                            period="36개월"
                            description="오래 둘수록 커지는 우대 금리"
                            value='/depositDetail'
                        />

                        <DepositCard
                            title="청년 도약예금"
                            rate={5.5}
                            period="24개월"
                            description="만 19~34세 청년 고금리 예금"
                            value='/depositDetail'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendPage