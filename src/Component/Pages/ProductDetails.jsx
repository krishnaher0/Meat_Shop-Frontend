import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../config/CartContext"; // Adjust the import path as needed

const ProductDetails = () => {
  const { id } = useParams();
  const { cartItems, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/get/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (product) {
        const alreadyAdded = cartItems.some((item) => item.id === product.id);

        if (alreadyAdded) {
          alert(`${product.itemName} is already added to Cart!`);
          navigate("/cart");
        } else {
          await addToCart({
            id: product.id,
            name: product.itemName,
            price: product.price,
            quantity: 1,
            imageUrl: `http://localhost:8080/items/image/${product.id}`,
          });
          alert(`${product.itemName} has been added to Cart!`);
          navigate("/cart");
        }
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{product.itemName}</h2>
          <p className="text-gray-700 mb-2">{product.itemDetails}</p>
          <p className="text-gray-900 font-bold mb-2">Price: ${product.price}</p>
          {product.imageData && (
            <div className="mb-4">
              <img
                src={`http://localhost:8080/items/image/${product.id}`}
                alt={product.itemName}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.error(`Error loading image for product ${product.id}`);
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
            </div>
          )}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
