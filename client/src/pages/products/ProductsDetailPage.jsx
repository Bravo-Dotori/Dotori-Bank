import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from "./products.module.css"

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import PageHeader from "@/components/pageHeader/PageHeader"

import RateCard from "@/components/card/rateCard/RateCard"
import InfoCard from "../../components/card/infoCard/InfoCard"
import StatusCard from "@/components/card/StatusCard/StatusCard";

import Modal from "@/components/modal/Modal"

import { useMyProductDetailQuery, useProductCancelMutation } from '../../hooks/useProductsQuery';

const ProductsDetailPage = () => {
    const { productId } = useParams();
    const [modalType, setModalType] = useState(null);
    const {data, isLoading, isError, error} = useMyProductDetailQuery(productId);
    const productCancelMutation =useProductCancelMutation();

    const product = data?.product?.[0];
    console.log(product)
    console.log(productId)
    console.log(data)
    
    const productCancel = async () => {
      try {
          await productCancelMutation.mutateAsync(productId);
          setModalType('complete');
      } catch (err) {
          alert(err.message);
      }
    }

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.productsDetail}>
                  {isLoading ? (
                        <StatusCard title="상품을 불러오고 있어요" />
                    ) : isError ? (
                        <StatusCard title={error.message} isError />
                    ) : (
                        <>
                            <Breadcrumb
                                items={[
                                    {
                                        label: '가입 상품',
                                        path: '/products',
                                    },
                                    {
                                        label: product?.product_name,
                                        path: `/products/${productId}`,
                                    },
                                ]}
                            />

                            <div className={styles.section}>
                                <div className={styles.leftSection}>

                                    <PageHeader
                                        title={product?.product_name}
                                        description={product?.product_desc}
                                        big
                                        left
                                    />

                                    <RateCard
                                        baseRate={Number(product?.interest_rate || 0)}
                                    />

                                    <InfoCard
                                        items={[
                                            {
                                                label: '가입 개월',
                                                value: product?.target_period_months
                                                    ? `${product.target_period_months}개월`
                                                    : '자유입출금',
                                            },
                                            {
                                                label: '상품 종류',
                                                value:  product?.product_type === "demand"
                                                    ? "입출금"
                                                    : product?.product_type === "deposit"
                                                    ? "예금"
                                                    : ""
                                            },
                                        ]}
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
                        </>
                    )
                  }
                </div>
            </div>

            {modalType === 'terminate' && (
                <Modal
                    showLogo
                    type="danger"
                    title='정말로 해지하시겠습니까?'
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
                            onClick: productCancel,
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