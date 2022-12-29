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

export default function CheckboxList({ papersProp, onChangeCheck }) {
  const [papers, setPapers] = React.useState(papersProp || []);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // get only checkeds
   const onlyChecked =  papers.filter((paper) => paper.checked)
    onChangeCheck(onlyChecked || []);
  }, [papers]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, index) => {
    const papersArr = [...papers];
    papersArr[index].checked = event.target.checked;
    setPapers(papersArr);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {papers.map((paper, index) => {
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
            <ListItemButton role={undefined} color="success" dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  color="success"
                  inputProps={{ 'aria-labelledby': labelId }}
                  checked={paper.checked}
                  onChange={(event) => handleChange(event, index)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={paper.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
