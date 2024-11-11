import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// import styles from '@/styles/Components/Modal/Modal.module.scss';
import { useLoading, useRequest } from '@/components/App';

interface PROPS {
  id: string;
  show: boolean;
  width?: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  outer?: boolean;
}

function Index(props: PROPS) {
  const hideModal = () => {
    if (props?.onClose) props.onClose();
  };
  const { loading } = useRequest();
  // console.log(loading);
  const { ButtonLoader } = useLoading();
  return (
    <div>
      <Modal id={props.id} show={props?.show} onHide={hideModal} backdrop="static" keyboard={false} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        {/* <Modal.Footer>
          <Button className="OutlineBtn" onClick={hideModal}>
            Cancel
          </Button>
          <Button className="customBtn" onClick={props?.onSave}>
            {loading?.saveColumns_LOADING ? ButtonLoader() : 'Save'}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Index;
