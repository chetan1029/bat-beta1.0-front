import React from "react";
import ReactPaginate from "react-paginate";
import Icon from "./Icon";

interface PaginationProps {
    pageCount: number;
    onPageChange: (any) => void;
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
    return (
        <div className="react-paginate d-flex justify-content-center">
            {pageCount > 1 && (
                <ReactPaginate
                    previousLabel={<Icon name="pagination-left" className="mx-1 svg-outline-primary cursor-pointer"/>}
                    nextLabel={<Icon name="pagination-right" className="mx-1 svg-outline-primary cursor-pointer"/>}
                    pageCount={pageCount}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    onPageChange={e => onPageChange(e.selected + 1)}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            )}
        </div>
    )
}

export default Pagination
