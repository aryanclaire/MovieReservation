import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Box, InputLabel, MenuItem, TextField,FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Divider, Typography  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TabsCont from '../../main_components/TabsCont';
import DateCont from '../../main_components/DateCont';

// calendar imports



const MoviesBox = styled(Box)({
  display: 'flex',
  gap: '5%',

});
// Form
const FormBox = styled(Box)`
  width: 25%;
`;
// 
const DisplayData = styled(Box)({
  width: '70%',
});

const TextFieldCont = styled(TextField)({
  width: '100%',
  marginTop: '15px',
});

const SelectCont = styled(FormControl)({
  width: '100%',
  marginTop: '15px',
});
const FormControlRadio = styled(FormControl)({
  width: '100%',
  marginTop: '15px',
});

// 
const OperationButton = styled(Box)({
  width: '100%',
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
});

export default function Movies() {

  // select
  const [cinema, setCinema] = React.useState('');
  const handleChangeCinema = (event: SelectChangeEvent) => {
    setCinema(event.target.value);
  }
  return (
    <MoviesBox >
      {/* for input and update */}
      <FormBox  >
        <Box>
          <Button variant="text" style={{color:'#0D99FF'}}>Add Movies</Button>
        </Box>
        <Divider style={{background:'#0D99FF'}}/>
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

          {/* Type */}
          <FormControlRadio>
            <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="premier" control={<Radio />} label="Premier" />
            </RadioGroup>
          </FormControlRadio>
         
         {/* Operation button */}
         <OperationButton>
            <Box>
            <Button variant="contained" style={{background:'#69737B',  width:'100px'}}>
              Cancel
            </Button>
            </Box>
            <Box>
              <Button variant="contained" style={{background:'#0D99FF', width:'100px'}}>Save</Button>
            </Box>
         </OperationButton>

      </FormBox>

      {/* for display data */}
      <DisplayData>
        {/* Search for date */}
        <Box style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Box>
            <Typography>January 1, 2024</Typography>
          </Box>
          <Box>
            <DateCont />
          </Box>
        </Box>  
        <TabsCont/>
        
      </DisplayData>

      
    </MoviesBox>
    
  );
}

