import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import api from "../../Utils/api";
import { Card, CardContent } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import HighlightCalendar from "../../UIComponents/HighlightCalendar";

export default function Dashboard() {
  const [dashboardCount, setDashboardCount] = useState({});
  const [reservations, setReservations] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const getDashboardCount = async () => {
    try {
      const response = await api.get("Dashboard/GetDashboardCount");
      setDashboardCount(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  const getReservations = async () => {
    try {
      const response = await api.get("Dashboard/GetTop10ConfirmedReservation");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  const getReservationDates = async () => {
    try {
      const response = await api.get(
        "Dashboard/GetReservationDatesByStatus?Status=1"
      );
      setReservationDates(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  useEffect(() => {
    getDashboardCount();
    getReservations();
    getReservationDates();
  }, []);
  const handlePenResClick = () => {
    window.open("/pending-reservations", "_blank"); // The route to your reviews page
  };
  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="dashFirstRow">
        <div className="dashFirstRowFC">
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Total Reservations</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.totalReservationCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Confirmed Reservations</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.confirmedReservationCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card
              elevation={3}
              onClick={handlePenResClick}
              className="rounded-4 clickableCard"
            >
              <CardContent>
                <h6 className="text-muted">Pending Reservations</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.pendingReservationCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Cancelled Reservations</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.cancelledReservationCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Total Events</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.totalEventQueryCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Confirmed Events</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.confirmedEventQueryCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4 clickableCard">
              <CardContent>
                <h6 className="text-muted">Pending Events</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.pendingEventQueryCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4">
              <CardContent>
                <h6 className="text-muted">Cancelled Events</h6>
                <h2 className="fw-bold">
                  {dashboardCount?.cancelledEventQueryCount}
                </h2>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={3} className="rounded-4 clickableCard">
              <CardContent>
                <h6 className="text-muted">Customer Reviews</h6>
                <h2 className="fw-bold">{dashboardCount?.reviewsCount}</h2>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="clndrDiv">
          <div className="clndrDivHeader">
            <div className="clndrDivHeaderColorBox"></div>
            <p>Reserved Dates</p>
          </div>
          <HighlightCalendar highlightedDates={reservationDates} />
        </div>
      </div>
      <div className="">
        <div className="top10Div">
          <Box sx={{ p: 1 }}>
            <Typography variant="h5" gutterBottom>
              Recent Bookings
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Reservation Date</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Offer</TableCell>
                    <TableCell>Booking Type</TableCell>
                    <TableCell>Slot</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.reservationDate}
                      </TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.branchName}</TableCell>
                      <TableCell>{row.offer}</TableCell>
                      <TableCell>{row.bookingType}</TableCell>
                      <TableCell>{row.slot}</TableCell>
                      <TableCell>{row.members}</TableCell>
                      <TableCell>{row.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </div>
  );
}
