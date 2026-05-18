import { useEffect, useState } from "react";

import styles from "./history.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import TransactionSection from "@/components/transaction/TransactionSection";
import Btn from "@/components/button/Btn";
import Pagination from "@/components/pagination/Pagination";
import { useTransactionsQuery } from "./../../hooks/useTransactionsQuery";
import StatusCard from "@/components/card/StatusCard/StatusCard";

const HistoryPage = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useTransactionsQuery();

  const transactionData = data?.data;

  const transactions =
    transactionData?.transactions || [];

  const [selectedPeriod, setSelectedPeriod] =
    useState("1개월");

  const [selectedType, setSelectedType] =
    useState("전체");

  const periodOptions = [
    "전체",
    "1개월",
    "3개월",
    "6개월",
    "1년",
  ];

  const typeOptions = [
    "전체",
    "입금",
    "출금",
    "이체",
  ];

  // 필터 처리
  const filteredTransactions =
    transactions.filter((item) => {
      const transactionDate = new Date(
        item.transaction_at
      );

      const currentDate = new Date();

      const diffTime =
        currentDate.getTime() -
        transactionDate.getTime();

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      let maxDays = 30;

      if (selectedPeriod === "전체") {
        maxDays = Infinity;
      }

      if (selectedPeriod === "3개월") {
        maxDays = 90;
      }

      if (selectedPeriod === "6개월") {
        maxDays = 180;
      }

      if (selectedPeriod === "1년") {
        maxDays = 365;
      }

      const periodMatch =
        diffDays <= maxDays;

      const typeMatch =
        selectedType === "전체" ||
        (selectedType === "입금" &&
          (item.type === "DEPOSIT" ||
            item.to_account_id ===
              transactionData?.account_id)) ||
        (selectedType === "출금" &&
          item.type === "WITHDRAWAL") ||
        (selectedType === "이체" &&
          item.type === "TRANSFER");

      return periodMatch && typeMatch;
    });

  const ITEMS_PER_PAGE = 10; // 10개씩 보여지게 하기
  
  // 필터 바뀌면 1페이지로
  useEffect(() => {
    setPage(1);
  }, [selectedPeriod, selectedType]);

  // 페이지네이션
  const totalCount =
    filteredTransactions.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalCount / ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (page - 1) * ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      endIndex
    );

  return (
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
            <div className={styles.filterGroup}>
              {periodOptions.map((option) => (
                <Btn
                  key={option}
                  type="radio"
                  name={option}
                  active={
                    selectedPeriod === option
                  }
                  onClick={() =>
                    setSelectedPeriod(option)
                  }
                />
              ))}
            </div>

            <div className={styles.filterGroup}>
              {typeOptions.map((option) => (
                <Btn
                  key={option}
                  type="radio"
                  name={option}
                  active={
                    selectedType === option
                  }
                  onClick={() =>
                    setSelectedType(option)
                  }
                />
              ))}
            </div>
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
                transactions={
                  paginatedTransactions
                }
                accountId={
                  transactionData?.account_id
                }
                totalCount={totalCount}
                desc={
                    <>
                        선택한 기간 내 거래내역이 없어요<br />
                        다른 기간을 선택하거나 입출금계좌로 돌아가보세요
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
  );
};

export default HistoryPage;