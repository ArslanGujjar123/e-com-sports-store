import { lazy, Suspense, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';  // Correct import
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './routes/PrivateRoute';
import RoleBasedRoute from './routes/RoleBasedToute';
import BusinessRoute from "./routes/BusinessRoute";
// Lazy loading components
const Login = lazy(() => import("./pages/Login"));
//const LoginPage = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const Home = lazy(() => import("./pages/Client/Home"));
const Shop = lazy(() => import("./pages/Client/Shop"));
const Cart = lazy(() => import("./pages/Client/Cart"));
const Product = lazy(() => import("./pages/Client/Product"));
const ShippingPage = lazy(() => import("./pages/Client/Shipping"));
const OrderSummary = lazy(() => import("./pages/Client/Order-Summary"));
const AdminDashboard= lazy(() => import("./pages/Business/Dashboard"));
const UserOrders = lazy(() => import("./pages/Admin/OrdersList"));
const UserManagement = lazy(() => import("./pages/Admin/Users"));
const AdminProductList = lazy(() => import("./pages/Admin/ProductList"));
const EditProduct = lazy(() => import("./pages/Admin/EditProduct"));
const NewProduct = lazy(() => import("./pages/Admin/CreateProduct"));
const EditUser = lazy(() => import("./pages/Admin/EditUser"));

function App() {

  const [userRole, setUserRole] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
 
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');  
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      setUserRole(role);
      setIsAuthenticated(true);  // Set the user as authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, [isAuthenticated,userRole]);

  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          
          {/* Conditionally render AdminNav or NavBar based on user role */}
         {userRole==='owner'?'':<NavBar userRole={userRole} isAuthenticated={isAuthenticated}/>} 

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login setUserRole={setUserRole} setIsAuthenticated={setIsAuthenticated} />}/>
            {/* <Route path="/login" element={<Login setUserRole={setUserRole} setIsAuthenticated={setIsAuthenticated} />} /> */}
            <Route path="/register" element={<Register setUserRole={setUserRole} setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/logout" element={<Logout setUserRole={setUserRole} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Private Routes for authenticated users */}
            
            
            <Route
              path="/shipping"
              element={
                <PrivateRoute>
                  <ShippingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-summary"
              element={
                <PrivateRoute>
                  <OrderSummary />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <UserOrders />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <UserManagement />
                </RoleBasedRoute>
              }
            />

              <Route
              path="/admin/users/:id"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <EditUser />
                </RoleBasedRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <AdminProductList />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/create-product"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <NewProduct />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/edit-product/:id"
              element={
                <RoleBasedRoute allowedRoles={['admin']} userRole={userRole}>
                  <EditProduct />
                </RoleBasedRoute>
              }
            />
             <Route
              path="/business/dashboard"
              element={
                <BusinessRoute allowedRoles={['owner']}>
                  <AdminDashboard />
                </BusinessRoute>
              }
          />
          </Routes>
          
          {userRole==='owner' ? '':<Footer />}
        </Router>
      </Suspense>
    
    </>
  );
}

export default App;
