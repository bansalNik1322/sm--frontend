'use client';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useLoading, useRequest, useSettings } from '@/components/App';
import { AuthContainer, AuthPage, InputField, NoAccount, SubmitButton } from '@/styles/Auth/auth.style';
import { REQUEST } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
});

const Index = () => {
  const router = useRouter();
  const settings = useSettings();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  return (
    <AuthPage>
      <AuthContainer>
        <h4>
          Forgot password <i className="fas fa-lock"></i>
        </h4>

        <Formik
          enableReinitialize={true}
          initialValues={{
            email: '',
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async values => {
            const payload = {
              // email: encodeURIComponent(values.email),
              email: values.email,
            };
            const res = (await request('forgotPassword', payload)) as REQUEST;
            if (res) {
              toastr(res?.message as string, 'success', 'Forgot Password');
              router.push('/login');
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <InputField
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  isInvalid={!!errors.email}
                  type="email"
                  placeholder="Your email or username"
                />
                {errors.email ? <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> : null}
              </Form.Group>
              <SubmitButton type="submit">
                {loading?.forgotPassword_LOADING ? ButtonLoader() : 'verify email'}
              </SubmitButton>
            </Form>
          )}
        </Formik>
        <NoAccount>
          <p>
            Login using Password
            <Link href="/login"> Login</Link>
          </p>
        </NoAccount>
      </AuthContainer>
    </AuthPage>
    // <div className="loginpage">
    //   {/* <div className="text-center">
    //     {settings?.logo ? <Image alt="logo" height={41} width={132} src="/assets/images/logo.png" /> : null}
    //   </div> */}
    //   <div className="login-container forgot-container">
    //
    //   </div>
    // </div>
  );
};

export default Index;
