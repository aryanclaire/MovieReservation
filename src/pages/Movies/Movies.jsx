import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Box, InputLabel, MenuItem, TextField,FormControl  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// calendar imports

// Create a styled component
const CustomButton = styled(Button)({
  backgroundColor: '#0D99FF',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1A7FC9',
  },
  marginLeft: 'auto',
});

const MoviesBox = styled(Box)({
  display: 'flex',

});
// Form
const FormBox = styled(Box)({
  width: '25%',
});
// 
const DisplayData = styled(Box)({
  width: '75%',
});

const TextFieldCont = styled(TextField)({
  width: '100%',
  marginTop: '15px',
});

const SelectCont = styled(FormControl)({
  width: '100%',
  marginTop: '15px',
});

export default function Movies() {
  // select
  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  }

  // select
  const [cinema, setCinema] = React.useState('');
  const handleChangeCinema = (event: SelectChangeEvent) => {
    setCinema(event.target.value);
  }
  return (
    <MoviesBox >
      {/* for input and update */}
      <FormBox>
        <Box>
          <CustomButton>
            Add Movies
          </CustomButton>
        </Box>
        {/* TextField */}
          <TextFieldCont
            label="Movie Title"
            id="outlined-size-small"
            size="small"
          />

          <TextFieldCont
            label="Description"
            id="outlined-size-small"
            size="small"
          />
          <SelectCont size="small">
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </SelectCont>
          
          {/* MPA Film Rating */}
          <TextFieldCont
            label="MPA Film Rating"
            id="outlined-size-small"
            size="small"
          />

          {/* No. of Hours */}
          <TextFieldCont
            label="No. of Hours"
            id="outlined-size-small"
            size="small"
          />
          <Box>



          </Box>

          {/* Price */}
          <TextFieldCont
            label="Price"
            id="outlined-size-small"
            size="small"
          />

          {/* Cinema */}
          <SelectCont size="small">
            <InputLabel id="demo-simple-select-helper-label">Cinema</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={cinema}
              label="Cinema"
              onChange={handleChangeCinema}
            >
              <MenuItem value={1}>Cinema 1</MenuItem>
              <MenuItem value={2}>Cinema 2</MenuItem>
              <MenuItem value={3}>Cinema 3</MenuItem>
              <MenuItem value={4}>Cinema 4</MenuItem>

            </Select>
          </SelectCont>

          

      </FormBox>
      {/* for display data */}
      <DisplayData>
        DISPLAY DATA
      </DisplayData>

      
    </MoviesBox>
    
  );
}

