import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const SliderComponent = ({ currentAge, retirementAge, onAgeChange }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={[currentAge, retirementAge]}
        onChange={(_, newValue) => onAgeChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100} // Assuming maximum age is 100
        marks={[
          { value: currentAge, label: `Current Age: ${currentAge}` },
          { value: retirementAge, label: `Retirement Age: ${retirementAge}` }
        ]}
        valueLabelFormat={(value, index) => index === 0 ? `Current Age: ${value}` : `Retirement Age: ${value}`}
      />
    </Box>
  );
};

export default SliderComponent;
