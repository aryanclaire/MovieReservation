import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Box, InputLabel, MenuItem, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Divider, Typography, Input, Card, CardMedia } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TabsCont from '../../main_components/TabsCont';
import DateCont from '../../main_components/DateCont';

// calendar imports



const MoviesBox = styled(Box)({
  display: 'flex',
  gap: '2%',

});
// Form
const FormBox = styled(Box)`
  width: 25%;
`;
// 
const DisplayData = styled(Box)({
  width: '73%',
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

export default function BackupMovie() {

  // select
  const [cinema, setCinema] = useState('');
  const [dateShow, setDateShow] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (event) => { // handle file
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      // Extracting file name with extension and setting it to state
      const fileName = file.name;
      setSelectedFileName(fileName);
    } else {
      setSelectedFile(null);
      setSelectedFileName(""); // Clearing file name if file is invalid
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const startTime = new Date(dateShow + 'T' + timeStart);
    const endTime = new Date(dateShow + 'T' + timeEnd);
  
    const movieData = {
      m_title: event.target.elements.movieTitle.value,
      m_desc: event.target.elements.description.value,
      m_genre: event.target.elements.genre.value,
      m_mpa: event.target.elements.mpa.value,
      m_hrs: event.target.elements.hrs.value,
      m_date: dateShow,
      m_starttime: startTime,
      m_endtime: endTime,
      m_price: event.target.elements.price.value,
      m_cinema: cinema,
      m_poster: selectedFileName,
      m_type: event.target.elements.type.value
    };
  
    try {
      const response = await fetch('http://localhost:5555/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      // Reset form and state after successful submission
      event.target.reset();
      setDateShow('');
      setTimeStart('');
      setTimeEnd('');
      setCinema('');
      selectedFileName('');
      setError(null);
      console.log('Movie added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeCinema = (event: SelectChangeEvent) => { // handle cinema selection
    setCinema(event.target.value);
  }

  const handleDateShowChange = (event) => { // handle datechange
    setDateShow(event.target.value);
  };

  const handleTimeStartChange = (event) => {
    setTimeStart(event.target.value); // handle time change
  };

  const handleTimeEndChange = (event) => {
    setTimeEnd(event.target.value); // handle time change
  };

  return (
    <MoviesBox >
      {/* for input and update */}
      <FormBox style={{ background: '#fff', padding: '25px', borderRadius: '10px' }} onSubmit={handleSubmit}>
        <Box>
          <Button variant="text" style={{ color: '#0D99FF' }}>Add Movies</Button>
        </Box>
        <Divider style={{ background: '#0D99FF' }} />
        {/* TextField */}
        <form>
          <TextFieldCont
            name="movieTitle"
            label="Movie Title"
            id="outlined-size-small"
            size="small"
          />
          {/* Description */}
          <TextFieldCont
            name="description"
            label="Description"
            id="outlined-size-small"
            size="small"
          />

          {/* Genre */}
          <TextFieldCont
            name="genre"
            label="Genre"
            id="outlined-size-small"
            size="small"
          />

          {/* MPA Film Rating */}
          <TextFieldCont
            name="mpa"
            label="MPA Film Rating"
            id="outlined-size-small"
            size="small"
          />

          {/* date of the show */}
          <TextField
            id="date"
            label="Select Date"
            type="date"
            value={dateShow}
            onChange={handleDateShowChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* time of the show */}
          <TextField
            id="time"
            label="Select Time Start"
            type="time"
            value={timeStart}
            onChange={handleTimeStartChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes interval
            }}
          />

          {/* time of the show */}
          <TextField
            id="time"
            label="Select Time End"
            type="time"
            value={timeEnd}
            onChange={handleTimeEndChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes interval
            }}
          />
          {/* No. of hrs */}
          <TextFieldCont
            name="hrs"
            label="No. of hours"
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
              name="cinema"
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
              name="type"
            >
              <FormControlLabel value="regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="premier" control={<Radio />} label="Premier" />
            </RadioGroup>
          </FormControlRadio>

          {/* Price */}
          <TextFieldCont
            name="price"
            label="Price"
            id="outlined-size-small"
            size="small"
          />

          {/* insert file */}
          <Box>
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: 'image/*' }} // Define accepted file types if needed
            />
            {selectedFile && (
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                />
              </Card>
            )}
          </Box>

          {/* Operation button */}
          <OperationButton>
            <Box>
              <Button variant="contained" style={{ background: '#69737B', width: '100px' }}>
                Cancel
              </Button>
            </Box>
            <Box>
              <Button type="submit" variant="contained" style={{ background: '#0D99FF', width: '100px' }}>Save</Button>
            </Box>
          </OperationButton>

        </form>

      </FormBox>

      {/* for display data */}
      <DisplayData style={{ background: '#fff', padding: '25px', borderRadius: '10px' }}>
        {/* Search for date */}
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography>January 1, 2024</Typography>
          </Box>
          <Box>
            <DateCont />
          </Box>
        </Box>
        <TabsCont />

      </DisplayData>


    </MoviesBox>

  );
}
