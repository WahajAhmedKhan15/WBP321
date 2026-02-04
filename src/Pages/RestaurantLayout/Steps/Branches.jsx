import { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";

export default function Branches({ formData, setFormData }) {
  const [branch, setBranch] = useState({
    branchName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!branch.branchName || !branch.address || !branch.phone) {
      toast.error("Branch Name, Address or Phone Number is required!");
      return;
    }

    setFormData({
      ...formData,
      branches: [...formData.branches, branch],
    });

    setBranch({ branchName: "", address: "", phone: "", email: "" });
  };

  return (
    <div>
      <div className="mb-3 text-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          style={{ marginTop: "16px" }}
        >
          Add Branch
        </Button>
      </div>

      <div className="restaurantBr">
        <TextField
          label="Branch Name"
          name="branchName"
          value={branch.branchName}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          value={branch.address}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="number"
          value={branch.phone}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={branch.email}
          onChange={handleChange}
        />
      </div>

      <div>
        {formData.branches.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: "24px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.branches.map((b, index) => (
                  <TableRow key={index}>
                    <TableCell>{b.branchName}</TableCell>
                    <TableCell>{b.address}</TableCell>
                    <TableCell>{b.phone}</TableCell>
                    <TableCell>{b.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
