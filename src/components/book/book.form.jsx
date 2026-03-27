import { Input, Button, Modal, notification, InputNumber, Select } from "antd";
import { useState } from "react";
import { createBookAPI, uploadImageAPI } from "../../services/api.service";

const BookForm = (props) => {
  const { loadBook } = props;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBook = async () => {
    // check if thumbnail is selected
    if (!thumbnail) {
      notification.error({
        message: "Thumbnail Required",
        description: "Please select a thumbnail for the book.",
      });
      return;
    }

    const resUpload = await uploadImageAPI(thumbnail, "book");
    if (resUpload.data) {
      const thumbnailName = resUpload.data.fileUploaded;
      const res = await createBookAPI(
        title,
        author,
        price,
        quantity,
        category,
        thumbnailName,
      );
      if (res.data) {
        notification.success({
          message: "Book Created",
          description: `Book ${res.data.title} created successfully!`,
        });
        resetAndCloseModal();
        await loadBook();
      } else {
        notification.error({
          message: "Book Creation Failed",
          description: JSON.stringify(res.message),
        });
      }
    } else {
      notification.error({
        message: "Thumbnail Upload Failed",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  const handlePreviewThumbnail = (event) => {
    // Check if a file was selected
    if (!event.target.files || event.target.files.length === 0) {
      setThumbnail("");
      setPreview(null);
      return;
    }

    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here, e.g., send to backend
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetAndCloseModal = () => {
    setTitle("");
    setAuthor("");
    setPrice(null);
    setQuantity(null);
    setCategory(null);
    setPreview(null);
    setThumbnail(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-form" style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Books</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Book
        </Button>
      </div>
      <Modal
        title="Create New Book"
        okText="CREATE"
        open={isModalOpen}
        onOk={handleCreateBook}
        onCancel={resetAndCloseModal}
        maskClosable={false}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Title</span>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Input Title"
            />
          </div>
          <div>
            <span>Author</span>
            <Input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Input Author"
            />
          </div>
          <div>
            <span>Price</span>
            <InputNumber
              value={price}
              suffix="đ"
              style={{ width: "100%" }}
              onChange={(value) => setPrice(value)}
              placeholder="Input Price"
            />
          </div>
          <div>
            <span>Quantity</span>
            <InputNumber
              value={quantity}
              style={{ width: "100%" }}
              onChange={(value) => setQuantity(value)}
              placeholder="Input Quantity"
            />
          </div>
          <div>
            <span>Category</span>
            <Select
              placeholder="Select Category"
              style={{ width: "100%" }}
              value={category}
              onChange={(value) => setCategory(value)}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },
                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Thumbnail</span>
            <label
              htmlFor="upload-btn"
              style={{
                display: "block",
                width: "fit-content",
                padding: "5px 10px",
                cursor: "pointer",
                background: "orange",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              Upload
            </label>
            <input
              type="file"
              hidden
              id="upload-btn"
              onChange={handlePreviewThumbnail}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
            {/* Preview of the uploaded thumbnail */}
            {preview && (
              <div
                style={{
                  width: "150px",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                  alt="Book Thumbnail Preview"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookForm;
