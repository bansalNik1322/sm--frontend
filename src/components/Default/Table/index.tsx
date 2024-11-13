import { Card, TableCell, TableHead, TableRow } from '@mui/material';
import { TableBody } from '@nextui-org/react';
import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { Table } from 'react-bootstrap';

import { useLoading, useRequest } from '@/components/App';
import { useContainerContext } from '@/Layout/Container/context';
import { KEYPAIR } from '@/types/interfaces';

import { initialState, reducer } from './reducer';

const Pagination = React.lazy(() => import('./Components/Pagination'));

export interface column {
  dataField: string;
  text: string | JSX.Element;
  hidden?: boolean;
  sort?: boolean;
  value?: string;
  search?: boolean;
}
interface data {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}
interface Props {
  columns: Array<column>;
  data: Array<data>;
  api?: {
    model?: string;
    url: string;
    body?: {
      [key: string]: unknown;
    };
    isAPILoading?: (loading: boolean) => void;
  };
  title: string;
  page?: number;
  url?: string;
  loading?: boolean;
  pagination?: boolean;
  dataShowModal?: JSX.Element;
  search?: boolean;
  stopApiCall?: boolean;
  options?: {
    expandRow?: {
      renderer: () => JSX.Element;
    };
  };
}
interface RESPONSE_DATATABLE {
  [key: string]: unknown;
  result?: data[];
  total?: number | string;
  limit?: number | string;
  page?: number | string;
  pages?: number | string;
  skip?: number | string;
}
function Index(props: Props) {
  const { request, loading } = useRequest();
  const { dispatch: globalDispatch } = useContainerContext();
  const { SimpleLoader } = useLoading();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { columns, data } = props;

  const NoDataIndication = () => (
    <tr>
      <td className="text-center" colSpan={columns?.length || 1}>
        {loading?.[`${props?.api?.url}_LOADING`] ? <SimpleLoader /> : 'No Data Found'}
      </td>
    </tr>
  );

  const filterDatatable = useCallback(() => {
    const filterData = data;
    if (!props?.api?.url) {
      const start = state.currentPage * state.limit - state.limit;
      const end = start + state.limit;
      const paginatedData = filterData?.slice(start, end);
      return paginatedData;
    }
    return filterData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);

  useEffect(() => {
    filterDatatable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDatatable]);

  const fetchAPIResult = useCallback(async () => {
    if (props?.api?.url) {
      // Don't call API is this params is true
      if (props?.stopApiCall) return;
      if (props?.loading) return;
      const payload = {
        page: state.currentPage,
        limit: state.limit,
        sort: state.sortBy,
        keyword: state.searchKeyword,
        pathname: props.api.url,
      } as KEYPAIR;
      if (state.searchKeyword) {
        payload['keyword'] = state.searchKeyword;
        payload['regex'] = state.searchRegex;
      }
      if (props?.api?.body) {
        payload['filter'] = props?.api?.body;
      }
      const res = (await request(props?.api?.url, payload)) as RESPONSE_DATATABLE;
      if (res?.result && res.result !== undefined) {
        const total = Number(res?.total);
        const lastPage: number = +Math.ceil(total / state.limit);
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
          [payload.pathname as string]: res,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage, state.limit, props?.loading, state.searchKeyword, state.sortBy, props?.stopApiCall]);

  const searchDatatable = useCallback((event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    let searchFields = columns;
    searchFields = searchFields
      .map(col => {
        if (col.dataField !== 'action' && !col.hidden && col.search !== false) {
          const regex = {
            [col.dataField]: { $regex: value, $options: 'sig' },
          };
          return regex;
        }
      })
      .filter(col => col !== undefined) as unknown as column[];
    dispatch({
      type: 'SET_DATA',
      data: {
        ...state,
        searchKeyword: value,
        searchRegex: (value ? searchFields : null) as any,
      },
    });
  }, []);

  const sortBy = useCallback(
    (sortField: string) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          sortBy: state.sortBy === sortField + '_desc' ? sortField + '_asc' : sortField + '_desc',
        },
      });
    },
    [state.sortBy],
  );

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
    if (state.searchKeyword) {
      const timer = setTimeout(() => {
        fetchAPIResult();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (!props.loading && props?.api?.url) {
        const timer = setTimeout(() => {
          fetchAPIResult();
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      } else {
        fetchAPIResult();
      }
    }
  }, [fetchAPIResult]);

  useEffect(() => {
    if (props?.api?.isAPILoading) {
      props?.api?.isAPILoading(loading?.[`${props?.api?.url}_LOADING`] as boolean);
    }
  }, [loading?.[`${props?.api?.url}_LOADING`]]);

  return (
    <Card style={{ marginTop: '50px' }}>
      <TableHead>
        <TableRow>
          {columns.map((col: column, i: number) => (
            <TableCell key={i}>{col.text}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.length ? (
          data?.map((row: data, i: number) => (
            <tr key={i}>
              {columns.map(col => (
                <TableRow hover key={i}>
                  {row[col.dataField]}
                </TableRow>
              ))}
            </tr>
          ))
        ) : (
          <NoDataIndication />
        )}
      </TableBody>
      <div className="WhtBox mt10">
        <div className="TableTop">
          {/* <div className="searchArea">
            <div className="searchInput">
              <Image alt="search" height={16} width={16} src="/assets/images/search.svg" />{' '}
              <Form.Control type="text" onChange={searchDatatable} placeholder="Search" />
            </div>
          </div> */}
          {/* <div className="TopAction">{props?.dataShowModal && props?.dataShowModal}</div> */}
        </div>
        <div className="table-responsive dataTable">
          <Table responsive hover></Table>
        </div>
        {(props?.pagination === undefined || props?.pagination) && (
          <Pagination records={data} state={state} dispatch={dispatch} onPageChange={filterDatatable} />
        )}
      </div>
    </Card>
  );
}

export default memo(Index);
