import { Box, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useReducer } from 'react';

import { useRequest } from '@/components/App';
import { BarLoader } from '@/components/App/Loader';
import Accordion from '@/components/Default/Accordian';
import { useContainerContext } from '@/Layout/Container/context';

import CustomPagination from '../Pagination';
import { initialState, reducer } from '../Table/reducer';

interface ACCORDION_DATA {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}

interface AccordionListProps {
  data: ACCORDION_DATA[];
  api: {
    url: string;
  };
  loading: boolean;
  accordionTab?: string;
}

const AccordionList: FC<AccordionListProps> = ({ data, ...props }) => {
  console.log('🚀 ~ data:', data);
  const { request, loading } = useRequest();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatch: globalDispatch } = useContainerContext();

  const fetchData = useCallback(async () => {
    if (props?.api?.url) {
      if (props?.loading) return;
      const payload = {
        page: state.currentPage || 1,
        limit: state.limit || 10,
        ...(props?.accordionTab && { category: props?.accordionTab }),
      };

      const abc = await request(props?.api?.url, payload);
      console.log('🚀 ~ fetchTableData ~ abc:', abc);

      const { total, pages, result, limit } = (await request(props?.api?.url, payload)) as {
        result: any;
        pages: number;
        total: number;
        limit: number;
      };
      if (result && result !== undefined) {
        const lastPage: number = +Math.ceil(total / limit);
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
            result,
            limit,
            pages,
          },
        });
        globalDispatch({
          [props?.api?.url as string]: { result, total, pages },
        });
      }
    }
  }, [props?.loading, props?.accordionTab, state.limit, state.currentPage]);

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
      <Box p={2}>
        {data.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
          <CustomPagination state={state} dispatch={dispatch} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default AccordionList;
