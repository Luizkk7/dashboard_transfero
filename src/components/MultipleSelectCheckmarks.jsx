import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InfoIcon from '@mui/icons-material/Info';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
}

export default function CheckboxList({ papers }) {
  // const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  // async function name1() {
  //   let name = await props.paperName1;
  // }

  // useEffect(() => {
  //   name1();
  // });

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {papers.map((paper) => {
        const labelId = `checkbox-list-label-${paper.paper_id}`;

        return (
          <ListItem
            key={paper.paper_id}
            secondaryAction={
              <>
                <button onClick={handleClickOpen}>
                  <InfoIcon style={{ borderRadius: '6px' }} />
                </button>
                <SimpleDialog open={open} onClose={handleClose} />
              </>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              color="success"
              // onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  // checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  color="success"
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={paper.paper_name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
