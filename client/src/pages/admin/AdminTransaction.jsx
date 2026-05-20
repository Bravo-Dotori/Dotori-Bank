import { useState } from "react";

import styles from "./AdminTransaction.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import Pagination from "@/components/pagination/Pagination";
import StatusCard from "@/components/card/StatusCard/StatusCard";
import Form from "@/components/form/Form";
import Btn from "@/components/button/Btn";
import DataTable from "../../components/dataTable/DataTable";
import FilterGroup from "@/components/filter/FilterGroup";

import { useAdminTransactionsQuery } from "../../hooks/useAdminQuery";

const ITEMS_PER_PAGE = 10;
const periodOptions = ["전체", "1개월", "3개월", "6개월", "1년"];
const typeOptions = ["전체", "입금", "출금", "이체"];
const periodValues = ["all", "1", "3", "6", "12"];
const typeValues = ["all", "DEPOSIT", "WITHDRAWAL", "TRANSFER"];

const AdminTransaction = () => {
    const [page, setPage] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState("1개월");
    const [selectedType, setSelectedType] = useState("전체");
    const [form, setForm] = useState({transaction: "", user: ""});
    const [keyword, setKeyword] = useState("");

    const period = periodValues[periodOptions.indexOf(selectedPeriod)] || "1";
    const type = typeValues[typeOptions.indexOf(selectedType)] || "all";

    const { data, isLoading, isError, error } = useAdminTransactionsQuery({
        keyword,
        page,
        period,
        type,
    });

    const transactionData = data?.data;
    const transactions = transactionData?.transactions || [];
    const totalCount = transactionData?.total_count || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

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

    const handleSubmitClick = () => {
        setKeyword(form.transaction);
        setPage(1);
    };

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
                    <div className={styles.searchArea}>
                        <div className={styles.formArea}>
                            <Form
                                name="검색"
                                type="text"
                                placeholder="계좌번호 또는 메모를 입력해보세요"
                                value={form.transaction}
                                onChange={(e) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        transaction: e.target.value,
                                    }));
                                }}
                            />
                            <Btn
                                name="검색"
                                size="middle"
                                active
                                onClick={() => handleSubmitClick()}
                            />
                        </div>

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
                    </div>

                    {isLoading ? (
                        <StatusCard title="거래내역을 불러오고 있어요" />
                    ) : isError ? (
                        <StatusCard
                            title={error.message}
                            isError
                        />
                    ) : totalCount === 0 ? (
                        <StatusCard title="거래내역이 없어요" />
                    ) : (
                        <>
                            <DataTable
                                title="전체 거래 내역"
                                totalCount={totalCount}
                                columns={columns}
                                data={transactions}
                            />

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTransaction;
