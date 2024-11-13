import { Box, useTheme } from '@mui/material';
import { FC } from 'react';

import Accordion from '@/components/Default/Accordian';

interface ACCORDION_DATA {
  title: string;
  content: JSX.Element | JSX.Element[] | string | number | boolean;
}

interface AccordionListProps {
  data: ACCORDION_DATA[];
}

const AccordionList: FC<AccordionListProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Box>
      {data.length > 0 &&
        data.map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)}
    </Box>
  );
};

export default AccordionList;
