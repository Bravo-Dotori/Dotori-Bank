import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import styles from "./deposit.module.css";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import PageHeader from "@/components/pageHeader/PageHeader";

import RateCard from "@/components/card/rateCard/RateCard";
import InfoCard from "@/components/card/infoCard/InfoCard";
import NoticeCard from "@/components/card/noticeCard/NoticeCard";
import SimulationCard from "@/components/card/simulationCard/SimulationCard";

import { useDepositDetailQuery } from "@/hooks/useDepositQuery";

const DepositDetailPage = () => {
    const { depositId } = useParams();
    const navigate = useNavigate();

    const { data: product,isLoading,isError, } = useDepositDetailQuery(depositId);

    useEffect(() => {
        if (!isLoading && (isError || !product)) {
            navigate("/deposit", { replace: true });
        }
    }, [isLoading, isError, product, navigate]);

    if (isLoading || !product) {
        return null;
    }

    return (
        <div className="main">
            <div className={styles.container}>
                <div className={styles.depositDetail}>
                    <Breadcrumb
                        items={[
                            {
                                label: '예금상품',
                                path: '/deposit',
                            },
                            {
                                label: product.product_name,
                                path: `/depositDetail/${product.id}`,
                            },
                        ]}
                    />

                    <div className={styles.section}>
                        <div className={styles.leftSection}>
                            <PageHeader
                                title={product.product_name}
                                description={product.product_desc}
                                big
                                left
                            />

                            <RateCard
                                baseRate={
                                    product.interests?.[0]?.interest_rate || 0
                                }
                            />

                            <InfoCard
                                items={[
                                    {
                                        label: '가입 금액',
                                        value: `
                                            ${Number(product.min_amount).toLocaleString()}원
                                            ~
                                            ${Number(product.max_amount).toLocaleString()}원
                                        `,
                                    },
                                    {
                                        label: '가입 개월',
                                        value:
                                            product.min_period_months ===
                                            product.max_period_months
                                                ? `${product.min_period_months}개월`
                                                : `${product.min_period_months}개월 ~ ${product.max_period_months}개월`,
                                    },
                                    {
                                        label: '이자 지급',
                                        value: '만기 일시 지급',
                                    },
                                ]}
                            />

                            <NoticeCard
                                infoType="warning"
                                noticeTitle="가입 전 꼭 확인하세요"
                                noticeText={[
                                    '중도 해지 시 금리 지급이 안 됩니다.',
                                    '만기 전 인출 불가 (해지만 가능)',
                                    '본 상품은 예금자 보호법에 따라 1인당 최고 5천만원까지 보호됩니다',
                                ]}
                            />
                        </div>

                        <div className={styles.rightSection}>
                            <SimulationCard product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositDetailPage;