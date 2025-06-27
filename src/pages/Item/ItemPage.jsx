import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllItems } from "../../api/itemApi"; // adjust path
import { toast } from "react-toastify";

const ItemPage = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Fetch items on mount
  useEffect(() => {
    const loadItems = async () => {
      const result = await fetchAllItems();
      if (result.success) {
        setItems(result.data);
      } else {
        toast.error(result.message);
      }
    };
    loadItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Items</h1>
        <button
          onClick={() => navigate("/item/additem")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Item
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded shadow cursor-pointer hover:shadow-lg transition p-2"
          >
            <img
              src={item.images?.[0] || "/placeholder.jpg"}
              alt={item.name}
              className="h-40 w-full object-cover rounded"
            />
            <div className="mt-2 px-2">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-blue-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>

            <div className="flex space-x-2 overflow-x-auto mb-4">
              {selectedItem.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`item-${i}`}
                  className="h-32 w-32 object-cover rounded border"
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <p className="text-blue-600 font-semibold mb-4">
              ${selectedItem.price}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Date Added:</strong>{" "}
                {new Date(selectedItem.addedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>Color:</strong> {selectedItem.color}
              </p>
              <p>
                <strong>Place:</strong> {selectedItem.place}
              </p>
              <p>
                <strong>Seller:</strong> {selectedItem.seller}
              </p>
              <p>
                <strong>Quality:</strong> {selectedItem.quality}
              </p>
              <p>
                <strong>Added By:</strong> {selectedItem.addedBy}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
