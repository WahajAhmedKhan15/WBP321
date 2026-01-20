import { useEffect, useState } from "react";
import api from "../../../Utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function CancelledReservation() {
  const [reservations, setReservations] = useState([]);
  const getReservations = async () => {
    try {
      const response = await api.get(
        "Resturant/GetReservationsByStatus?Status=2",
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  useEffect(() => {
    getReservations();
  }, []);
  return (
    <div>
      <p className="pageHeader mb-2">Confirmed Reservations</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Reservation Date</TableCell>
              <TableCell>Reservation By</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Offer</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Slot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations?.map((res) => (
              <TableRow key={res.id}>
                <TableCell>{res.id}</TableCell>
                <TableCell>{res.reservationDate}</TableCell>
                <TableCell>{res.userName}</TableCell>
                <TableCell>{res.branchName}</TableCell>
                <TableCell>{res.offer}</TableCell>
                <TableCell>{res.members}</TableCell>
                <TableCell>{res.slot}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CancelledReservation;
