'use client';

import { Formik } from 'formik';
import Image from 'next/image';
import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR, REQUEST } from '@/types/interfaces';
import { confirmDialog, toastr } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  firstname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Please provide your first name.'),
  lastname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Please provide your last name.'),
  email: Yup.string().trim().email('Invalid email').required('Please provide your email.'),
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Please enter valid phone number.')
    .required('Please provide your phone number.'),
  status: Yup.string().required('Please provide your status.'),
});

interface PROPS {
  state: {
    customerDetail?: KEYPAIR;
    edit?: string;
  };
  dispatch: React.Dispatch<KEYPAIR>;
  handleClose: () => void;
}

function CustomerForm(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state, dispatch } = props;

  const handleSubmit = async (values: KEYPAIR) => {
    dispatch({ isEditLoading: true });
    const confirm = await confirmDialog('Are you sure you want to save these changes?', 'Save changes');
    if (confirm) {
      values.status = values?.status === 'Active' ? true : false;
      const req = !state.edit
        ? ((await request('createCustomer', values)) as REQUEST)
        : ((await request('updateCustomer', { ...values, id: state?.customerDetail?.id })) as REQUEST);
      if (req) {
        toastr(
          'The customer has been successfully saved.',
          'success',
          !state.edit ? 'New Customer created' : 'Customer updated',
        );
        dispatch({ isEditLoading: false, customerSelected: [] });
        return props.handleClose();
      }
    }
  };

  return (
    <div className="canvasData">
      <h3> Customer details</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstname: (state?.customerDetail?.firstname || '') as string,
          lastname: (state?.customerDetail?.lastname || '') as string,
          email: (state?.customerDetail?.email || '') as string,
          phone: (state?.customerDetail?.phone || '') as string,
          countryCode: '+61',
          status: (state?.customerDetail?.status
            ? 'Active'
            : state?.customerDetail?.status === false
            ? 'Inactive'
            : 'Active') as string,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={FormikSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="firstname"
                    name="firstname"
                    placeholder="First name"
                    onChange={handleChange}
                    value={values.firstname}
                    isInvalid={!!errors.firstname}
                  />
                  {errors.firstname && touched.firstname ? (
                    <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="lastname"
                    name="lastname"
                    placeholder="Last name"
                    onChange={handleChange}
                    value={values.lastname}
                    isInvalid={!!errors.lastname}
                  />
                  {errors.lastname && touched.lastname ? (
                    <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    onChange={handleChange}
                    value={values.email}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && touched.email ? (
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>Phone number</Form.Label>
                  <div className="customerPhone">
                    <div className="countryFlag">
                      <img src="/assets/images/Flag.svg" />{' '}
                      <Image alt="chevronIcon" height={20} width={20} src="/assets/images/chevron-down.svg" />
                    </div>
                    <div className="phoneInput">
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={values.phone}
                        isInvalid={!!errors.phone}
                      />
                    </div>
                  </div>
                  {errors.phone ? <Form.Text className="text-danger">{errors.phone}</Form.Text> : null}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={values.status}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select status type</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                  {errors.status && touched.status ? (
                    <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <div className="plr24 canvasFooter">
                  <Button className="OutlineBtn fs12" onClick={props.handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="customBtn fs12">
                    {loading?.updateUser_LOADING ? ButtonLoader() : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default memo(CustomerForm);
