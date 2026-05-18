import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "@/store/useStore";

import styles from "@/pages/products/products.module.css"
import PageHeader from "@/components/pageHeader/PageHeader"
import DepositCard from "@/components/card/depositCard/DepositCard"
import Modal from "@/components/modal/Modal"
import BannerCard from '@/components/card/bannerCard/BannerCard';
import StatusCard from "@/components/card/StatusCard/StatusCard";

import { useProductsQuery } from "@/hooks/useProductsQuery";

import mountain from '@/assets/mountain.png'
import { useEffect } from "react";

const ProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const isLogin = useStore((state) => state.isLogin);
    const isAuthChecked = useStore((state) => state.isAuthChecked);
    console.log(isLogin);

    const { data, isLoading, isError, error } = useProductsQuery();

    const products = data?.products || [];

    const signupClickEvent = () => {
      if (!isLogin) {
        setIsModalOpen(true);
      } else {
        navigate("/product/join");
      }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsModalOpen(true);
            }
        };

        if(!isLogin) {
          window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLogin]);

    if (!isAuthChecked) {
        return null;
    }

    return (
        <div className='main'>
            
            <div className={styles.container}>
                {!isLogin && (
                    <BannerCard 
                        badge="신규 회원 이벤트"
                        title="회원가입 즉시 300만원 지원"
                        desc="도토리은행 신규 회원에게 드리는 가입 축하금 · 입출금계좌로 즉시 입금"
                        btnText="회원가입하고 받기"
                        img={mountain}
                        value={'/signup'}
                    />
                )}
                <div className={styles.products}>
                    <PageHeader
                    title="예금 상품"
                    description="나에게 맞는 예금 상품을 살펴보세요"
                    big
                    left
                    />

                    <div className={styles.cardGrid}>
                      {isAuthChecked == false && isLoading ? (
                          <StatusCard title="상품을 불러오고 있어요" />
                      ) : isError ? (
                          <StatusCard title={error.message} isError />

                      ) : products.length === 0 ? (
                          <StatusCard title="가입 가능한 상품이 없습니다." />

                      ) : (
                          products.map((product, index) => (
                              <DepositCard
                                  key={index}
                                  title={product.product_name}
                                  type={product.product_type}
                                  rate={product.interest_rate}
                                  maxPeriod={product.max_period_months}
                                  description={product.product_desc}
                                  btnText="가입하기"
                                  onClick={signupClickEvent}
                              />
                          ))
                      )}
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <Modal
                    showLogo
                    title='더 많은 예금 상품을 보려면'
                    description={
                        <>
                            회원가입하면 전체 상품을 둘러보고
                            <br />
                            가입 축하금 300만원도 즉시 받을 수 있어요
                        </>
                    }
                    buttons={[
                        {
                            name: '회원가입하고 시작하기',
                            value: '/signup',
                            active: true,
                        }
                    ]}
                >
                    <span className={styles.link}>이미 도토리 회원이신가요? <Link to="/login">로그인</Link></span>
                </Modal>
            )
            }
        </div>
    )
}

export default ProductsPage