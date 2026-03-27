import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { useEffect, useState } from "react";
import { fetchAllBooksAPI } from "../services/api.service";

const BookPage = () => {
  const [bookData, setBookData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const loadBook = async () => {
    const res = await fetchAllBooksAPI(currentPage, pageSize);
    if (res.data) {
      let data = res.data;
      setBookData(data.result);
      setCurrentPage(data.meta.current);
      setPageSize(data.meta.pageSize);
      setTotal(data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <BookForm loadBook={loadBook} />
      <BookTable
        bookData={bookData}
        loadBook={loadBook}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
      />
    </div>
  );
};

export default BookPage;
