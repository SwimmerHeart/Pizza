import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from "react-paginate";

type PaginationProps = {
    onChangePage: (i: number) => void
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({onChangePage, currentPage}) => {

    return (
        <ReactPaginate
            breakLabel="..."
            className={styles.root}
            nextLabel=">"
            onPageChange={(e) => {
                onChangePage(e.selected + 1)
            }}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
        />
    )
}
export default Pagination