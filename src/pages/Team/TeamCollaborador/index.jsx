import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockDataTeam } from '../../../data/mockData';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';


const columns = [
  { headerName: 'ID', flex: 0.5 },

  {
    field: 'Email',
    headerName: 'Email',
    flex: 3
  },
  {
    field: 'Permissions',
    headerName: 'Permissions',
    flex: 1
  }
];

const TeamCollaborador = (props) => {
  const theme = useTheme();
  const [email, setEmail] = useState([]);
  const colors = tokens(theme.palette.mode);
  async function getUser() {
    await setTimeout(() => setEmail(mockDataTeam), 5000);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box
      m="4px 1 2 0"
      height="60vh"
      
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        },
        '& .name-column--cell': {
          color: colors.greenAccent[300]
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none'
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400]
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700]
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.grey[100]} !important`
        }
      }}
    >
      <DataGrid
        
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        rows={email}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TeamCollaborador;
