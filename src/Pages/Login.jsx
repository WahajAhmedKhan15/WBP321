import { useState } from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import "../assets/css/style.css";
import FormInput from "../UIComponents/FormInput";
import FormButton from "../UIComponents/FormButton";

export default function Login() {
  const { login } = useAuth();
  const [values, setValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await login(values);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Invalid username or password"
      );
    }

    setLoading(false);
  };

  return (
    <div className="containerLogin">
      <div className="left">
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="content">
          <h1>Restaurant Management System</h1>
          <p>
            Run your restaurant effortlessly. Track orders, manage inventory,
            and delight your customers.
          </p>
        </div>
      </div>
      <div className="right">
        <div className="card">
          <div className="logo">RMS</div>
          <h2>Login</h2>
          <div className="subtitle">Access your account to continue</div>

          {errorMsg && (
            <Typography color="error" textAlign="center">
              {errorMsg}
            </Typography>
          )}
          <FormInput
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Username"
            icon={<PersonIcon />}
          />

          <FormInput
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            icon={<LockIcon />}
            sx={{ mt: 2 }}
          />
          <div className="mt-2">
            <FormButton onClick={handleSubmit} loading={loading} text="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}
