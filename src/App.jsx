import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Account from "./pages/Account";
import Bookings from "./pages/bookings/Bookings";
import Cabins from "./pages/cabins/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import User from "./pages/auth/User";
import AppLayout from "./pages/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookingDetail from "./pages/bookings/BookingDetail";
import CheckinBookings from "./hooks/bookings/CheckinBookings";
import ProtectedRoute from "./hooks/auth/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<BookingDetail />} />
              <Route path="/checkin/:bookingId" element={<CheckinBookings />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
              <Route path="user" element={<User />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
