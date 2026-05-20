import { useState } from "react";

import styles from "./history.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import TransactionSection from "@/components/transaction/TransactionSection";
import Pagination from "@/components/pagination/Pagination";
import { useTransactionsQuery } from "./../../hooks/useTransactionsQuery";
import StatusCard from "@/components/card/StatusCard/StatusCard";
import FilterGroup from "@/components/filter/FilterGroup";
import Seo from "@/components/seo/Seo";

const ITEMS_PER_PAGE = 10;
const periodOptions = ["전체", "1개월", "3개월", "6개월", "1년"];
const typeOptions = ["전체", "입금", "출금", "이체"];
const periodValues = ["all", "1", "3", "6", "12"];
const typeValues = ["all", "in", "out", "TRANSFER"];

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState("1개월");
  const [selectedType, setSelectedType] = useState("전체");

  const period = periodValues[periodOptions.indexOf(selectedPeriod)] || "1";
  const type = typeValues[typeOptions.indexOf(selectedType)] || "all";

  const {
    data,
    isLoading,
    isError,
    error,
  } = useTransactionsQuery({ page, period, type });

  const transactionData = data?.data;
  const transactions = transactionData?.transactions || [];
  const totalCount = transactionData?.total_count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <>
        <Seo
            title="도토리뱅크 거래내역"
            description="거래내역 페이지"
        />
        <div className="main">
            <div className={styles.container}>
                <div className={styles.history}>
                <PageHeader
                    title="거래 내역"
                    description="입출금계좌의 모든 거래를 확인하세요"
                    big
                    left
                />

                <div className={styles.filterWrapper}>
                    <FilterGroup
                    options={periodOptions}
                    selected={selectedPeriod}
                    onChange={(value) => {
                        setSelectedPeriod(value);
                        setPage(1);
                    }}
                    />

                    <FilterGroup
                    options={typeOptions}
                    selected={selectedType}
                    onChange={(value) => {
                        setSelectedType(value);
                        setPage(1);
                    }}
                    />
                </div>

                {isLoading ? (
                    <StatusCard title="거래내역을 불러오고 있어요" />
                ) : isError ? (
                    <StatusCard
                    title={error.message}
                    isError
                    />
                ) : (
                    <>
                    <TransactionSection
                        title="전체 거래내역"
                        transactions={transactions}
                        accountId={transactionData?.account_id}
                        totalCount={totalCount}
                        desc={
                        <>
                            선택한 조건의 거래내역이 없어요<br />
                            다른 기간이나 유형을 선택해보세요
                        </>
                        }
                        btnText="내 계좌로 돌아가기"
                        btnValue="/account"
                    />
                    {totalCount !== 0 && (
                        <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        />
                    )}
                    </>
                )}
                </div>
            </div>
        </div>
    </>
    
  );
};

export default HistoryPage;
