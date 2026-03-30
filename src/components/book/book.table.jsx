import { Table, Popconfirm, App } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBookAPI } from "../../services/api.service";
import { useState } from "react";
import BookInfo from "./book.info";
import BookUpdate from "./book.update";

const BookTable = (props) => {
  const {
    bookData,
    loadBook,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
    isLoadingTable,
  } = props;

  const { notification } = App.useApp();

  // State for Book Info Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);

  // State for Update Book Modal
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleDeleteBook = async (_id) => {
    const res = await deleteBookAPI(_id);
    if (res.data) {
      notification.success({
        message: "Book Deleted",
        description: `Book deleted successfully!`,
      });
      await loadBook();
    } else {
      notification.error({
        message: "Book Deletion Failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onPageChange = (pagination) => {
    // Check if the page number has changed
    // + converts string to number
    if (+pagination?.current !== +currentPage) {
      setCurrentPage(+pagination.current);
    }
    // Check if the page size has changed
    // + converts string to number
    if (+pagination?.pageSize !== +pageSize) {
      setPageSize(+pagination.pageSize);
      setCurrentPage(1);
    }
  };

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setBookInfo(record);
            setOpenDrawer(true);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => price.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setBookInfo(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange", fontSize: "16px" }}
          />
          <Popconfirm
            title="Delete the book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red", fontSize: "16px" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={bookData}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} of {total} rows
              </div>
            );
          },
        }}
        onChange={onPageChange}
        loading={isLoadingTable}
      />
      <BookInfo
        bookInfo={bookInfo}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <BookUpdate
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
        loadBook={loadBook}
      />
    </>
  );
};

export default BookTable;
