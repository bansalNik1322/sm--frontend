import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { memo } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { formatDate } from '@/utils/helpers';

interface USER {
  updatedAt: string;
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  createdAt: string;
  phone: string;
}

interface PROPS {
  customerDetail: USER;
  handleEdit: () => void;
  onDelete: () => void;
}

function CustomerPreview(props: PROPS) {
  const { customerDetail } = props;
  const router = useRouter();
  return (
    <>
      <div className="head d-flex justify-content-between align-items-center p24 offcanvas-header">
        <div>
          <h2>{customerDetail.fullname}</h2>
        </div>
        <div>
          <Dropdown className="ActionDropDown">
            <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={event => {
                  event.preventDefault();
                  props.onDelete();
                }}
              >
                <span className="menuIcon">
                  <Image alt="delete" height={16} width={16} src="/assets/images/delete.svg" />
                </span>{' '}
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="mt-3">
        <div>
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
      </div>
      <div className="plr24 canvasFooter">
        {/* <Button className="textBtn" onClick={() => router.push(`/customer/${customerDetail?.id}/detail`)}>
          View record
        </Button>{' '} */}
        <Link className="textBtn viewRecord" href={`/customer/${customerDetail?.id}/detail`}>
          View record
        </Link>{' '}
        <Button className="OutlineBtn" onClick={() => props.handleEdit()}>
          Edit
        </Button>{' '}
      </div>
    </>
  );
}

export default memo(CustomerPreview);
