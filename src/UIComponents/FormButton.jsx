import { Button } from "@mui/material";

const FormButton = ({ onClick, loading = false, text = "Submit", sx = {} }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      disabled={loading}
      className="CustomButton"
    >
      {loading ? `${text}` : text}
    </Button>
  );
};

export default FormButton;
