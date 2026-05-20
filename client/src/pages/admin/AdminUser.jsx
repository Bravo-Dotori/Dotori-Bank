import { useState } from "react";
import {useAdminUserQuery,useAccountStatusMutation} from "../../hooks/useAdminQuery";

import styles from "./AdminTransaction.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import Pagination from "@/components/pagination/Pagination";
import StatusCard from "@/components/card/StatusCard/StatusCard";
import Form from "@/components/form/Form";
import Btn from "@/components/button/Btn";

import DataTable from "@/components/dataTable/DataTable";
import FilterGroup from "@/components/filter/FilterGroup";
import Toggle from "@/components/toggle/Toggle";

const ITEMS_PER_PAGE = 10;
const periodOptions = ["전체", "1개월", "3개월", "6개월", "1년"];
const periodValues = ["all", "1", "3", "6", "12"];

const AdminUser = () => {
    const [page, setPage] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState("1개월");
    const [form, setForm] = useState({transaction: "", user: ""});
    const [keyword, setKeyword] = useState("");

    const period = periodValues[periodOptions.indexOf(selectedPeriod)] || "1";

    const {data, isLoading, isError,error } = useAdminUserQuery({
        keyword,
        page,
        period,
    });

    const {mutate: toggleStatus} = useAccountStatusMutation();

    const userData = data?.data;
    const users = userData?.accounts || [];
    const totalCount = userData?.total_count || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

    const columns = [
        {
            header: "가입일자",
            accessor: "created_at",
            render: (value) => value ? new Date(value).toLocaleString("ko-KR") : "",
        },
        {
            header: "계좌번호",
            accessor:"account_number",
        },
        {
            header: "고객명",
            accessor: "user_name",
        },
        {
            header: "잔액",
            accessor: "balance",
            render: (value) =>`${Number(value).toLocaleString()}원`,
        },
        {
            header: "활성화 여부",
            accessor: "is_active",
            render: (value,row) => (
                <Toggle checked={value} onClick={() => toggleStatus({account_id: row.id, is_active: !value,})}/>
            ),
        },
    ];
    
    const handleSubmitClick = () => {
        setKeyword(form.transaction);
        setPage(1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.history}>
                <PageHeader
                    title="회원 목록"
                    description="전체 회원 정보를 확인하세요"
                    big
                    left
                />

                <div className={styles.searchArea}>
                    <div className={styles.formArea}>
                        <Form
                            name="검색"
                            type="text"
                            placeholder="계좌번호 또는 고객명을 입력해보세요"
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
                        <div className={styles.filterGroup}>
                            <FilterGroup
                                options={periodOptions}
                                selected={selectedPeriod}
                                onChange={(value) => {
                                    setSelectedPeriod(value);
                                    setPage(1);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <StatusCard title="회원 목록을 불러오고 있어요" />
                ) : isError ? (
                    <StatusCard
                        title={error.message}
                        isError
                    />
                ) : totalCount === 0 ? (
                    <StatusCard title="회원 목록이 없어요" />
                ) : (
                    <>
                        <DataTable
                            title="전체 회원 목록"
                            totalCount={totalCount}
                            columns={columns}
                            data={users}
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
    );
};

export default AdminUser;
