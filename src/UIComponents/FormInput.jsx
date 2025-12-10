import { TextField, InputAdornment } from "@mui/material";

const FormInput = ({ name, value, onChange, placeholder, type = "text", icon, sx = {} }) => {
  return (
    <TextField
      fullWidth
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
        sx: { borderRadius: "5px", mt: sx.mt || 0 },
      }}
    />
  );
};

export default FormInput;
