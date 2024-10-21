import React, { useState, useEffect } from 'react';
import { Slider, Typography, Button } from '@material-ui/core';

interface GantryHeightSliderProps {
  minGantryHeight: number;
  maxGantryHeight: number;
  onGantryHeightChange: (minGantryHeight: number, maxGantryHeight: number) => void;
}

const GantryHeightSlider: React.FC<GantryHeightSliderProps> = ({
  minGantryHeight,
  maxGantryHeight,
  onGantryHeightChange
}) => {
  // Initialize the state with the provided min and max values
  const [value, setValue] = useState<number[]>([minGantryHeight, maxGantryHeight]);

  // Effect to update the slider values if props change
  useEffect(() => {
    setValue([minGantryHeight, maxGantryHeight]);
  }, [minGantryHeight, maxGantryHeight]);

  const handleChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
      onGantryHeightChange(newValue[0], newValue[1]);
    }
  };

  const resetSlider = () => {
    // Reset the slider to the original min and max values
    minGantryHeight = 0;
    maxGantryHeight = 3;
    setValue([minGantryHeight, maxGantryHeight]);
    onGantryHeightChange(minGantryHeight, maxGantryHeight);
  };

  return (
    <div>
      <Slider
        orientation='horizontal'
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={minGantryHeight}
        max={maxGantryHeight}
      />
      <Typography style={{ color: "black" }}>
        Current value: {value.join(' - ')}
      </Typography>
      <div>
        <p style={{ color: "black" }}>Min Gantry Height: {value[0]}m</p>
        <p style={{ color: "black" }}>Max Gantry Height: {value[1]}m</p>
      </div>
      <Button variant="contained" color="primary" onClick={resetSlider}>
        Reset to Max
      </Button>
    </div>
  );
};

export default GantryHeightSlider;