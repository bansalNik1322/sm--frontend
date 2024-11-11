'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

import styles from '@/styles/Components/Container/SubHeader.module.scss';

function CustomerHeader(props: { title: string; totalRecords: number; handleOpen: () => void }) {
  return (
    <>
      <div className={styles.SubHeadMain}>
        <div className="container-fluid">
          <div className={styles.SubHead}>
            <div className={styles.CustomerCount}>
              {props.title} <span> {props.totalRecords} records</span>
            </div>
            <div>
              <Button className="OutlineBtn SmBtn">
                <Image alt="download" height={16} width={16} src="/assets/images/download.svg" /> Export
              </Button>{' '}
              <Button className="customBtn SmBtn" onClick={() => props.handleOpen()}>
                <Image alt="add" height={16} width={16} src="/assets/images/add.svg" /> Add a new customer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
        <CreateNewCustomer/> 
         <CustomerPreview/> 
         <EditVehicle/> 
         <AddNewVehicle
      </Offcanvas> */}
    </>
  );
}

export default memo(CustomerHeader);
