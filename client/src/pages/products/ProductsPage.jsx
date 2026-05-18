import styles from "./products.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import DepositCard from "@/components/card/depositCard/DepositCard"
import StatusCard from "@/components/card/StatusCard/StatusCard";

import { useMyProductsQuery } from '../../hooks/useProductsQuery';
import useStore from "@/store/useStore";

const ProductsPage = () => {
  const isAuthChecked = useStore((state) => state.isAuthChecked);
  const { data, isLoading, isError, error } = useMyProductsQuery();
  const products = data?.products || [];
  console.log(products)
  
  if (!isAuthChecked) {
    return null;
  }
  return (
    <div className='main'>
      <div className={styles.container}>
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
                  <StatusCard title="가입한 상품이 없습니다." />

              ) : (
                  products.map((product,index) => (
                    <DepositCard
                      key={index}
                      title={product.product_name}
                      type={product.product_type}
                      rate={product.interest_rate}
                      maxPeriod={
                        product.product_type === "deposit"
                          ? product.target_period_months
                          : undefined
                      }
                      description={product.product_desc}
                      value={`/products/${product.id}`}
                    />
                  ))
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductsPage