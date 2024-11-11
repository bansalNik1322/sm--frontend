'use client';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import Checkbox from '@/components/Default/Checkbox';
import Modal from '@/components/Default/Modal';
import ModalCentered from '@/components/Default/Modal/Centered';
import DefaultTable from '@/components/Default/Table';
import EditColumns, { COLUMN } from '@/Layout/Container/Components/EditColumns';
import { useContainerContext } from '@/Layout/Container/context';
import UserPreview from '@/Layout/Settings/Users/Components/UserPreview';
import { REQUEST } from '@/types/interfaces';
import { confirmDialog, deleteDialog, toastr } from '@/utils/helpers';

import UserForm from './Components/UserForm';
import UserHeader from './Components/UserHeader';

interface USER {
  lastLogin: string;
  id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  status: boolean;
  email: string;
  phone: string;
  role: string;
  action: JSX.Element;
}

function Index() {
  const { request, loading } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { state, dispatch } = useCommonReducer({
    columns: {
      view: [],
      selected: [],
    },
    userSelected: [],
  });

  const removeUser = async (id: string | string[]) => {
    if (!id?.length) return;
    const confirm = await deleteDialog('Are you sure you want to delete the user/users?', 'Delete');
    if (confirm) {
      const res = (await request('removeUserFromList', { id: id })) as REQUEST;
      if (res)
        toastr(
          `The ${id?.length > 1 ? 'users' : 'user'}  has been successfully removed.`,
          'success',
          `${id?.length > 1 ? 'Users' : 'User'} removed`,
        );
      dispatch({ userSelected: [], userDetail: {}, multirecordSelected: false, viewUserPreviewModal: false });
    }
  };
  const openUserModal = () => {
    dispatch({ viewCustomerModal: true, edit: false, CustomerModalTitle: 'Add new user', userDetail: null });
  };

  const openEditUserModal = (data: USER) => {
    dispatch({ viewCustomerModal: true, edit: true, CustomerModalTitle: `Edit ${data.fullname}`, userDetail: data });
  };

  const closeModal = (key: string) => {
    dispatch({ [key]: false, userDetail: null, userSelected: [], columns: state?.columns, CustomerModalTitle: '' });
  };

  const editUserColumnsModal = () => {
    dispatch({ editUserColumnsModal: true, editUserColumnModalTitle: 'Edit Columns' });
  };

  const openPreviewUserModal = (data: USER) => {
    dispatch({ viewUserPreviewModal: true, userDetail: data });
  };

  const editPreviewModal = (data: USER) => {
    dispatch({
      viewUserPreviewModal: false,
      viewCustomerModal: true,
      edit: true,
      userDetail: data,
      CustomerModalTitle: `Edit ${data.fullname}`,
    });
  };

  /** Multi Record Select */

  const selectMultiRecords = useCallback(
    (event: React.ChangeEvent<HTMLElement>) => {
      const { checked } = event.target as HTMLInputElement;
      dispatch({ multirecordSelected: checked });
      if (globalState?.getUsersList?.result) {
        globalState?.getUsersList?.result.map((usr: USER) => {
          addToUsersSelected(usr, event);
        });
      }
    },
    [state.multirecordSelected, globalState?.getUsersList?.result],
  );

  const addToUsersSelected = useCallback(
    (user: USER, event: React.ChangeEvent<HTMLElement>) => {
      const { checked } = event.target as HTMLInputElement;
      const selectedusers = state.userSelected;
      console.log(selectedusers);
      if (!selectedusers) return;
      if (!selectedusers.includes(user.id)) selectedusers.push(user?.id);
      if (!checked) {
        const index = selectedusers.findIndex((item: string) => item === user.id);
        if (index > -1) {
          selectedusers.splice(index, 1);
        }
        dispatch({ multirecordSelected: checked });
      }

      dispatch({
        userSelected: [...selectedusers],
        userDetail: user,
      });
    },
    [state.userSelected],
  );
  /** End Multi Record Select */
  const getUsersList = useMemo(
    () =>
      globalState?.getUsersList?.result
        ? globalState?.getUsersList?.result.map((usr: USER) => ({
            check: (
              <Checkbox
                checked={state?.userSelected?.includes(usr.id)}
                name={'users ' + usr.id}
                onChange={event => addToUsersSelected(usr, event)}
              />
            ),
            fullname: (
              <div className="usr-preview">
                <span>{usr.fullname}</span>
                <button onClick={() => openPreviewUserModal(usr)}>Preview</button>
              </div>
            ),
            firstname: usr.firstname,
            lastname: usr.lastname,
            lastLogin: usr.lastLogin,
            status: usr.status ? 'Active' : 'Inactive',
            email: usr.email,
            role: usr.role,
            phone: usr.phone,
            action: (
              <>
                <Dropdown className="actionDropDown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="menu" height={20} width={20} src="/assets/images/menu.svg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditUserModal(usr)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeUser([usr.id])}>
                      <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ),
          }))
        : [],
    [globalState?.getUsersList?.result, state?.userSelected],
  );

  const getColumns = useCallback(async () => {
    const req = (await request('getColumns', { model: 'Users' })) as REQUEST;
    if (req) {
      dispatch({
        columns: req.columnViews,
      });
    }
  }, []);

  useEffect(() => {
    getColumns();
  }, [getColumns]);

  /** Column View */
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
          <Button className="OutlineBtn SmBtn" onClick={() => editUserColumnsModal()}>
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
                <Button className="OutlineBtn SmBtn" onClick={() => editUserColumnsModal()}>
                  {' '}
                  Edit columns
                </Button>
              </>
            ),
          },
        ];
  }, [
    globalState?.getUsersList?.result,
    state?.columns?.selected?.length,
    loading?.editColumns_LOADING,
    state.multirecordSelected,
  ]);

  const saveColumns = async (data: { selected: COLUMN[]; view: COLUMN[] }) => {
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      const req = (await request('editColumns', {
        moduleName: 'Users',
        columnViews: data,
      })) as REQUEST;
      if (req) {
        dispatch({ editUserColumnsModal: false, columns: req?.columnViews });
      }
    }
  };
  /** Loading */
  const isLoading = useMemo(
    () => loading?.removeUserFromList_LOADING || state?.isEditLoading || state?.removeUserFromList,
    [loading, state?.isEditLoading, state?.removeUserFromList],
  );

  return (
    <>
      <UserHeader
        {...{
          title: 'Users',
          totalRecords: globalState?.getUsersList?.total,
          handleOpen: openUserModal,
        }}
      />
      <DefaultTable
        api={{
          url: 'getUsersList',
        }}
        search={false}
        columns={columns}
        data={getUsersList}
        loading={Boolean(isLoading)}
        dataShowModal={
          <>
            {state?.userSelected?.length > 0 ? (
              <ul>
                {state?.userSelected?.length == 1 ? (
                  <li>
                    <a onClick={() => openEditUserModal(state?.userDetail)}>
                      <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit
                    </a>
                  </li>
                ) : null}
                <li>
                  <a onClick={() => removeUser(state?.userSelected || [])}>
                    <Image alt="deleteIcon" height={16} width={16} src="/assets/images/delete.svg" /> Delete
                  </a>
                </li>
              </ul>
            ) : null}
          </>
        }
        title=""
      />

      <Modal
        id={'Customer' + '_modal'}
        title={state?.CustomerModalTitle}
        show={state.viewCustomerModal}
        onClose={() => closeModal('viewCustomerModal')}
      >
        <div>
          <UserForm {...{ state, dispatch }} handleClose={() => closeModal('viewCustomerModal')} />
        </div>
      </Modal>
      {state.viewUserPreviewModal && state.userDetail && (
        <Modal
          id={'UserPreview' + '_modal'}
          title={state?.CustomerModalTitle}
          show={true}
          onClose={() => closeModal('viewUserPreviewModal')}
        >
          <div>
            <UserPreview
              userDetail={state.userDetail}
              handleEdit={() => editPreviewModal(state.userDetail)}
              onDelete={() => removeUser([state.userDetail.id])}
            />
          </div>
        </Modal>
      )}

      <ModalCentered
        id={'Customer_edit_columns' + '_modal'}
        title={state?.editUserColumnModalTitle}
        show={state.editUserColumnsModal}
        onClose={() => closeModal('editUserColumnsModal')}
      >
        <div>
          <EditColumns
            {...{
              model: 'Users',
              state,
              dispatch,
              onClose: () => closeModal('editUserColumnsModal'),
              onSave: data => saveColumns(data),
            }}
          />
        </div>
      </ModalCentered>
    </>
  );
}

export default memo(Index);
