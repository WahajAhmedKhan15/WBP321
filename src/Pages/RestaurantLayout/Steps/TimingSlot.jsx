import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TimingSlot({ formData, setFormData }) {
  const toggleDay = (day) => {
    const exists = formData.slots.find((x) => x.day === day);

    let updatedSlots;

    if (exists) {
      updatedSlots = formData.slots.filter((x) => x.day !== day);
    } else {
      updatedSlots = [
        ...formData.slots,
        {
          day,
          startTime: "",
          endTime: "",
          duration: "",
          maximum_Capacity: "",
          isActive: true,
        },
      ];
    }

    setFormData({ ...formData, slots: updatedSlots });
  };

  const updateSlot = (field, value) => {
    const updated = formData.slots.map((s) => ({
      ...s,
      [field]: value,
    }));

    setFormData({ ...formData, slots: updated });
  };

  return (
    <>
      <Typography variant="h6" mt={2}>
        Operating Days
      </Typography>

      <FormGroup>
        {DAYS.map((b) => (
          <FormControlLabel
            key={b}
            control={<Checkbox onChange={() => toggleDay(b)} />}
            label={b}
          />
        ))}
      </FormGroup>

      <div className="row">
        <div className="col-3">
          <TextField
            className="w-100"
            label="Opening Time"
            type="time"
            onChange={(e) => updateSlot("startTime", e.target.value)}
          />
        </div>

        <div className="col-3">
          <TextField
            className="w-100"
            label="Closing Time"
            type="time"
            onChange={(e) => updateSlot("endTime", e.target.value)}
          />
        </div>

        <div className="col-3">
          <TextField
            className="w-100"
            label="Slot Duration (minutes)"
            type="number"
            onChange={(e) => updateSlot("duration", e.target.value)}
          />
        </div>

        <div className="col-3">
          <TextField
            className="w-100"
            label="Maximum Capacity (guests)"
            type="number"
            onChange={(e) => updateSlot("maximum_Capacity", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
