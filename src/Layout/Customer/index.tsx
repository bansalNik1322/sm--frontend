'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Checkbox from '@/components/Default/Checkbox';
import Modal from '@/components/Default/Modal';
import ModalCentered from '@/components/Default/Modal/Centered';
import DefaultTable from '@/components/Default/Table';
import EditColumns, { COLUMN } from '@/Layout/Container/Components/EditColumns';
import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';

import CustomerForm from './Components/CustomerForm';
import CustomerHeader from './Components/CustomerHeader';
import CustomerPreview from './Components/CustomerPreview';

export interface CUSTOMER {
  lastname: any;
  id: string;
  firstname: string;
  fullname: string;
  status: string;
  phone: string;
  email: string;
  vehicle: string;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  const { state: globalState } = useContainerContext();

  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
    customerSelected: [],
  });

  const removeCustomer = async (id: string | string[]) => {
    const confirm = await deleteDialog('Are you sure you want to delete the customer/customers?', 'Delete');
    if (confirm) {
      const res = (await request('removeCustomerFromList', { id: id })) as REQUEST;
      if (res?.message)
        toastr(
          `The ${id?.length > 1 ? 'customers' : 'customer'}  has been successfully removed.`,
          'success',
          `${id?.length > 1 ? 'Customers' : 'Customer'} removed`,
        );
      dispatch({
        customerSelected: [],
        customerDetail: {},
        multirecordSelected: false,
        viewCustomerPreviewModal: false,
      });
    }
  };

  const openCustomerModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: 'Add new customer', customerDetail: null });
  };

  const OpenEditCustomerModal = (data: CUSTOMER) => {
    console.log(data);
    dispatch({
      viewCustomerModal: true,
      edit: true,
      CustomerModalTitle: `Edit ${data.firstname}`,
      customerDetail: data,
    });
  };

  const editCustomerColumnsModal = () => {
    dispatch({ editCustomerColumnsModal: true, editCustomerColumnModalTitle: 'Edit Columns' });
  };
  const closeModal = (key: string) => {
    dispatch({
      [key]: false,
      customerDetail: null,
      customerSelected: [],
      columns: state?.columns,
      CustomerModalTitle: '',
    });
  };

  const openPreviewCustomerModal = (data: CUSTOMER) => {
    dispatch({ viewCustomerPreviewModal: true, customerDetail: data });
  };

  const editPreviewModal = (data: CUSTOMER) => {
    dispatch({
      viewCustomerPreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      customerDetail: data,
      CustomerModalTitle: `Edit ${data.fullname}`,
    });
  };

  const selectMultiRecords = useCallback(
    (event: React.ChangeEvent<HTMLElement>) => {
      const { checked } = event.target as HTMLInputElement;
      dispatch({ multirecordSelected: checked });
      if (globalState?.getCustomersList?.result) {
        globalState?.getCustomersList?.result.map((customer: CUSTOMER) => {
          addToCustomersSelected(customer, event);
        });
      }
    },
    [state.multirecordSelected, globalState?.getCustomersList?.result],
  );

  const addToCustomersSelected = useCallback(
    (customer: CUSTOMER, event: React.ChangeEvent<HTMLElement>) => {
      const { checked } = event.target as HTMLInputElement;
      const selectedcustomers = state.customerSelected;
      if (!selectedcustomers) return;
      if (!selectedcustomers.includes(customer.id)) selectedcustomers.push(customer?.id);
      if (!checked) {
        const index = selectedcustomers.findIndex((item: string) => item === customer.id);
        if (index > -1) {
          selectedcustomers.splice(index, 1);
        }
        dispatch({ multirecordSelected: checked });
      }

      dispatch({
        customerSelected: [...selectedcustomers],
        customerDetail: customer,
      });
    },
    [state.customerSelected],
  );

  const getCustomersList = useMemo(
    () =>
      globalState?.getCustomersList?.result
        ? globalState?.getCustomersList?.result.map((customer: CUSTOMER) => ({
            check: (
              <Checkbox
                checked={state?.customerSelected?.includes(customer.id)}
                name={'customers ' + customer.id}
                onChange={event => addToCustomersSelected(customer, event)}
              />
            ),
            fullname: (
              <div className="usr-preview">
                <span>{customer.fullname}</span>
                <button onClick={() => openPreviewCustomerModal(customer)}>Preview</button>
              </div>
            ),
            email: customer.email,
            firstname: customer.firstname,
            lastname: customer.lastname,
            phone: customer.phone,
            status: customer.status,
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => OpenEditCustomerModal(customer)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeCustomer([customer.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    [globalState?.getCustomersList?.result, state?.customerSelected],
  );

  const getColumns = useCallback(async () => {
    const req = (await request('getColumns', { model: 'Customers' })) as REQUEST;
    if (req) {
      dispatch({
        columns: req.columnViews,
      });
    }
  }, []);

  useEffect(() => {
    getColumns();
  }, [getColumns]);

  const columns = useMemo(() => {
    const selected = state?.columns?.selected?.reduce(
      (acc: Array<any>, column: COLUMN) => {
        const { name, label } = column;
        acc.push({
          dataField: name,
          text: label,
        });
        return acc;
      },
      [
        {
          dataField: 'check',
          text: (
            <>
              <Checkbox
                checked={state.multirecordSelected || false}
                name="id"
                onChange={event => selectMultiRecords(event)}
              />
            </>
          ),
        },
      ],
    );
    selected.push({
      dataField: 'action',
      text: (
        <>
          {' '}
          <Button className="OutlineBtn SmBtn" onClick={() => editCustomerColumnsModal()}>
            {' '}
            Edit columns
          </Button>
        </>
      ),
    });
    return state?.columns?.selected?.length
      ? selected
      : [
          {
            dataField: 'action',
            text: (
              <>
                {' '}
                <Button className="OutlineBtn SmBtn" onClick={() => editCustomerColumnsModal()}>
                  {' '}
                  Edit columns
                </Button>
              </>
            ),
          },
        ];
  }, [
    globalState?.getCustomersList?.result,
    state?.columns?.selected?.length,
    loading?.editColumns_LOADING,
    state.multirecordSelected,
  ]);

  const saveColumns = async (data: { selected: COLUMN[]; view: COLUMN[] }) => {
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const req = (await request('editColumns', {
        moduleName: 'Customers',
        columnViews: data,
      })) as REQUEST;
      if (req) {
        dispatch({ editCustomerColumnsModal: false, columns: req?.columnViews });
      }
    }
  };

  const isLoading = useMemo(
    () => loading?.removeCustomerFromList_LOADING || state?.isEditLoading,
    [loading, state?.isEditLoading],
  );

  return (
    <>
      <CustomerHeader
        {...{ title: 'Customers', totalRecords: globalState?.getCustomersList?.total, handleOpen: openCustomerModal }}
      />
      <div className="container-fluid">
        <DefaultTable
          api={{
            url: 'getCustomersList',
          }}
          search={false}
          columns={columns}
          data={getCustomersList}
          loading={Boolean(isLoading)}
          dataShowModal={
            <>
              {state?.customerSelected?.length > 0 ? (
                <ul>
                  {state?.customerSelected?.length == 1 ? (
                    <li>
                      <a onClick={() => OpenEditCustomerModal(state?.customerDetail)}>
                        <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit
                      </a>
                    </li>
                  ) : null}
                  <li>
                    <a onClick={() => removeCustomer(state?.customerSelected || [])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </a>
                  </li>
                </ul>
              ) : null}
            </>
          }
          title=""
        />
      </div>

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        onClose={() => closeModal('viewCustomerModal')}
      >
        <div>
          <CustomerForm {...{ state, dispatch }} handleClose={() => closeModal('viewCustomerModal')} />
        </div>
      </Modal>
      {state.viewCustomerPreviewModal && state.customerDetail && (
        <Modal
          id={'UserPreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={true}
          onClose={() => closeModal('viewCustomerPreviewModal')}
        >
          <div>
            <CustomerPreview
              customerDetail={state.customerDetail}
              handleEdit={() => editPreviewModal(state.customerDetail)}
              onDelete={() => removeCustomer([state.customerDetail.id])}
            />
          </div>
        </Modal>
      )}
      <ModalCentered
        id={'Customer_edit_columns' + '_modal'}
        title={state?.editCustomerColumnModalTitle}
        show={state.editCustomerColumnsModal}
        onClose={() => closeModal('editCustomerColumnsModal')}
      >
        <div>
          <EditColumns
            {...{
              model: 'customers',
              state,
              dispatch,
              onClose: () => closeModal('editCustomerColumnsModal'),
              onSave: data => saveColumns(data),
            }}
          />
        </div>
      </ModalCentered>
    </>
  );
}

export default Index;
