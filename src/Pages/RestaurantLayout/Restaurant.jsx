import { Box, Stepper, Step, StepLabel } from "@mui/material";
import FormButton from "../../UIComponents/FormButton";
import { useState } from "react";
import BasicInfoStep from "./Steps/BasicInfoStep";
import MediaStep from "./Steps/MediaStep";
import ServicesStep from "./Steps/ServicesStep";
import Branches from "./Steps/Branches";
import TimingSlot from "./Steps/TimingSlot";
import { toast } from "react-toastify";
import api from "../../Utils/api";

const steps = ["Basic Info", "Media", "Services", "Branches", "Timing & Slots"];

export default function RestaurantWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    basicInfo: {
      id: 0,
      name: "",
      about_Description: "",
      cuisineType: "",
      priceRange: "",
      isActive: true,
    },
    media: {
      logo: null,
      banner: null,
      gallery: [],
    },
    services: {
      bookingTypes: [],
      offers: [],
    },
    branches: [],
    slots: [],
  });
  const isLastStep = activeStep === steps.length - 1;
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <MediaStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ServicesStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <Branches formData={formData} setFormData={setFormData} />;
      case 4:
        return <TimingSlot formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };
  const handleSave = async () => {
    try {
      const payload = {
        restaurant: {
          name: formData.basicInfo.name,
          about_Description: formData.basicInfo.about_Description,
          cuisineType: formData.basicInfo.cuisineType,
          priceRange: formData.basicInfo.priceRange,
          isActive: formData.basicInfo.isActive,
        },
        images: [
          formData.media.logo && {
            imageType: "Logo",
            file: formData.media.logo,
          },
          formData.media.banner && {
            imageType: "Banner",
            file: formData.media.banner,
          },
          ...formData.media.gallery.map((g) => ({
            imageType: "Gallery",
            file: g,
          })),
        ].filter(Boolean),
        bookingTypes: formData.services.bookingTypes.join(","),
        offers: formData.services.offers.join(","),
        branches: formData.branches,
        slots: formData.slots,
      };
      if (!payload.restaurant.name || !payload.restaurant.about_Description) {
        toast.error("Basic Info Tab is required!");
        return;
      } else if (payload.images && payload.images.length === 0) {
        toast.error("Media Tab is required!");
        return;
      } else if (payload.offers === "" || payload.bookingTypes === "") {
        toast.error("Services Tab is required!");
        return;
      } else if (payload.branches && payload.branches.length === 0) {
        toast.error("Branches Tab is required!");
        return;
      } else if (payload.slots && payload.slots.length === 0) {
        toast.error("Timing & Slots Tab is required!");
        return;
      }
      setSaving(true);
      const response = await api.post("/Resturant/CreateRestaurant", payload);
      if (response.data.success) {
        setFormData({
          basicInfo: {
            id: 0,
            name: "",
            about_Description: "",
            cuisineType: "",
            priceRange: "",
            isActive: true,
          },
          media: {
            logo: null,
            banner: null,
            gallery: [],
          },
          services: {
            bookingTypes: [],
            offers: [],
          },
          branches: [],
          slots: [],
        });
        setActiveStep(0);
        setSaving(false);
        toast.success(response.data.message);
      } else {
        setSaving(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setSaving(false);
      console.error("Error posting reservation:", error);
    }
  };

  return (
    <div className="resturntMainDiv">
      <p className="resturntMainHeading">ADD RESTAURANT</p>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>{renderStep()}</Box>

      <div className="row d-flex justify-content-between mt-3">
        <div className="col-2">
          <FormButton
            text="Previous"
            loading={activeStep === 0 || saving}
            onClick={() => setActiveStep((p) => p - 1)}
          >
            Previous
          </FormButton>
        </div>
        <div className="col-2">
          <FormButton
            text={saving ? "Saving..." : isLastStep ? "Save" : "Next"}
            loading={saving}
            onClick={() => {
              if (isLastStep) {
                handleSave();
              } else {
                if (renderStep()) {
                  setActiveStep((p) => p + 1);
                }
              }
            }}
          ></FormButton>
        </div>
      </div>
    </div>
  );
}
