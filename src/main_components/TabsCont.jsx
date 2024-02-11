import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableCont from './TableCont';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsCont() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-between',
            },
          }}
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Cinema 1" {...a11yProps(1)} />
          <Tab label="Cinema 2" {...a11yProps(2)} />
          <Tab label="Cinema 3" {...a11yProps(3)} />
          <Tab label="Cinema 4" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        All
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableCont />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Cinema 2
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Cinema 3
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Cinema 4
      </CustomTabPanel>
    </Box>
  );
}
