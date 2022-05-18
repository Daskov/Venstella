import s from './pagination.module.scss'
import cs from "classnames";

const Pagination = ({count, countSize, currentPage, setPage}) => {
    const pagesCount = Math.ceil(count / countSize)
    const pages = []
    for (let i = 1; i <= pagesCount && i <= 4; i++) {
        pages.push(i)
    }
    const setCurrentPage = (count) => {
        setPage(old => ({...old, currentPage: count}))
    }

    return (
        <div className={s.pagination}>
            <div className={s.item} onClick={() => setCurrentPage(currentPage - 1)} aria-disabled={currentPage === 1}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.24832 9.42698L13.5533 1.48718C13.8844 1.17094 14.4206 1.17094 14.7517 1.48718C15.0828 1.8037 15.0828 2.31681 14.7517 2.63305L7.04583 10L14.7517 17.367C15.0828 17.6833 15.0828 18.1964 14.7517 18.5126C14.5861 18.6709 14.3695 18.75 14.1525 18.75C13.9356 18.75 13.7189 18.6709 13.5533 18.5126L5.24832 10.5729C4.91723 10.2563 4.91723 9.74319 5.24832 9.42698Z" fill="#333333"/>
                </svg>
            </div>
            {pages.map(item => (
                <div key={item} className={cs(s.item, {[s.active]: currentPage === item})}
                     onClick={() => setCurrentPage(item)}>{item}</div>
            ))}
            {pagesCount > pages.length + 1 && <div className={cs(s.item, s.none)}>...</div>}
            {pagesCount > pages.length &&
                <div className={cs(s.item, {[s.active]: currentPage === pagesCount})}
                     onClick={() => setCurrentPage(pagesCount)}>{pagesCount}</div>
            }
            <div className={s.item} onClick={() => setCurrentPage(currentPage + 1)}
                 aria-disabled={currentPage === pagesCount}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7517 9.42698L6.44666 1.48718C6.11557 1.17094 5.57941 1.17094 5.24832 1.48718C4.91723 1.8037 4.91723 2.31681 5.24832 2.63305L12.9542 10L5.24832 17.367C4.91723 17.6833 4.91723 18.1964 5.24832 18.5126C5.41387 18.6709 5.63053 18.75 5.84749 18.75C6.06444 18.75 6.28111 18.6709 6.44666 18.5126L14.7517 10.5729C15.0828 10.2563 15.0828 9.74319 14.7517 9.42698Z" fill="#333333"/>
                </svg>
            </div>
        </div>
    );
};

export default Pagination;