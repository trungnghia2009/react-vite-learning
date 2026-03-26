import { Drawer } from "antd";

const BookInfo = (props) => {
  const { bookInfo, openDrawer, setOpenDrawer } = props;

  return (
    <Drawer
      width={"30vw"}
      title="Book Info"
      closable={{ "aria-label": "Close Button" }}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>Id: {bookInfo?._id}</p>
        <p>Title: {bookInfo?.mainText}</p>
        <p>Author: {bookInfo?.author}</p>
        <p>Category: {bookInfo?.category}</p>
        <p>Price: {bookInfo?.price?.toLocaleString("vi-VN")} đ</p>
        <p>Quantity: {bookInfo?.quantity}</p>
        <p>Sold: {bookInfo?.sold}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p style={{ fontWeight: "bold" }}>Thumbnail</p>
          <div
            style={{
              height: "100px",
              width: "150px",
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookInfo?.thumbnail}`}
              alt="Book Thumbnail"
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default BookInfo;
