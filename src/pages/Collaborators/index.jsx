import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { listCollaborators, mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import Button from '@mui/material';




const handleClick = () => {
  return console.log('handleClick');
};

const handleRowClick = () => {
  return console.log('handleRowClick');
  
};

const Team = () => {
  
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  
  const rows = [
    { field: 'id', headerName: 'ID' },

    {
      field: 'age',
      headerName: 'Age',
      headerAlign: 'left',
      align: 'left'
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
      flex: 1,
      
      renderCell: ({ row: { access } }) => {
        return (
          
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === 'admin'
                ? colors.greenAccent[600]
                : access === 'manager'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {access === 'manager' && <SecurityOutlinedIcon />}
            {access === 'user' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {access}
            </Typography>
          </Box>
        );
      }
    },

    {
      field: 'Permissions',
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Print
          </Button>
        );
      }
    }
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-ro*ot': {
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
          }
        }}
      >
        <DataGrid
          onCellClick={handleClick}
          onRowClick={handleRowClick}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          rows={rows}
          columns={mockDataTeam}
        />
      </Box>
    </Box>
    
  );
};

export default Team;
