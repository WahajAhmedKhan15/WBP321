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
import FormButton from "../../../UIComponents/FormButton";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    try {
      const response = await api.get("Resturant/GetReviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div>
      <p className="pageHeader mb-2">Customer Reviews</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Food Quality</TableCell>
              <TableCell>Food Taste</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews?.map((res) => (
              <TableRow key={res.id}>
                <TableCell>{res.id}</TableCell>
                <TableCell>{res.foodQuality}</TableCell>
                <TableCell>{res.foodTaste}</TableCell>
                <TableCell>{res.rating}</TableCell>
                <TableCell>{res.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Reviews;
