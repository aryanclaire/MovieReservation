import React, { useState } from 'react';
import { TextField } from '@mui/material';

const DateCont = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <TextField
      id="date"
      label="Select Date"
      type="date"
      value={date}
      onChange={handleDateChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateCont;
