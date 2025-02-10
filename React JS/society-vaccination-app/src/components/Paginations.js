import { useEffect, useState } from "react";

const Pagination = ({ currentPage, onPageChange, pageLimit }) => {
  const [threePages, setThreePages] = useState([]);
  const [pageStart, setPageStart] = useState(1);
  let numberLength = 3;

  useEffect(() => {
    setThreePages([]);
    const newPages = Array.from({ length: 3 }, (_, index) => {
      if (pageLimit && pageStart + index > pageLimit) {
        return null;
      }
      
      return pageStart + index;
    });
    setThreePages(newPages);
  }, [pageStart]);

  const checkPreviousPage = () => {
    if (currentPage === pageStart) {
      setPageStart(pageStart - numberLength);
    }

    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const checkNextPage = () => {
    if (currentPage === pageStart + 2) {
      setPageStart(pageStart + numberLength);
    }
    if (currentPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item">
          <a
            href="#!"
            className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
            onClick={checkPreviousPage}
          >
            Previous
          </a>
        </li>
        {threePages.length !== 0 &&
          threePages.map(
            (number) =>
              number !== null && (
                <li className="page-item">
                  <a
                    className={`page-link ${
                      currentPage === number ? "active" : ""
                    }`}
                    href="#!"
                    aria-current="page"
                    onClick={() => onPageChange(number)}
                  >
                    {number}
                  </a>
                </li>
              )
          )}
        <li className="page-item">
          <a
            href="#!"
            className={`page-link ${
              currentPage === pageLimit ? "disabled" : ""
            }`}
            onClick={() => checkNextPage()}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
