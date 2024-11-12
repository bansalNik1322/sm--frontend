'use client';

import { Formik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { SuspenseLoader } from '@/components/App/Loader';
import {
  AuthContainer,
  AuthPage,
  Divider,
  InputField,
  NoAccount,
  SocialMediaButton,
  SocialMediaLogin,
  SubmitButton,
} from '@/styles/Auth/auth.style';
import { KEYPAIR, REQUEST } from '@/types/interfaces';
import { validateAuthentication } from '@/utils/helpers';

const initialValues = {
  email: '',
  password: '',
  username: '',
};

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(100, 'Too Long!').required('Required'),
});

function Index() {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const [viewPassword, setviewPassword] = useState(false);

  const validateToken = useCallback(() => {
    if (validateAuthentication()) {
      if (Cookies.get('rememberme') === '1') return router.push('/settings/accounts');
    }
  }, [router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleSubmit = async (values: KEYPAIR) => {
    console.log(values);
    const req = (await request('LoginUser', values)) as REQUEST;
    console.log(req);
    if (req?.data) {
      if (values.rememberme) Cookies.set('rememberme', '1');
      return router.push('/settings/accounts');
    }
  };
  if (validateAuthentication()) {
    if (Cookies.get('rememberme') === '1') return <SuspenseLoader />;
  }

  return (
    <AuthPage>
      <AuthContainer>
        <SocialMediaLogin className="social-media-login">
          <SocialMediaButton className="social-media-button">
            <span className="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="MuiBox-root css-0 iconify iconify--logos"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
            </span>{' '}
            &nbsp;Signup With Google
          </SocialMediaButton>
          <SocialMediaButton className="social-media-button">
            <i className="fab fa-apple"></i> &nbsp; Signup With Apple
          </SocialMediaButton>
        </SocialMediaLogin>

        <Divider className="divider">
          <span>or Signup with</span>
        </Divider>

        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <InputField
                      type="email"
                      name="email"
                      placeholder="Your email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && touched.email ? (
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <InputField
                      type="text"
                      name="username"
                      placeholder="Your username"
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    {errors.username && touched.username ? (
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <InputField
                        type={viewPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Your password"
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <SubmitButton type="submit" className="customBtn">
                  {loading?.LoginUser_LOADING ? ButtonLoader() : 'Submit'}
                </SubmitButton>
              </Row>
            </Form>
          )}
        </Formik>
        <NoAccount>
          Already have an Account? <Link href="/login">Login</Link>
        </NoAccount>
      </AuthContainer>
    </AuthPage>
    // <div className="loginpage">
    //   {/* <div className="logo">
    //           {getGlobalSettings()?.logo ? (
    //             <Image height={41} width={10} alt="logo" src={getGlobalSettings()?.logo} />
    //           ) : null}
    //         </div> */}
    //   <div className="login-container">
    //     <h2>Sign Up</h2>

    //

    //
    //   </div>
    // </div>
  );
}

export default Index;
