import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import React from 'react';

interface AccordionProps {
  title: string;
  content: string | ReactNode;
}

const DefaultAccordion: FC<AccordionProps> = props => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{
          '&:hover': {
            backgroundColor: expanded ? '#282d47' : '#1a1f3b',
          },
          borderRadius: '10px',
          backgroundColor: expanded ? '#282d47' : 'transparent',
          transition: 'background-color 0.3s ease',
          '& .MuiAccordion-root': {
            color: 'white',
          },
          '& .MuiTypography-root': {
            fontSize: '17px',
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <Tooltip arrow title="Close">
                <RemoveIcon />
              </Tooltip>
            ) : (
              <Tooltip arrow title="Open">
                <AddIcon />
              </Tooltip>
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{props?.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{props?.content}</AccordionDetails>
      </Accordion>
      <Divider sx={{ marginTop: 1 }} />
    </>
  );
};

export default DefaultAccordion;
