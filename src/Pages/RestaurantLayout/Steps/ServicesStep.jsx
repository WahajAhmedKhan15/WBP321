import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";

const OFFERS = ["Breakfast", "Lunch", "Dinner", "Weekend Brunch"];
const BOOKINGS = ["Table", "Private", "Even", "Caterin"];

export default function ServicesStep({ formData, setFormData }) {
  const toggle = (key, value) => {
    const list = formData.services[key];
    const updated = list.includes(value)
      ? list.filter((x) => x !== value)
      : [...list, value];

    setFormData({
      ...formData,
      services: { ...formData.services, [key]: updated },
    });
  };

  return (
    <>
      <Typography variant="h6" mt={2}>
        Booking Types
      </Typography>
      <FormGroup>
        {BOOKINGS.map((b) => (
          <FormControlLabel
            key={b}
            control={
              <Checkbox
                checked={formData.services.bookingTypes.includes(b)}
                onChange={() => toggle("bookingTypes", b)}
              />
            }
            label={b}
          />
        ))}
      </FormGroup>

      <Typography variant="h6">Buffet Types Available</Typography>
      <FormGroup>
        {OFFERS.map((o) => (
          <FormControlLabel
            key={o}
            control={
              <Checkbox
                checked={formData.services.offers.includes(o)}
                onChange={() => toggle("offers", o)}
              />
            }
            label={o}
          />
        ))}
      </FormGroup>

      <div className="row p-2">
        <TextField
          label="Offer Tags (Comma-Seprated)"
          name="offers"
          value={formData.services.offers.join(",")}
          onChange={(e) =>
            setFormData({
              ...formData,
              services: {
                ...formData.services,
                offers: e.target.value.split(","),
              },
            })
          }
        />
      </div>
    </>
  );
}
