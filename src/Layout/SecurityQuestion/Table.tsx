import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import Label from '@/components/Default/Label';
import { DATATABLE_COLUMN } from '@/types/interfaces';

import BulkActions from './BulkActions';

interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

interface TableProps {
  className?: string;
  items: CryptoOrder[];
  columns: DATATABLE_COLUMN[];
}

interface Filters {
  status?: CryptoOrderStatus | null;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error',
    },
    completed: {
      text: 'Completed',
      color: 'success',
    },
    pending: {
      text: 'Pending',
      color: 'warning',
    },
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (items: CryptoOrder[], filters: Filters): CryptoOrder[] => {
  return items.filter(cryptoOrder => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (items: CryptoOrder[], page: number, limit: number): CryptoOrder[] => {
  return items.slice(page * limit, page * limit + limit);
};

const DataTable: FC<TableProps> = ({ items, columns }) => {
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedBulkActions = selectedItems.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  // This function checks if the table can scroll horizontally
  const checkScrollable = () => {
    // if (tableContainerRef.current) {
    // }
    setIsScrollable(true);
  };

  // Check scrollability on initial load and window resize
  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

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
    setSelectedItems(event.target.checked ? items.map(item => item.id) : []);
  };

  const handleSelectItem = (_event: ChangeEvent<HTMLInputElement>, cryptoOrderId: string): void => {
    if (!selectedItems.includes(cryptoOrderId)) {
      setSelectedItems(prevSelected => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedItems(prevSelected => prevSelected.filter(id => id !== cryptoOrderId));
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoItems = applyFilters(items, filters);
  const paginatedCryptoOrders = applyPagination(filteredCryptoItems, page, limit);
  const selectedSomeCryptoOrders = selectedItems.length > 0 && selectedItems.length < items.length;
  const selectedAllItems = selectedItems.length === items.length;
  const theme = useTheme();

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
                    }}
                    onClick={() => scrollTable('left')}
                  >
                    <ArrowBackIosNew />
                  </IconButton>
                  <IconButton
                    sx={{
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
            {paginatedCryptoOrders.map((item: any) => {
              
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
                    {columns.map((col, j) => (
                        (col.hidden === undefined || col.hidden === false) && (
                      <TableCell key={j} align="center" sx={{ minWidth: '150px' }}>
                        {col?.type === 'date' ? (
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {format(item[`${col.dataField}`], 'MMMM dd yyyy')}
                          </Typography>
                        ) : col?.type === 'label' ? (
                          getStatusLabel(item[`${col.dataField}`])
                        ) : col?.type === 'action' ? (
                          <>
                            <Tooltip title="Edit Order" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.primary.lighter,
                                  },
                                  color: theme.palette.primary.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Order" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': { background: theme.colors.error.lighter },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {item[`${col.dataField}`]}
                          </Typography>
                        )}
                      </TableCell>)
                    ))}
                  </TableRow>
                );
              }
                // Return null for rows that should be hidden
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
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
