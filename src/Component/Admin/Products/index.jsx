import React, { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "./FormModal";
 
const Products = () => {
  const [productData, setProductData] = useState({
    itemName: "",
    itemDetails: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editid, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items/get");
      setProductList(response.data.data);
      console.log("Products:", response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    formData.append(
      "items",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    formData.append("image", image);
 
    try {
      if (editid) {
        await axios.put(
          `http://localhost:8080/items/update/${editid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8080/items/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      window.location.reload();
      fetchProducts();
      setIsModalOpen(false);
      setEditId(null);
    } catch (error) {
      setMessage("Failed to create/update product. Please try again.");
      console.error("Error creating/updating product:", error);
    }
  };
 
  const openEditModal = (product) => {
    setProductData(product);
    setIsModalOpen(true);
    setEditId(product.id);
  };
 
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </button>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
        }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName" className="block text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={productData.itemName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="itemDetails" className="block text-gray-700">
              itemDetails:
            </label>
            <input
              type="text"
              id="itemDetails"
              name="itemDetails"
              value={productData.itemDetails}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="price" className="block text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="file" className="block text-gray-700">
              Upload File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              {editid ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </FormModal>
 
      {message && <p className="text-red-500 mt-4">{message}</p>}
 
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded p-4"
            >
              <h3 className="text-xl font-semibold mb-2">
                {product.itemName}
              </h3>
              <p className="text-gray-700 mb-2">{product.itemDetails}</p>
              <p className="text-gray-900 font-bold mb-2">
                Price: ${product.price}
              </p>
              {product.imageData && (
                <div className="mb-4">
                  <img
                    src={`http://localhost:8080/items/image/${product.id}`}
                    alt={product.itemName}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error(
                        `Error loading image for product ${product.id}`
                      );
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
              <div className="flex justify-between">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default Products;