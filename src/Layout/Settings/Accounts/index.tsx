'use client';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { memo, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { KEYPAIR, REQUEST } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

export interface USER {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface PROPS {
  profileDetail: USER;
}

const FormikSchema = Yup.object().shape({
  firstname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Please provide your first name.'),
  lastname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Please provide your last name.'),
  email: Yup.string().email('Invalid email').required('Please provide your email.'),
  password: Yup.string()
    .required('Please provide your password.')
    .trim()
    .matches(/\w*[a-z]\w*/, 'Password must have a lower case letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have an uppercase letter')
    .matches(/\d/, 'Password must have a number')
    .matches(/^\S*$/, 'White Spaces are not allowed')
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .max(128, ({ max }) => `Password must not be greator than ${max} characters`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .when('password', {
      is: (password: string) => password && password.length !== 0,
      then: Yup.string().required('Please provide your confirm password.'),
    }),
});

function Index(props: PROPS) {
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { profileDetail } = props;
  const [viewPassword, setviewPassword] = useState(false);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div>
        <h3 className="settings-heading">Accounts</h3>
      </div>
      <div className="WhtBox mt10 p30">
        <div className="settingInner">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstname: profileDetail?.firstname,
              lastname: profileDetail?.lastname,
              email: profileDetail?.email,
              password: '',
              confirmPassword: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={FormikSchema}
            onSubmit={async (values: KEYPAIR, { resetForm }) => {
              const req = (await request('updateUserAccount', {
                id: profileDetail.id,
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
              })) as REQUEST;
              if (req) {
                toastr('The user has been successfully saved.', 'success');
                resetForm();
                router.refresh();
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, resetForm }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstname"
                    name="firstname"
                    placeholder="First name"
                    onChange={handleChange}
                    value={values.firstname as string}
                    isInvalid={!!errors.firstname}
                  />
                  {errors.firstname ? (
                    <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastname"
                    name="lastname"
                    placeholder="Last name"
                    onChange={handleChange}
                    value={values.lastname as string}
                    isInvalid={!!errors.lastname}
                  />
                  {errors.lastname ? (
                    <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    readOnly
                    disabled
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    defaultValue={profileDetail?.email as string}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      autoComplete="new-password"
                      type={viewPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <InputGroup.Text onClick={() => setviewPassword(!viewPassword)} role="button">
                      <i className={`fa fa-eye ${viewPassword ? 'text-success' : ''}`}></i>
                    </InputGroup.Text>
                    <Form.Text>
                      The password should contain at least 6 characters and include at least one uppercase letter, one
                      lowercase letter, and one number
                    </Form.Text>
                    {errors.password ? (
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={viewConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <InputGroup.Text onClick={() => setviewConfirmPassword(!viewConfirmPassword)} role="button">
                      <i className={`fa fa-eye ${viewConfirmPassword ? 'text-success' : ''}`}></i>
                    </InputGroup.Text>
                    {errors.confirmPassword ? (
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <div className="settingFooter">
                  <Button
                    type="reset"
                    className="OutlineBtn mr10 "
                    onClick={() => {
                      resetForm();
                      router.refresh();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="customBtn ">
                    {loading?.updateUserAccount_LOADING ? ButtonLoader() : 'Save'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default memo(Index);
