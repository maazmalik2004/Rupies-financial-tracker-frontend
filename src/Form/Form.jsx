import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./form.css";
import ControllableStates from "./ComboBox";
import MultilineTextFields from "./MultilineTextFields";
import FormPropsTextFields from "./FormPropsTextFields";
import AccessibleTabs2 from "./AccessibleTabs2";
import CheckboxLabels from "./CheckboxLabels";
import BasicSelect from "./BasicSelect";
import DatePickerValue from "./DatePickerValue";
import FloatingActionButtons from "./FloatingActionButton";
import { useAppState } from "../AppStateContext";
import SubmitButton from "./SubmitButton";
import axios from "axios";

function Form() {
  const currentDate = dayjs(); // Get the current date
  const { setIsFormActive } = useAppState(); // Assuming you want to use this later

  const [details, setDetails] = useState({
    type: "income",
    name: "",
    category: "category 1",
    description: "",
    amount: 0,
    recurring: false,
    term: "monthly",
    endDate: currentDate.format("YYYY-MM-DD"), // Set to today's date by default
  });

  const postDetails = async () => {
    try {
      const jsonString = JSON.stringify(details);
      const response = await axios.post("http://192.168.29.225:8000", {
        jsonString,
      });
      //192.168.29.225

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error submitting form ! please check your internet connection");
    }
  };

  const handleButtonClick = (message) => {
    console.log(message);
    setIsFormActive(false);
  };

  const handleTabChange = (newValue) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      type: newValue === 0 ? "income" : "expense",
    }));
    console.log(newValue);
  };

  const handleCategoryChange = (newCategory) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      category: newCategory,
    }));
    console.log("Selected category changed:", newCategory);
    // Handle the category change in the parent component if needed
  };

  const handleDescriptionChange = (newDescription) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      description: newDescription,
    }));
    console.log("Description changed:", newDescription);
    // Handle the description change in the parent component if needed
  };

  const handleAmountChange = (newAmount) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      amount: newAmount,
    }));
    console.log("Amount changed:", newAmount);
  };

  const handleRecurringChange = (newRecurringState) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      recurring: newRecurringState,
    }));
    console.log("Recurring state changed:", newRecurringState);
    // Handle the recurring state change in the parent component if needed
  };

  const handleEndDateChange = (newEndDate) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      endDate: newEndDate,
    }));
  };

  const handleSubmit = (buttonLabel) => {
    // Trigger the callback function with the button label
    postDetails();
    //const jsonString = JSON.stringify(details, null, 2); // The third parameter (2) adds indentation for better readability
    //console.log(jsonString);
    console.log("your response has been submitted");
  };

  useEffect(() => {
    console.log("Updated Details:", details);
  }, [details]);

  return (
    <div className="form">
      <div className="header">
        <div>Form</div>
        <div>
          <FloatingActionButtons onClick={handleButtonClick} />
        </div>
      </div>
      <div>
        <AccessibleTabs2 onTabChange={handleTabChange} />
      </div>
      <div>
        <ControllableStates
          selectedValue={details.category}
          onValueChange={handleCategoryChange}
          options={["category 1", "category 2", "category 3"]}
        />
      </div>
      <div>
        <MultilineTextFields
          description={details.description}
          onDescriptionChange={handleDescriptionChange}
        />
      </div>
      <div>
        <FormPropsTextFields
          amount={details.amount}
          onAmountChange={handleAmountChange}
        />
      </div>
      <div>
        <CheckboxLabels
          recurring={details.recurring}
          onRecurringChange={handleRecurringChange}
        />
      </div>
      {details.recurring && (
        <>
          <div>
            <DatePickerValue onEndDateChange={handleEndDateChange} />
          </div>
          <div>
            <BasicSelect />
          </div>
        </>
      )}

      <div>
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Form;
