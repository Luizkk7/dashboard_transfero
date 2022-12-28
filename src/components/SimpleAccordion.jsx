import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';
import api from '@api/index';
import mockedPapersResponse from './mocked-papers-response.json';

export default function SimpleAccordion() {
  const [papers, setPapers] = React.useState([]);

  const getPapers = async () => {
    api
      .get('/papers')   
      .then((data) => {
        console.log('success', data);
      })
      .catch((error) => {
        console.log('erro', error);
      });

    const uniqueSystemIds = new Set(
      mockedPapersResponse.map(({ system_id }) => system_id)
    );

    const newPapers = Array.from(uniqueSystemIds).map((system_id) => {
      return {
        system_id,
        name_system: mockedPapersResponse.find(
          (el) => el.system_id === system_id
        ).name_system,
        papers: mockedPapersResponse
          .filter((item) => item.system_id === system_id)
          .map((item) => ({
            paper_id: item.paper_id,
            paper_name: item.name,
            status: item.status
          }))
      };
    });

    setPapers(newPapers);
  };

  useEffect(() => {
    const asyncFn = async () => {
      await getPapers();
    };
    asyncFn();
  }, []);

  console.log(JSON.stringify(papers, null, 2));

  return (
    <div>
      <Typography>Transfero Systems</Typography>
      {papers.map((paper) => (
        <Accordion key={paper.system_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{paper.name_system}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MultipleSelectCheckmarks papers={paper.papers} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
