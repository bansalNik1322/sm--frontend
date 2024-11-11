import Image from 'next/image';
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
  userDetail: USER;
  handleEdit: () => void;
  onDelete: () => void;
}

function UserPreview(props: PROPS) {
  const { userDetail } = props;
  const router = useRouter();
  return (
    <>
      <div className="head d-flex justify-content-between align-items-center p24 offcanvas-header">
        <div>
          <h2>{userDetail.fullname}</h2>
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
                {userDetail.firstname?.slice(0, 1)}
                {userDetail.lastname?.slice(0, 1)}
              </span>
            </div>
            <div>
              <h2>
                {userDetail.fullname} <span>{userDetail.email}</span>
              </h2>
            </div>
          </div>

          <div className="customerInfo">
            <ul>
              <li>
                <span>Email</span>
                <p>{userDetail.email}</p>
              </li>
              <li>
                <span>Mobile</span>
                <p>{userDetail.phone}</p>
              </li>
              <li>
                <span>Date Added</span>
                <p>{formatDate(userDetail.createdAt ?? '')}</p>
              </li>
              <li>
                <span>Last Updated</span>
                <p>{formatDate(userDetail.updatedAt ?? '')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="plr24 canvasFooter">
        <Button className="OutlineBtn" onClick={() => props.handleEdit()}>
          Edit
        </Button>{' '}
      </div>
    </>
  );
}

export default memo(UserPreview);
