import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Pages/Header";
import Footer from "../../Footer";
import { CartContext } from "../../config/CartContext"; // Adjust the import path as needed

const Products = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items/get");
      setProductList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleShowDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = async (product) => {
    try {
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
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <>
       <div className='fixed h-[4rem] w-[100%] z-[50]'>
    <Header />
    </div>
      <div className="top-[5rem] h-screen relative mx-auto p-4">
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.itemName}</h3>
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
                  <div className="flex justify-between">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => handleShowDetails(product.id)}
                    >
                      Show Details
                    </button>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Products;
