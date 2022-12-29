import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';
import api from '@api/index';

export default function SimpleAccordion({onChangeCheck}) {
  const [systems, setSystems] = React.useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      await getSystems();
    };
    asyncFn();
  }, []);

  const getSystems = async () => {
    api
      .get('/systems/?max_records=0')
      .then((data) => {
        if (data.data && data.data.length > 0) {
          const systems = data.data;
          getPapers(systems);
        }
      })
      .catch((error) => {
        console.log('erro', error);
      });
  };

  const getPapers = async (systemsArr = []) => {
    api
      .get('/papers/?max_records=0')
      .then((data) => {
        let systemsWithPapers = [];
        const papersArr = data.data;
        if (
          papersArr &&
          papersArr.length > 0 &&
          systemsArr &&
          systemsArr.length > 0
        ) {
          systemsArr.map((system) => {
            system.papers = [];
            papersArr.map((paper) => {
              if (paper.system_id === system.system_id) {
                system.papers.push({ ...paper, checked: false });
              }
            });
            systemsWithPapers = systemsArr.filter(
              (systemFinal) => systemFinal.papers?.length > 0
            );
          });

          setSystems(systemsWithPapers || []);
        }
      })
      .catch((error) => {
        console.log('erro', error);
      });
  };

  return (
    <div>
      <Typography>Transfero Systems</Typography>
      {systems && systems.length > 0
        ? systems.map((system) => (
            <Accordion key={system.system_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{system.system_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MultipleSelectCheckmarks
                  papersProp={system.papers}
                  onChangeCheck={(paperChecked) => {
                    onChangeCheck(paperChecked || []);
                  }}
                />
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </div>
  );
}
