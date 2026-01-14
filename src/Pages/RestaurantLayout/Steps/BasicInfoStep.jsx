import { TextField } from "@mui/material";

export default function BasicInfoStep({ formData, setFormData }) {
  const data = formData.basicInfo;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      basicInfo: {
        ...data,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="restaurantBI">
      <TextField
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
      />
      <TextField
        label="About"
        name="about_Description"
        value={data.about_Description}
        onChange={handleChange}
      />
      <TextField
        label="Cuisine Type"
        name="cuisineType"
        value={data.cuisineType}
        onChange={handleChange}
      />
      <TextField
        label="Price Range"
        name="priceRange"
        value={data.priceRange}
        onChange={handleChange}
      />
    </div>
  );
}
