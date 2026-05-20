import { useEffect, useState } from "react";
import {useAdminUserQuery,useAccountStatusMutation} from "../../hooks/useAdminQuery";

import styles from "./AdminTransaction.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import Pagination from "@/components/pagination/Pagination";
import StatusCard from "@/components/card/StatusCard/StatusCard";
import Form from "@/components/form/Form";
import Btn from "@/components/button/Btn"

import DataTable from "@/components/dataTable/DataTable";
import FilterGroup from "@/components/filter/FilterGroup";
import Toggle from "@/components/toggle/Toggle";

const AdminUser = () => {
    const [page, setPage] = useState(1); // 페이지네이션
    const [selectedPeriod, setSelectedPeriod,] = useState("1개월"); // 기간 필터

    const [form, setForm] = useState({transaction: "",user: ""});
    const [keyword, setKeyword] = useState("");
    const {data, isLoading, isError,error } = useAdminUserQuery(keyword);

    // 계좌 활성화 mutation
    const {mutate: toggleStatus} = useAccountStatusMutation();

    // API 데이터
    const userData = data?.data;
    const users =userData?.accounts || [];

    const periodOptions = ["전체", "1개월", "3개월", "6개월", "1년",];

    // 필터 처리
    const filteredUsers =
        users.filter((item) => {
            const createdDate =new Date(item.created_at);
            const currentDate = new Date();
            const diffTime = currentDate.getTime() - createdDate.getTime();
            const diffDays = Math.floor(diffTime /(1000 * 60 * 60 * 24));

            let maxDays = 30;
            if (selectedPeriod ==="전체") maxDays = Infinity;
            if (selectedPeriod ==="3개월") maxDays = 90;
            if (selectedPeriod === "6개월") maxDays = 180;
            if (selectedPeriod === "1년") maxDays = 365;
            return diffDays <= maxDays;
        });

    const ITEMS_PER_PAGE = 10; // 목록 갯수

    useEffect(() => {
        setPage(1);
    }, [selectedPeriod]);

    // 페이지네이션
    const totalCount = filteredUsers.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // 테이블 컬럼
    const columns = [
        {
            header: "가입일시",
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
                        <div className={styles.filterGroup}>
                            <FilterGroup
                                options={periodOptions}
                                selected={selectedPeriod}
                                onChange={setSelectedPeriod}
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
                    <StatusCard title="거래내역이 없어요" />
                ) : (
                    <>
                        <DataTable
                            title="전체 회원 목록"
                            totalCount={totalCount}
                            columns={columns}
                            data={paginatedUsers}
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
    );
};

export default AdminUser;