import React from 'react'
import './styles/pagination.scss';

// ICONS
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const Pagination = (props) => {
    let currentPage = props.currentPage         // Besked for parent (output)
    let setCurrentPage = props.setCurrentPage;  // Input from parent
    let itemsOfPages = props.itemsOfPages       // Input from parent

    // Change 'page' - gets the page, it must show now
    const turnPage = (page) => {
        setCurrentPage(page) // Parent
    }

    return (
        <div id='pagination'>
            {/* PAGINATION of tours */}
            <button disabled={currentPage <= 0} onClick={() => turnPage(currentPage - 1)}><IoMdArrowDropleft /></button>

            {/* PAGINATION NUMBERS */}
            {[...Array(itemsOfPages)].map((s, i) => (
                <button
                    key={"p" + i}
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? "pagination-active" : null}
                >{i + 1}</button>
            ))}

            <button disabled={currentPage >= itemsOfPages - 1} onClick={() => turnPage(currentPage + 1)}><IoMdArrowDropright /></button>
        </div>
    )
}

export default Pagination