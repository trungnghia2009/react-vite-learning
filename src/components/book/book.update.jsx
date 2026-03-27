import { useEffect, useState } from "react";
import { Input, Modal, notification, Form, InputNumber, Select } from "antd";
import { updateBookAPI, uploadImageAPI } from "../../services/api.service";

const BookUpdate = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    bookInfo,
    setBookInfo,
    loadBook,
  } = props;

  const [form] = Form.useForm();

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (bookInfo) {
      setPreview(
        bookInfo?.thumbnail
          ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${bookInfo?.thumbnail}`
          : null,
      );
      // Set form fields with bookInfo data
      form.setFieldsValue({
        _id: bookInfo._id || "",
        mainText: bookInfo.mainText || "",
        author: bookInfo.author || "",
        price: bookInfo.price || 0,
        quantity: bookInfo.quantity || 0,
        category: bookInfo.category || "",
      });
    }
  }, [bookInfo, form]);

  const handleUpdateBook = async (values) => {
    try {
      // Upload thumbnail if selected, otherwise use existing thumbnail
      let finalThumbnail = bookInfo?.thumbnail;
      if (thumbnail) {
        const resUpload = await uploadImageAPI(thumbnail, "book");
        if (!resUpload.data) {
          notification.error({
            message: "Thumbnail Upload Failed",
            description: JSON.stringify(resUpload.message),
          });
          return;
        }
        finalThumbnail = resUpload.data.fileUploaded;
      }

      // Update book with all values
      const res = await updateBookAPI(
        values._id,
        values.mainText,
        values.author,
        values.price,
        values.quantity,
        values.category,
        finalThumbnail,
      );

      if (res.data) {
        notification.success({
          message: "Book Updated",
          description: `Book ${res.data.title} updated successfully!`,
        });
        resetAndCloseModal();
        await loadBook();
      } else {
        notification.error({
          message: "Book Update Failed",
          description: JSON.stringify(res.message),
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
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
    setIsModalUpdateOpen(false);
    form.resetFields();
    setBookInfo(null);
    setThumbnail(null);
    setPreview(null);
  };

  return (
    <Modal
      title="Update Book"
      okText="UPDATE"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      onCancel={resetAndCloseModal}
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={handleUpdateBook}
      >
        <Form.Item label="Id" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Title"
          name="mainText"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input the author!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            addonAfter="đ"
            style={{ width: "100%" }}
            placeholder="Input Price"
          />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Input Quantity" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select
            placeholder="Select Category"
            style={{ width: "100%" }}
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
        </Form.Item>
        <div>
          <span style={{ fontWeight: "bold" }}>Thumbnail</span>
          <label
            htmlFor="upload-button"
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
            style={{ display: "none" }}
            type="file"
            id="upload-button"
            onChange={handlePreviewThumbnail}
            onClick={(event) => {
              event.target.value = null;
            }}
          />

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
        </div>
      </Form>
    </Modal>
  );
};

export default BookUpdate;
