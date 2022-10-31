import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";


function Pagination({onChangePage, currentPage}) {

    return(
        <ReactPaginate
            breakLabel="..."
            className={styles.root}
            nextLabel=">"
            onPageChange={(e)=>{onChangePage(e.selected+1)}}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage-1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}
export default Pagination