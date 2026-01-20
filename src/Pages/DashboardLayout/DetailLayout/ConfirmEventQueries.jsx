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

function ConfirmEventQueries() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const response = await api.get(
        "Resturant/GetEventQueryByStatus?Status=1"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div>
      <p className="pageHeader mb-2">Confirmed Event Queries</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell>Service Required</TableCell>
              <TableCell>Enquiry By</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>No of People</TableCell>
              <TableCell>Timing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((res) => (
              <TableRow key={res.id}>
                <TableCell>{res.id}</TableCell>
                <TableCell>{res.eventType}</TableCell>
                <TableCell>{res.bookingDate}</TableCell>
                <TableCell>{res.serviceName}</TableCell>
                <TableCell>{res.userName}</TableCell>
                <TableCell>{res.cellNumber}</TableCell>
                <TableCell>{res.noOfPeople}</TableCell>
                <TableCell>{res.timing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ConfirmEventQueries;
