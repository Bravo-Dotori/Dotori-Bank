import { useState } from 'react';
import { useParams } from "react-router-dom";

import styles from "./deposit.module.css"

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import PageHeader from "@/components/pageHeader/PageHeader"

import RateCard from "@/components/card/rateCard/RateCard"
import InfoCard from "../../components/card/infoCard/InfoCard"
import NoticeCard from "../../components/card/noticeCard/NoticeCard"
import SimulationCard from "../../components/card/simulationCard/SimulationCard"

import Btn from "@/components/button/Btn"

const DepositDetailPage = () => {
    const { productId } = useParams();

    const [interestRate, setInterestRate] = useState(4.0);
    const [infoType, setInfoType] = useState('warning');
    const [noticeTitle, setNoticeTitle] = useState('가입 전 꼭 확인하세요');
    const [noticeText, setNoticeText] = useState([
        '중도 해지 시 금리 지급이 안 됩니다.',
        '만기 전 인출 불가 (해지만 가능)',
        '본 상품은 예금자 보호법에 따라 1인당 최고 5천만원까지 보호됩니다'
    ]);

    const fetchDepositDetail = async () => {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
    }

    // useEffect(() => {
    //     fetchDepositDetail();
    // }, []);

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.depositDetail}>
                    <Breadcrumb
                        items={[
                            {
                                label: '예금상품',
                                path: '/deposit',
                            },
                            {
                                label: '도토리 정기예금',
                                path: '/deposit/1',
                            },
                        ]}
                    />
                    <div className={styles.section}>
                        <div className={styles.leftSection}>
                            <PageHeader
                                title="도토리 정기예금"
                                description="안정적인 24개월 정기 예금 — 매월 일정 금액으로 도토리를 모아보세요"
                                big
                                left
                            />

                            <RateCard
                                baseRate={interestRate}
                            />

                            <InfoCard
                                items={[
                                    {
                                        label: '가입 금액',
                                        value: '월 10만원 ~ 1,000만원',
                                    },
                                    {
                                        label: '가입 개월',
                                        value: '6개월 ~ 24개월',
                                    },
                                    {
                                        label: '이자 지급',
                                        value: '만기 일시 지급',
                                    },
                                ]}
                            />

                            <NoticeCard
                                infoType={infoType}
                                noticeTitle={noticeTitle}
                                noticeText={noticeText}
                            />
                        </div>

                        <div className={styles.rightSection}>
                            <SimulationCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepositDetailPage