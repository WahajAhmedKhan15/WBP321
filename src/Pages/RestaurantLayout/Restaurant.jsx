import { Box, Stepper, Step, StepLabel } from "@mui/material";
import FormButton from "../../UIComponents/FormButton";
import { useState } from "react";
import BasicInfoStep from "./Steps/BasicInfoStep";
import MediaStep from "./Steps/MediaStep";
import ServicesStep from "./Steps/ServicesStep";
import Branches from "./Steps/Branches";
import TimingSlot from "./Steps/TimingSlot";
// import api from "./api";

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
      offers: [],
      bookingTypes: [],
    },
  });

  const isLastStep = activeStep === steps.length - 1;

  const handleSave = async () => {
    // try {
    //   setSaving(true);
    //   // 1️⃣ Save Restaurant
    //   const res = await api.saveRestaurant(formData.basicInfo);
    //   const restaurantId = res.data.id;
    //   // 2️⃣ Save Media
    //   const mediaForm = new FormData();
    //   mediaForm.append("RestaurantId", restaurantId);
    //   if (formData.media.logo)
    //     mediaForm.append("Logo", formData.media.logo);
    //   if (formData.media.banner)
    //     mediaForm.append("Banner", formData.media.banner);
    //   formData.media.gallery.forEach(img =>
    //     mediaForm.append("Gallery", img)
    //   );
    //   await api.saveMedia(mediaForm);
    //   // 3️⃣ Save Offers
    //   for (const offer of formData.services.offers) {
    //     await api.saveOffer({
    //       id: 0,
    //       restaurantId,
    //       branchId: 0,
    //       offer,
    //       isActive: true,
    //     });
    //   }
    //   // 4️⃣ Save Booking Types
    //   for (const type of formData.services.bookingTypes) {
    //     await api.saveBookingType({
    //       id: 0,
    //       restaurantId,
    //       branchId: 0,
    //       name: type,
    //       isActive: true,
    //     });
    //   }
    //   alert("Restaurant saved successfully!");
    // } catch (error) {
    //   console.error(error);
    //   alert("Error while saving restaurant");
    // } finally {
    //   setSaving(false);
    // }
  };

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

      <div className="row d-flex justify-content-between">
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
            onClick={
              isLastStep ? handleSave : () => setActiveStep((p) => p + 1)
            }
          ></FormButton>
        </div>
      </div>
    </div>
  );
}
