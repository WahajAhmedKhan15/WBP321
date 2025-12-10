import { Button } from "@mui/material";

const FormButton = ({ onClick, loading = false, text = "Submit", sx = {} }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      disabled={loading}
      sx={{
        mt: 2,
        borderRadius: "5px",
        backgroundColor: "#111",
        "&:hover": { backgroundColor: "#333" },
        ...sx,
      }}
    >
      {loading ? `${text}...` : text}
    </Button>
  );
};

export default FormButton;
