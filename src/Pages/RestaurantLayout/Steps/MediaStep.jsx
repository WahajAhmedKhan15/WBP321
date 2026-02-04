import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";

export default function MediaStep({ formData, setFormData }) {
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Convert File → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const updateMedia = async (key, file) => {
    if (!file) return;

    const base64 = await toBase64(file);

    setFormData({
      ...formData,
      media: {
        ...formData.media,
        [key]: base64,
      },
    });
  };

  const updateGallery = async (files) => {
    const base64Images = await Promise.all(
      Array.from(files).map((f) => toBase64(f))
    );

    setFormData({
      ...formData,
      media: {
        ...formData.media,
        gallery: [...formData.media.gallery, ...base64Images],
      },
    });
  };

  const removeMedia = (key, ref) => {
    setFormData({
      ...formData,
      media: {
        ...formData.media,
        [key]: key === "gallery" ? [] : null,
      },
    });

    if (ref?.current) ref.current.value = "";
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = formData.media.gallery.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      media: {
        ...formData.media,
        gallery: updatedGallery,
      },
    });

    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const ImageWithBar = ({ src, onRemove }) => {
    if (!src) return null;

    return (
      <Box
        mt={1}
        border="1px solid #e0e0e0"
        borderRadius={2}
        overflow="hidden"
        width={140}
      >
        <Box
          component="img"
          src={src}
          alt="preview"
          width="100%"
          height={120}
          sx={{ objectFit: "cover" }}
        />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          py={0.5}
          sx={{ backgroundColor: "#f5f5f5", cursor: "pointer" }}
          onClick={onRemove}
        >
          <DeleteIcon fontSize="small" color="error" />
          <Typography variant="body2" color="error">
            Remove
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box display="grid" gap={2}>
      <p>Restaurant Logo</p>
      <Button component="label" variant="outlined">
        Upload Image
        <input
          ref={logoInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => updateMedia("logo", e.target.files[0])}
        />
      </Button>
      <ImageWithBar
        src={formData.media.logo}
        onRemove={() => removeMedia("logo", logoInputRef)}
      />

      {/* Banner */}
      <p>Banner / Thumbnail Image</p>
      <Button component="label" variant="outlined">
        Upload Image
        <input
          ref={bannerInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => updateMedia("banner", e.target.files[0])}
        />
      </Button>
      <ImageWithBar
        src={formData.media.banner}
        onRemove={() => removeMedia("banner", bannerInputRef)}
      />

      {/* Gallery */}
      <p>Gallery Images (Multiple)</p>
      <Button component="label" variant="outlined">
        Upload Images
        <input
          ref={galleryInputRef}
          hidden
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => updateGallery(e.target.files)}
        />
      </Button>

      <Box display="flex" gap={2} flexWrap="wrap">
        {formData.media.gallery.map((img, index) => (
          <ImageWithBar
            key={index}
            src={img}
            onRemove={() => removeGalleryImage(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
