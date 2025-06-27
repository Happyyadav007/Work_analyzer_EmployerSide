import React, { useState, useEffect } from "react";
import { addItem } from "../../api/itemApi"; // Adjust the import path
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    color: "",
    place: "",
    seller: "",
    sellerPhone: "", // Added sellerPhone
    quality: "",
    addedBy: "", // Will be set from localStorage
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Load user ID from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setFormData((prev) => ({ ...prev, addedBy: user._id }));
    } else {
      toast.error("User not logged in.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "name",
      "price",
      "category",
      "color",
      "place",
      "seller",
      "sellerPhone",
      "quality",
      "addedBy",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the '${field}' field.`);
        return;
      }
    }

    // Prepare payload, converting price to number
    const itemPayload = {
      ...formData,
      price: Number(formData.price),
      images: images.map(() => ""), // placeholder if needed
    };

    // Call API
    const response = await addItem(itemPayload);

    if (response.success) {
      toast.success(response.message || "Item added successfully");
      setFormData({
        name: "",
        price: "",
        category: "",
        color: "",
        place: "",
        seller: "",
        sellerPhone: "",
        quality: "",
        addedBy: formData.addedBy, // keep user ID after reset
      });
      setImages([]);
      setPreview([]);
      setTimeout(() => {
        navigate("/items");
        window.location.reload();
      }, 1500);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="place"
            placeholder="Place"
            value={formData.place}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="seller"
            placeholder="Seller"
            value={formData.seller}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
          <input
            name="sellerPhone"
            placeholder="Seller Phone"
            type="text"
            value={formData.sellerPhone}
            onChange={(e) => {
              // Allow only digits by stripping any non-digit characters
              const onlyNums = e.target.value.replace(/\D/g, "");
              setFormData((prev) => ({ ...prev, sellerPhone: onlyNums }));
            }}
            onKeyDown={(e) => {
              // Prevent entering anything other than numbers, Backspace, Delete, arrows, etc.
              if (
                !(
                  (e.key >= "0" && e.key <= "9") ||
                  e.key === "Backspace" ||
                  e.key === "Delete" ||
                  e.key === "ArrowLeft" ||
                  e.key === "ArrowRight" ||
                  e.key === "Tab"
                )
              ) {
                e.preventDefault();
              }
            }}
            className="p-2 border rounded w-full"
            required
          />
          {/* Quality Dropdown */}
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          >
            <option value="" disabled>
              Select Quality
            </option>
            <option value="best">Best</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Upload Images (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full"
          />
        </div>

        {/* Image Previews */}
        {preview.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="h-24 w-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
