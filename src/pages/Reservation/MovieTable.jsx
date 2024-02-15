import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const data = [
  {
    "res_id": "1",
    "f_name": "John",
    "m_name": "Doe",
    "l_name": "Smith",
    "senior": 2,
    "isCancel": false,
    "seat": ["A1", "A2", "B3"],
    "amt_pay": 100,
    "m_id": "616512af6e650ab9e8db54d2"
  },
  {
    "res_id": "2",
    "f_name": "Jane",
    "m_name": "",
    "l_name": "Doe",
    "senior": 1,
    "isCancel": true,
    "seat": ["C5", "C6"],
    "amt_pay": 50,
    "m_id": "616512af6e650ab9e8db54d3"
  },
  {
    "res_id": "3",
    "f_name": "Michael",
    "m_name": "",
    "l_name": "Johnson",
    "senior": 0,
    "isCancel": false,
    "seat": ["D7", "D8", "E9"],
    "amt_pay": 75,
    "m_id": "616512af6e650ab9e8db54d4"
  },
  {
    "res_id": "4",
    "f_name": "Emily",
    "m_name": "",
    "l_name": "Williams",
    "senior": 3,
    "isCancel": false,
    "seat": ["F10"],
    "amt_pay": 120,
    "m_id": "616512af6e650ab9e8db54d5"
  },
  {
    "res_id": "5",
    "f_name": "Daniel",
    "m_name": "John",
    "l_name": "Taylor",
    "senior": 1,
    "isCancel": false,
    "seat": ["G11", "G12"],
    "amt_pay": 55,
    "m_id": "616512af6e650ab9e8db54d6"
  },
  {
    "res_id": "6",
    "f_name": "Sophia",
    "m_name": "Rose",
    "l_name": "Brown",
    "senior": 0,
    "isCancel": true,
    "seat": ["H13"],
    "amt_pay": 30,
    "m_id": "616512af6e650ab9e8db54d7"
  },
  {
    "res_id": "7",
    "f_name": "William",
    "m_name": "",
    "l_name": "Miller",
    "senior": 2,
    "isCancel": false,
    "seat": ["I14", "I15"],
    "amt_pay": 90,
    "m_id": "616512af6e650ab9e8db54d8"
  },
  {
    "res_id": "8",
    "f_name": "Olivia",
    "m_name": "",
    "l_name": "Wilson",
    "senior": 0,
    "isCancel": false,
    "seat": ["J16", "J17", "K18"],
    "amt_pay": 85,
    "m_id": "616512af6e650ab9e8db54d9"
  },
  {
    "res_id": "9",
    "f_name": "James",
    "m_name": "Robert",
    "l_name": "Martinez",
    "senior": 1,
    "isCancel": false,
    "seat": ["L19"],
    "amt_pay": 40,
    "m_id": "616512af6e650ab9e8db54da"
  },
  {
    "res_id": "10",
    "f_name": "Isabella",
    "m_name": "",
    "l_name": "Hernandez",
    "senior": 0,
    "isCancel": true,
    "seat": ["M20", "N21"],
    "amt_pay": 65,
    "m_id": "616512af6e650ab9e8db54db"
  }
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isCancelFilter, setIsCancelFilter] = React.useState(false);
  const [movieIdFilter, setMovieIdFilter] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // Handle cancellation logic here
    // For demonstration, we'll just log the cancellation
    console.log(`Cancelled reservation with ID ${selectedRow.res_id}`);
    // Close the modal after handling cancellation
    setIsModalOpen(false);
  };

  const filteredData = data.filter((row) => {
    if (isCancelFilter !== null && row.isCancel !== isCancelFilter) {
      return false;
    }
    if (movieIdFilter && row.res_id !== movieIdFilter) {
      return false;
    }
    return true;
  });
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <TextField
          label="Movie ID Filter"
          variant="outlined"
          size="small"
          value={movieIdFilter}
          onChange={(e) => setMovieIdFilter(e.target.value)}
        />
        <Button onClick={() => setIsCancelFilter((prev) => !prev)}>
          {isCancelFilter ? 'Show All' : 'Show Non-Cancelled Only'}
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Senior</b></TableCell>
              <TableCell><b>Seat</b></TableCell>
              <TableCell><b>Amount Paid</b></TableCell>
              <TableCell><b>Movie ID</b></TableCell>
              <TableCell><b>Is Cancel</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.res_id}>
                  <TableCell>{row.res_id}</TableCell>
                  <TableCell>{row.l_name} {row.f_name}</TableCell>
                  <TableCell>{row.senior}</TableCell>
                  <TableCell>{row.seat.join(', ')}</TableCell>
                  <TableCell>{row.amt_pay}</TableCell>
                  <TableCell>{row.m_id}</TableCell>
                  <TableCell>
                    {row.isCancel ? (
                      <Button disabled style={{ color: 'red' }}>Cancelled</Button>
                    ) : (
                      <Button onClick={() => handleOpenModal(row)}>Cancel</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for confirmation */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius:'10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Are you sure you want to cancel?</h2>
          <p id="modal-modal-description">This action cannot be undone.</p>
          <Button onClick={handleCancel}>Yes</Button>
          <Button onClick={handleCloseModal}>No</Button>
        </Box>
      </Modal>
    </Paper>
  );
}
