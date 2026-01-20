import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/DashboardLayout/Dashboard";
import PendingReservation from "./Pages/DashboardLayout/DetailLayout/PendingReservation";
import TotalReservation from "./Pages/DashboardLayout/DetailLayout/TotalReservation";
import ConfirmReservation from "./Pages/DashboardLayout/DetailLayout/ConfirmReservation";
import CancelledReservation from "./Pages/DashboardLayout/DetailLayout/CancelledReservation";
import PendingEventQueries from "./Pages/DashboardLayout/DetailLayout/PendingEventQueries";
import TotalEventQueries from "./Pages/DashboardLayout/DetailLayout/TotalEventQueries";
import ConfirmEventQueries from "./Pages/DashboardLayout/DetailLayout/ConfirmEventQueries";
import CancelledEventQueries from "./Pages/DashboardLayout/DetailLayout/CancelledEventQueries";
import Reviews from "./Pages/DashboardLayout/DetailLayout/Reviews";
import Restaurant from "./Pages/RestaurantLayout/Restaurant";
import ProtectedRoute from "./Components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import "./assets/css/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route
            path="/pending-reservations"
            element={<PendingReservation />}
          />
          <Route path="/total-reservations" element={<TotalReservation />} />
          <Route
            path="/confirmed-reservations"
            element={<ConfirmReservation />}
          />
          <Route
            path="/cancelled-reservations"
            element={<CancelledReservation />}
          />
          <Route path="/pending-events" element={<PendingEventQueries />} />
          <Route path="/total-events" element={<TotalEventQueries />} />
          <Route path="/confirmed-events" element={<ConfirmEventQueries />} />
          <Route path="/cancelled-events" element={<CancelledEventQueries />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
