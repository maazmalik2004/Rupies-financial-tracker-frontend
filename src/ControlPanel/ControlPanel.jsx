import React, { useState, useEffect } from "react";
import "./controlpanel.css";
import { useAppState } from "../AppStateContext";
import FloatingActionButtons from "./FloatingActionButtons";
import axios from "axios";
import FilterIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

function ControlPanel() {
  const { isFormActive, setIsFormActive } = useAppState();
  const { dashboardState, setDashboardState } = useAppState();
  const [isFilterActive, setIsFilterActive] = useState(false); 
  const {formState, setFormState}=useAppState();

  const fetchDataAndStoreInSessionStorage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/graph', formState);
      sessionStorage.setItem('graphData',response.data);
      console.log('Data stored in session storage:', sessionStorage.get('graphData'));
    } catch (error) {
      console.log("in error block");
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    setIsFormActive(!isFormActive);
  };

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

// Handle changes to form inputs
const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
    }));
};

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission
  fetchDataAndStoreInSessionStorage();
  /*
  try {
      // Define the URL for the POST request
      const url = 'http://localhost:8000/filter';

      // Make a POST request with formState as the request body
      const response = await axios.post(url, formState);

      // Check the response and update the dashboard state with the received data
      if (response && response.data) {
          const data = response.data;

          // Convert base64 image data to the desired format
          const base64String = data.imageUrlBase64.split(",")[1];
          const imageDataURL = `data:image/png;base64,${base64String}`;

          // Update dashboard state with received data
          setDashboardState({
              income: data.income,
              expense: data.expense,
              balance: data.balance,
              graphImage: imageDataURL, // Set graphImage using the converted base64 image data
          });
      }
  } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error applying filters! Please try again later.");
  }
  */
};

useEffect(() => {
  fetchDataAndStoreInSessionStorage();
}, [formState]);

  return (
    <>
      <div className>
        {/*<MenuSelect
          onSelect={handleTermSelect}
          currentSelect={termSelect}
          menu={["daily", "weekly", "monthly", "yearly"]}
        />
        <br />
        {termSelect === "monthly" && (
          <ScrollableMenuSelect
            onSelect={handleMonthSelect}
            currentSelect={monthSelect}
            menu={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
        )}*/}
        <div className="flexmaster69">
          <div className="log-new">
            <FloatingActionButtons onClick={handleButtonClick} />
          </div>
          <div className="filtericon" onClick={toggleFilter}>
            {isFilterActive ? <CloseIcon />:<FilterIcon />}
          </div>
        </div>
        {isFilterActive && (
          <form className="formstyle" onSubmit={handleSubmit}>
    <select
        id="selection"
        name="selectedOption"
        value={formState.selectedOption}
        onChange={handleChange}
        className="filterinput"
    >
        <option value="both">Both</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <div className="flexmaster69">
        <input
            type="checkbox"
            name="allTimeCheckbox"
            checked={formState.allTimeCheckbox}
            onChange={handleChange}
            className="checkbox"
        />
        <p>All time</p>
    </div>

    {/* Conditionally render date input fields if allTimeCheckbox is not selected */}
    {!formState.allTimeCheckbox && (
        <>
            <input
                type="date"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
                className="filterinput"
                placeholder="Start date"
            />

            <input
                type="date"
                name="endDate"
                value={formState.endDate}
                onChange={handleChange}
                className="filterinput"
                placeholder="End date"
            />
        </>
    )}

    <div className="flexmaster69">
        <input
            type="checkbox"
            name="amountRangeCheckbox"
            checked={formState.amountRangeCheckbox}
            onChange={handleChange}
            className="checkbox"
        />
        <p>Amount range</p>
    </div>

    {/* Conditionally render amount input fields if amountRangeCheckbox is selected */}
    {formState.amountRangeCheckbox && (
        <>
            <input
                type="number"
                name="startingAmount"
                value={formState.startingAmount}
                onChange={handleChange}
                className="filterinput"
                placeholder="Starting amount"
            />

            <input
                type="number"
                name="endingAmount"
                value={formState.endingAmount}
                onChange={handleChange}
                className="filterinput"
                placeholder="Ending amount"
            />
        </>
    )}

    <div className="flexmaster69">
        <input
            type="checkbox"
            name="includeRecurringCheckbox"
            checked={formState.includeRecurringCheckbox}
            onChange={handleChange}
            className="checkbox"
        />
        <p>Include recurring</p>
    </div>

    <button type="submit" className="filterbutton">Apply</button>
</form>

        )}
      </div>
    </>
  );
}

export default ControlPanel;
