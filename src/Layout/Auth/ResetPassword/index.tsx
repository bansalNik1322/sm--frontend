'use client';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import * as Yup from 'yup';

import { useLoading, useRequest, useSettings } from '@/components/App';
import { AuthContainer, AuthPage, InputField, NoAccount, SubmitButton } from '@/styles/Auth/auth.style';
import { REQUEST } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
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
      then: Yup.string().required('Required'),
    }),
});

function Index() {
  const router = useRouter();
  const settings = useSettings();
  const searchParams = useSearchParams();
  const [viewPasswords, setViewPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const token = searchParams.get('token');

  // useEffect(() => {
  //   if (!token) {
  //     router.push('/login');
  //   }
  // });

  return (
    <AuthPage>
      <AuthContainer>
        <div className="text-center">
          <h2>Set your new password</h2>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={{
            password: '',
            confirmPassword: '',
            token: '',
          }}
          validationSchema={ResetSchema}
          onSubmit={async values => {
            values.token = (token as string) || '';
            const req = (await request('resetPassword', {
              token: values.token,
              password: values.password,
            })) as REQUEST;
            if (req) {
              toastr('Password successfully set', 'success');
              router.push('/login');
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <InputGroup className="mb-3">
                      <InputField
                        type={viewPasswords?.password ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={values.password}
                        isInvalid={!!errors.password}
                      />
                      {errors.password && (
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      )}
                    </InputGroup>
                    <Form.Text style={{ color: 'white' }}>
                      The password should contain at least 6 characters and include at least one uppercase letter, one
                      lowercase letter, and one number
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <InputGroup className="mb-3">
                      <InputField
                        type={viewPasswords?.confirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        isInvalid={!!errors.confirmPassword}
                      />

                      {errors.confirmPassword && (
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <SubmitButton type="submit">
                    {loading?.resetPassword_LOADING ? ButtonLoader() : 'Submit'}
                  </SubmitButton>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          )}
        </Formik>

        <NoAccount>
          Cancel and Return to
          <Link href="/login"> Login</Link>
        </NoAccount>
      </AuthContainer>
    </AuthPage>
  );
}

export default Index;
