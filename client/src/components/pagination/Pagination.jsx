import styles from "./pagination.module.css";

const PAGE_GROUP_SIZE = 5;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const currentGroup = Math.ceil(
    currentPage / PAGE_GROUP_SIZE
  );

  const startPage =
    (currentGroup - 1) * PAGE_GROUP_SIZE + 1;

  const endPage = Math.min(
    startPage + PAGE_GROUP_SIZE - 1,
    totalPages
  );

  const pages = [];

  for (
    let i = startPage;
    i <= endPage;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowBtn}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${
            currentPage === page
              ? styles.active
              : ""
          }`}
          onClick={() =>
            onPageChange(page)
          }
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrowBtn}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;