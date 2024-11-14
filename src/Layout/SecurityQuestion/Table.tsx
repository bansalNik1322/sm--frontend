/* eslint-disable import/order */
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { useRequest } from '@/components/App';
import { BarLoader } from '@/components/App/Loader';
import CustomPagination from '@/components/Default/Pagination';
import { data, initialState, reducer } from '@/components/Default/Table/reducer';
import { DATATABLE_COLUMN } from '@/types/interfaces';

import { useContainerContext } from '../Container/context';
import BulkActions from './BulkActions';

type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

interface TableProps {
  className?: string;
  items: Array<data>;
  columns: DATATABLE_COLUMN[];
  api: { url: string };
  loading?: boolean;
}

interface Filters {
  status?: CryptoOrderStatus | null;
}

const DataTable: FC<TableProps> = ({ items, columns, ...props }) => {
  console.log('🚀 ~ items:', items);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const { request, loading } = useRequest();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatch: globalDispatch } = useContainerContext();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedBulkActions = selectedItems.length > 0;
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  // This function checks if the table can scroll horizontally
  const checkScrollable = () => {
    if (tableContainerRef.current) {
      const { scrollWidth, clientWidth } = tableContainerRef.current;
      console.log('🚀 ~ checkScrollable ~ scrollWidth, clientWidth:', scrollWidth, clientWidth);
      setIsScrollable(scrollWidth > clientWidth - 20);
    }
  };

  // Check scrollability on initial load and window resize
  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [isScrollable]);

  const NoDataIndication = () => (
    <TableRow>
      <TableCell colSpan={10} className="text-center">
        {loading?.[`${props?.api?.url}_LOADING`] ? <BarLoader /> : 'No Data Found'}
      </TableCell>
    </TableRow>
  );

  const fetchTableData = useCallback(async () => {
    if (props?.api?.url) {
      if (props?.loading) return;
      const payload = {
        page: state?.currentPage || 1,
        limit: state.limit || 10,
      };

      const {
        total,
        pages,
        result,
        limit = 10,
      } = (await request(props?.api?.url, payload)) as {
        result: any;
        pages: number;
        total: number;
        limit: number;
      };
      console.log('🚀 ~ fetchTableData ~ lastPage:', total, pages, result, limit);

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
            result: items,
            limit: limit,
          },
        });
        globalDispatch({
          [props?.api?.url as string]: { result, total, pages },
        });
      }
    }
  }, [props?.loading, state.currentPage, state.limit, state.totalSize]);

  useEffect(() => {
    if (!props?.api?.url) {
      const lastPage = Math.ceil(items?.length / state.limit);
      const paginationSize = 4;
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          result: items,
          endPage: lastPage > paginationSize ? paginationSize : lastPage,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state?.searchKeyword) {
      const timer = setTimeout(() => {
        fetchTableData();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (props?.api?.url) {
        const timer = setTimeout(() => {
          fetchTableData();
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      } else {
        fetchTableData();
      }
    }
  }, [fetchTableData]);

  const scrollTable = (direction: 'left' | 'right') => {
    const tableContainer = document.querySelector('.MuiTableContainer-root') as HTMLElement;
    const scrollAmount = 200;

    if (direction === 'left') {
      tableContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      tableContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const statusOptions = [
    {
      id: 'all',
      name: 'All',
    },
    {
      id: 'completed',
      name: 'Completed',
    },
    {
      id: 'pending',
      name: 'Pending',
    },
    {
      id: 'failed',
      name: 'Failed',
    },
  ];

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    let value: CryptoOrderStatus | null = null;

    if (event.target.value !== 'all') {
      value = event.target.value as CryptoOrderStatus; // Type assertion
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedItems(event.target.checked ? items.map(item => String(item.id)) : []);
  };

  const handleSelectItem = (_event: ChangeEvent<HTMLInputElement>, cryptoOrderId: string): void => {
    if (!selectedItems.includes(cryptoOrderId)) {
      setSelectedItems(prevSelected => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedItems(prevSelected => prevSelected.filter(id => id !== cryptoOrderId));
    }
  };

  const selectedSomeCryptoOrders = selectedItems.length > 0 && selectedItems.length < items.length;
  const selectedAllItems = selectedItems.length === items.length;

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {isScrollable && (
                <>
                  <IconButton
                    sx={{
                      marginLeft: 2,
                      color: 'text.primary',
                      fontSize: '17px',
                    }}
                    onClick={() => scrollTable('left')}
                  >
                    <ArrowBackIosNew />
                  </IconButton>
                  <IconButton
                    sx={{
                      fontSize: '17px',
                      marginLeft: 1,
                      color: 'text.primary',
                    }}
                    onClick={() => scrollTable('right')}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </>
              )}
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                    {statusOptions.map(statusOption => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          }
          title="Security Questions"
        />
      )}
      <Divider />

      <TableContainer sx={{ overflowX: 'scroll' }} ref={tableContainerRef}>
        <Table sx={{ overflowX: 'scroll' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: '#151A36' }}>
                <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllItems}
                />
              </TableCell>

              <TableCell align="center" sx={{ minWidth: '150px' }}>
                ID
              </TableCell>
              {columns?.map(
                (column: DATATABLE_COLUMN, i: number) =>
                  (column.hidden === undefined || column.hidden === false) && (
                    <TableCell align="center" sx={{ minWidth: '150px' }} key={i}>
                      {column.text}
                    </TableCell>
                  ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
              items.map((item: any, i: number) => {
                // Only render if item.hidden is undefined or false
                const isCryptoOrderSelected = selectedItems.includes(item.id);
                return (
                  <TableRow hover key={item.id} selected={isCryptoOrderSelected}>
                    <TableCell
                      align="center"
                      padding="checkbox"
                      sx={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#111633',
                      }}
                    >
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectItem(event, item.id)}
                        value={isCryptoOrderSelected}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: '150px' }}>
                      {((state?.currentPage - 1) * state?.limit || 0) + i + 1}
                    </TableCell>
                    {columns.map(
                      (col, j) =>
                        (col.hidden === undefined || col.hidden === false) && (
                          <TableCell key={j} align="center" sx={{ minWidth: '150px' }}>
                            {item[col.dataField]}
                          </TableCell>
                        ),
                    )}
                  </TableRow>
                );
              })
            ) : (
              <NoDataIndication />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        {items?.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
          <CustomPagination state={state} dispatch={dispatch} />
        ) : (
          <></>
        )}
      </Box>
    </Card>
  );
};

DataTable.propTypes = {
  items: PropTypes.array.isRequired,
};

DataTable.defaultProps = {
  items: [],
};

export default DataTable;
