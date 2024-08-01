import React, { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./Component/config/CartContext";

// Lazy-loaded components
const Home = lazy(() => import("./Component/Home"));
const Login = lazy(() => import("./Component/Home/Login"));
const UnAuthorized = lazy(() => import("./Component/Admin/UnAuthorized"));
const AdminLayout = lazy(() => import("./Component/Admin/AdminLayout"));
const Products = lazy(() => import("./Component/Home/Products"));
const Contact = lazy(() => import("./Component/Home/Contact"));
const Bookings = lazy(() => import("./Component/Home/Bookings"));
const About = lazy(() => import("./Component/Home/About"));
const Cart = lazy(() => import("./Component/Home/Cart"));
const ProductDetails = lazy(() => import("./Component/Pages/ProductDetails"));

// Initialize Query Client
const queryClient = new QueryClient();

// Define private routes
const privateRoutes = [
  {
    path: "/admin/*",
    element: <AdminLayout />,
    children: [
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UnAuthorized />
          </Suspense>
        ),
        errorElement: <>Error loading customer component</>,
      },
    ],
  },
];

// Define public routes
const publicRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    errorElement: <>Error loading home component</>,
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    errorElement: <>Error loading home component</>,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/products",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/contact",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/bookings",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Bookings />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "/products/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    ),
    errorElement: <>Error loading login component</>,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UnAuthorized />
      </Suspense>
    ),
    errorElement: <>Error loading unauthorized component</>,
  },
];

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const router = createBrowserRouter(
    isLoggedIn ? [...privateRoutes, ...publicRoutes] : publicRoutes
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
