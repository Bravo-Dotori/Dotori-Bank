import { useState } from 'react';

import styles from "./products.module.css"

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import PageHeader from "@/components/pageHeader/PageHeader"

import RateCard from "@/components/card/rateCard/RateCard"
import InfoCard from "../../components/card/infoCard/InfoCard"
import NoticeCard from "../../components/card/noticeCard/NoticeCard"

import Modal from "@/components/modal/Modal"

const ProductsDetailPage = () => {
    const [modalType, setModalType] = useState(null);
    const [interestRate, setInterestRate] = useState(4.0);
    const [infoType, setInfoType] = useState('warning');
    const [noticeTitle, setNoticeTitle] = useState('주의사항');
    const [noticeText, setNoticeText] = useState([
        '중도 해지 시 우대 금리가 적용되지 않으며 기본 금리 절반만 지급됩니다',
        '만기 전 인출 불가 (해지만 가능)',
        '본 상품은 예금자 보호법에 따라 1인당 최고 5천만원까지 보호됩니다'
    ]);

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.productsDetail}>
                    <Breadcrumb
                        items={[
                            {
                                label: '가입 상품',
                                path: '/products',
                            },
                            {
                                label: '도토리 정기예금',
                                path: '/products/1',
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
                            <div className={styles.rightCard}>
                                <div
                                    className={styles.terminate}
                                    onClick={() =>
                                        setModalType('terminate')
                                    }
                                >
                                    해지하기
                                </div>

                                <div className={styles.protectText}>
                                    예금자 보호법에 따라
                                    1인당 5천만원까지 보호
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modalType === 'terminate' && (
                <Modal
                    showLogo
                    type="danger"
                    title='정말로 해지하시겠습니까?'
                    rewardLabel='예상 수령 금액'
                    reward='2,950,000원'
                    rewardDescription='도토리뱅크 1234-56-789012'
                    buttons={[
                        {
                            name: '뒤로가기',
                            active: true,
                            onClick: () =>
                                setModalType(null),
                        },
                        {
                            name: '해지하기',
                            onClick: () =>
                                setModalType('complete'),
                        },
                    ]}
                />
            )}

            {modalType === 'complete' && (
                <Modal
                    showLogo
                    title='해지가 완료되었어요'
                    rewardLabel='수령액'
                    reward='2,950,000원'
                    rewardDescription='도토리뱅크 1234-56-789012'
                    buttons={[
                        {
                            name: '확인',
                            active: true,
                            value: '/products',
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default ProductsDetailPage