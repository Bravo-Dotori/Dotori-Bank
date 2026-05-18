import { useState } from "react";

import styles from "./AdminTransaction.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import Pagination from "@/components/pagination/Pagination";
import StatusCard from "@/components/card/StatusCard/StatusCard";

import { useAdminTransactionsQuery } from "../../hooks/useAdminQuery";

import DataTable from "../../components/dataTable/DataTable";
import FilterGroup from "@/components/filter/FilterGroup";

const ITEMS_PER_PAGE = 10;

const AdminTransaction = () => {
    const [page, setPage] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState("1개월");
    const [selectedType, setSelectedType] = useState("전체");

    const { data, isLoading, isError, error } = useAdminTransactionsQuery();

    const transactionData = data?.data;
    const transactions = transactionData?.transactions || [];

    const periodOptions = ["전체", "1개월", "3개월", "6개월", "1년"];

    const typeOptions = ["전체", "입금", "출금", "이체"];

    // 필터 처리
    const filteredTransactions = transactions.filter((item) => {
        const transactionDate = new Date(item.transaction_at);
        const currentDate = new Date();

        const diffTime = currentDate.getTime() - transactionDate.getTime();

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let maxDays = 30;

        if (selectedPeriod === "전체") maxDays = Infinity;
        if (selectedPeriod === "3개월") maxDays = 90;
        if (selectedPeriod === "6개월") maxDays = 180;
        if (selectedPeriod === "1년") maxDays = 365;

        const periodMatch = diffDays <= maxDays;

        const typeMatch =
            selectedType === "전체" ||
            (selectedType === "입금" && item.type === "DEPOSIT") ||
            (selectedType === "출금" && item.type === "WITHDRAWAL") ||
            (selectedType === "이체" && item.type === "TRANSFER");

        return periodMatch && typeMatch;
    });

    // 페이지네이션
    const totalCount = filteredTransactions.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalCount / ITEMS_PER_PAGE)
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    // 테이블 컬럼
    const columns = [
        {
            header: "일시",
            accessor: "transaction_at",
            render: (value) =>
                value
                    ? new Date(value).toLocaleString("ko-KR")
                    : "-",
        },
        {
            header: "출금 계좌",
            accessor: "from_account_number",
        },
        {
            header: "입금 계좌",
            accessor: "to_account_number",
        },
        {
            header: "거래 유형",
            accessor: "type",
        },
        {
            header: "금액",
            accessor: "amount",
            render: (value) =>
                value?.toLocaleString() + "원",
        },
        {
            header: "메모",
            accessor: "description",
            render: (value) => value || "-",
        },
    ];

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
                            <DataTable
                                title="전체 거래 내역"
                                totalCount={totalCount}
                                columns={columns}
                                data={paginatedTransactions}
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

export default AdminTransaction;