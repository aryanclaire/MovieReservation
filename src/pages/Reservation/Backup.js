import React, { useEffect, useState } from 'react';
import { Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';

export default function Backup() {
    const [reserve, setReserve] = useState([]);

    useEffect(() => {
        const fetchReserve = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/details/');
                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }
                const data = await response.json();
                setReserve(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchReserve();
    }, []);

    return (
        <div className='reserv'>
            <h2>List of Reservations</h2> 
            <Box className="reserv-cont" style={{ display: 'flex' }}>
                <TableBody>
                    {reserve.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.res_id}</TableCell>
                            <TableCell>{`${row.f_name} ${row.m_name} ${row.l_name}`}</TableCell>
                            <TableCell>{row.senior}</TableCell>
                            <TableCell>{row.seat.join(', ')}</TableCell>
                            <TableCell>{row.amt_pay}</TableCell>
                            <TableCell>{row.m_id} shit</TableCell>
                            <TableCell>{row.isCancel ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Box>
        </div>
    );
}
