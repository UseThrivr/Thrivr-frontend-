// src/router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLeft, NavRight } from "./components/dashboard";
import { DashboardLayout, HomeLayout } from "./layouts";
// import { inventoryLoader } from "./lib/loaders";
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
  Integration,
  StoreManagers,
  MobileNewStaff,
  MobileNewCustomers,
  MobileNewGroup,
  MobileCreatePlan,
  MobileStoreSettings,
  MobilePayment,
  MobileCampaign,
  ForgotPassword,
} from "./pages";
import Ads from "./pages/ads";
import Login from "./pages/login";
import LoginSignupLayout from "./layouts/LoginSignupLayout";
import Signup from "./pages/signup";
import Businesssetup from "./pages/businesssetup";
import BusinessSetup from "./pages/business.signup";
import { SidebarProvider } from "./context/SidebarContext";
import Onboarding from "./pages/Onboarding";

const Router = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<DashboardLayout right={<NavRight />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/mybank" element={<MyBank />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/integration" element={<Integration />} />
          </Route>

          <Route element={<DashboardLayout left={<NavLeft />} />}>
            <Route path="/inventory/:id/edit" element={<EditInventory />} />
            <Route path="/editinventory" element={<EditInventory />} />
            <Route path="/orders/:id/edit" element={<EditOrder />} />
            <Route path="/profile/:id/edit" element={<EditProfile />} />
            <Route path="/profile/store-managers" element={<StoreManagers />} />
            <Route path="/profile/store-managers/new-staff" element={<MobileNewStaff />} />
            <Route path="/profile/store-settings" element={<MobileStoreSettings />} />
            <Route path="/customers/new-customers" element={<MobileNewCustomers />} />
            <Route path="/customers/new-group" element={<MobileNewGroup />} />
            <Route path="/todo/create-plan" element={<MobileCreatePlan />} />
            <Route path="/mybank/payment" element={<MobilePayment />} />
            <Route path="/ads/new-campaign" element={<MobileCampaign />} />
          </Route>

          <Route element={<LoginSignupLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/setupbusiness" element={<Businesssetup />} />
            <Route path="/business" element={<BusinessSetup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default Router;
