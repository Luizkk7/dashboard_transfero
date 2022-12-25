import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ReviewInfo = ({ formik }) => {
  const { values } = formik;
  return (
    <>
      <Typography variant="overline">Account Details</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Email" secondary={values.email} />
        </ListItem>
      </List>
      <Typography variant="overline">user permissions</Typography>
      <List></List>
    </>
  );
};

export default ReviewInfo;
