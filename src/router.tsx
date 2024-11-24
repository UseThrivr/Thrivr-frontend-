// import { createBrowserRouter } from "react-router-dom";
import { NavLeft, NavRight } from "./components/dashboard";
import { DashboardLayout, HomeLayout } from "./layouts";
import { inventoryLoader } from "./lib/loaders";
import {
    Dashboard,
    EditInventory,
    EditOrder,
    Home,
    Inventory,
    MyBank,
    Orders,
    Sales,
    Todo,
    Customer,
    Profile,
    EditProfile,
    Integration
} from "./pages";
import Ads from "./pages/ads";
import Login from "./pages/login";
import LoginSignupLayout from "./layouts/LoginSignupLayout";
import Signup from "./pages/signup";
import Businesssetup from "./pages/businesssetup";
import BusinessSetup from "./pages/business.signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Layout Routes */}
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Dashboard Layout Routes with NavRight */}
        <Route 
          element={
            <DashboardLayout 
              right={<NavRight onMobileMenuClick={() => console.log(true)} />} 
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
            path="/inventory" 
            element={<Inventory />}
            loader={inventoryLoader}
          />
          <Route path="/mybank" element={<MyBank />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/integration" element={<Integration />} />
        </Route>

        {/* Dashboard Layout Routes with NavLeft */}
        <Route 
          element={
            <DashboardLayout 
              left={<NavLeft />}
            />
          }
        >
          <Route path="/inventory/:id/edit" element={<EditInventory />} />
          <Route path="/editinventory" element={<EditInventory />} />
          <Route path="/orders/:id/edit" element={<EditOrder />} />
          <Route path="/profile/:id/edit" element={<EditProfile />} />
        </Route>

        {/* Login/Signup Layout Routes */}
        <Route element={<LoginSignupLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setupbusiness" element={<Businesssetup />} />
          <Route path="/business" element={<BusinessSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export { Router as default};