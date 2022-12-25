import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TeamCollaborador from './TeamCollaborador';
import VerticalTabs from '../Collaborators/Verticaltabs';
import Header from '../../components/Header';

import UIButton from './Button/Button';

const Team = () => {
  const navigate = useNavigate();

  return (
    <Box m="33px">
      <Header title="System Manager" subtitle="List of Collaborators" />{' '}
      <UIButton onClick={() => navigate('/new-collaborators')} />
      <VerticalTabs />
    </Box>
  );
};

export default Team;
