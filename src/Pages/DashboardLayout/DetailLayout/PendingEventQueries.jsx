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
  Checkbox,
} from "@mui/material";
import FormButton from "../../../UIComponents/FormButton";
import { toast } from "react-toastify";

function PendingEventQueries() {
  const [events, setEvents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const getEvents = async () => {
    try {
      const response = await api.get(
        "Resturant/GetEventQueryByStatus?Status=0"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = events?.map((res) => res.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };
  const handleConfirm = async (StatusType) => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one event query!");
      return;
    }
    const combinedIds = selectedIds.join(",");
    try {
      const response = await api.post(
        `Resturant/ConfirmEventQueries?EventQueriesIds=${combinedIds}&StatusType=${StatusType}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getEvents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error posting reservation:", error);
    }
  };
  return (
    <div>
      <p className="pageHeader">Pending Event Queries</p>
      <div className="PRbutonDiv">
        <FormButton
          text="Cancel Event Query"
          onClick={() => handleConfirm(2)}
        />
        <FormButton
          text="Confirm Event Query"
          onClick={() => handleConfirm(1)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    events?.length > 0 &&
                    selectedIds.length === events.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(res.id)}
                    onChange={() => handleCheckboxChange(res.id)}
                  />
                </TableCell>
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

export default PendingEventQueries;
