'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Dropdown } from 'react-bootstrap';

import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { deleteDialog, formatDate, toastr } from '@/utils/helpers';

type PROPS = {
  customerDetail: any;
};

function LeftPanel(props: PROPS) {
  const { customerDetail } = props;
  const router = useRouter();
  const { request } = useRequest();
  const removeCustomer = async (id: string | string[]) => {
    const confirm = await deleteDialog('Are you sure you want to delete this customer? This action cannot be undone.');
    if (confirm) {
      const res = (await request('removeCustomerFromList', { id: id })) as REQUEST;
      if (res?.message) {
        toastr('The user has been successfully removed.', 'success', 'User removed');
        router.push('/customer');
      }
    }
  };
  return (
    <div className="leftPannel">
      {/* <div className="BackTop">
        <div>
          <span role="button" onClick={() => router.back()}>
            <Image alt="LeftPanle" height={15} width={15} src="/assets/images/chevron-left.svg" /> Back
          </span>
        </div>
      </div> */}
      <div className="DtlleftTop">
        <div>
          <Image alt="chevronIcon" src="/assets/images/chevron-left.svg" height={20} width={20} /> Contacts
        </div>
        <div>
          {' '}
          <Dropdown className="ActionDropDown">
            <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={event => {
                  event.preventDefault();
                  removeCustomer([customerDetail.id]);
                }}
              >
                <span className="menuIcon">
                  <Image alt="deleteIcon" src="/assets/images/delete.svg" height={16} width={16} />
                </span>{' '}
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="customerAvatar">
        <div className="avatarImg">
          <span>
            {customerDetail.firstname?.slice(0, 1)}
            {customerDetail.lastname?.slice(0, 1)}
          </span>
        </div>
        <div>
          <h2>
            {customerDetail.fullname} <span>{customerDetail.email}</span>
          </h2>
        </div>
      </div>

      <div className="customerInfo">
        <ul>
          <li>
            <span>Email</span>
            <p>{customerDetail.email}</p>
          </li>
          <li>
            <span>Mobile</span>
            <p>{customerDetail.phone}</p>
          </li>
          <li>
            <span>Date Added</span>
            <p>{formatDate(customerDetail.createdAt ?? '')}</p>
          </li>
          <li>
            <span>Last Updated</span>
            <p>{formatDate(customerDetail.updatedAt ?? '')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftPanel;
