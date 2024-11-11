import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import OffCanvasFooter from '../../../components/Default/Modal/Components/OffCanvasFooter';

function EditVehicle() {
  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="head">
            {' '}
            <h2> Edit vehicle</h2>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="mt-2">
        <div className="canvasData ">
          <div className="details border-0">
            <Form.Group>
              <Form.Label>License plate number</Form.Label>
              <Form.Control type="text" placeholder="First name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Greenslip duration</Form.Label>
              <Form.Control as="select" className="form-select">
                <option>Select duration</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Greenslip expiry date</Form.Label>
              <Form.Control as="select" className="form-select">
                <option>Select duration</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <div className="reminder">Reminder will be sent: 08-06-2024</div>
            <div className="mt-2">
              <Button className="textBtn">
                {' '}
                <Image alt="greenPlus" height={20} width={20} src="/assets/images/greenPlus.svg" /> Add another vehicle
              </Button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
      {/* <OffCanvasFooter /> */}
    </>
  );
}

export default memo(EditVehicle);
