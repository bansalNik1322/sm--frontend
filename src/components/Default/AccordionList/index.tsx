import { Box, Typography } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';

import { useRequest } from '@/components/App';
import { BarLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import Accordion from '@/components/Default/Accordian';
import { useContainerContext } from '@/Layout/Container/context';

interface ACCORDION_DATA {
  title: string;
  content: JSX.Element | JSX.Element[] | string | number | boolean;
}

interface AccordionListProps {
  data: ACCORDION_DATA[];
  api: {
    url: string;
  };
  loading: boolean;
}

const AccordionList: FC<AccordionListProps> = ({ data, ...props }) => {
  console.log('🚀 ~ data:', data);
  const { request, loading } = useRequest();
  const { state, dispatch } = useCommonReducer();
  const { dispatch: globalDispatch } = useContainerContext();

  const fetchData = useCallback(async () => {
    if (props?.api?.url) {
      if (props?.loading) return;
      const payload = {
        page: 1,
        limit: 20,
      };

      const abc = await request(props?.api?.url, payload);
      console.log('🚀 ~ fetchTableData ~ abc:', abc);

      const { total, pages, result } = (await request(props?.api?.url, payload)) as {
        result: any;
        pages: number;
        total: number;
      };
      console.log('🚀 ~ const{total,pages,result}= ~ total:', total, pages, result);
      if (result && result !== undefined) {
        const lastPage: number = +Math.ceil(total / 20);
        const paginationSize = 4;
        dispatch({
          type: 'SET_DATA',
          data: {
            ...state,
            endPage:
              state.endPage && state.endPage > 1
                ? state.endPage
                : (lastPage > paginationSize ? paginationSize : lastPage) || 1,
            totalSize: total,
            result: data,
          },
        });
        globalDispatch({
          [props?.api?.url as string]: { result, total, pages },
        });
      }
    }
  }, [props?.loading]);

  useEffect(() => {
    if (!props?.api?.url) {
      const lastPage = Math.ceil(data?.length / state.limit);
      const paginationSize = 4;
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          result: data,
          endPage: lastPage > paginationSize ? paginationSize : lastPage,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state?.searchKeyword) {
      const timer = setTimeout(() => {
        fetchData();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (props?.api?.url) {
        const timer = setTimeout(() => {
          fetchData();
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      } else {
        fetchData();
      }
    }
  }, [fetchData]);
  console.log('🚀 ~ fetchData:', loading?.[`${props?.api?.url}_LOADING`]);

  const NoDataIndication = () => (
    <Typography className="text-center">
      {loading?.[`${props?.api?.url}_LOADING`] ? <BarLoader /> : 'No Data Found'}
    </Typography>
  );

  return (
    <Box>
      {data.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
        data.map((item, index) => <Accordion key={index} title={item.title} content={item.content} />)
      ) : (
        <NoDataIndication />
      )}
    </Box>
  );
};

export default AccordionList;
