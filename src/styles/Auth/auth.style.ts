// LoginPageStyles.ts
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const AuthPage = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-color: #081028;
`;

export const AuthContainer = styled.div`
  background-color: #0b1739;
  width: 40%;
  margin: 100px auto;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

export const SocialMediaLogin = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 20px 0;
`;

export const SocialMediaButton = styled.button`
  background-color: #0a1330;
  color: white;
  min-width: 230px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  padding: 10px;
`;

export const Divider = styled.div`
  display: flex;
  color: #aeb9cb;
  align-items: center;
  margin: 20px 0;

  span {
    margin: 0 5px;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #3a3b5a;
  }
`;

export const InputField = styled(Form.Control)`
  background-color: inherit;
  outline: none;
  border: 1px solid #2e3445;
  color: #aeb9cb;
  width: 100%;
  padding: 10px;

  &:focus {
    border: 1px solid #2e3445;
    color: #aeb9cb;
    background-color: inherit;
  }

  &::placeholder {
    color: #aeb9cb;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(128.49deg, rgb(203, 60, 255) 19.86%, rgb(127, 37, 251) 68.34%);
  width: 94%;
  margin: auto;
  border: none;
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 10px 24px;
  outline: none;
  height: 44px;
  line-height: 44px;
  border-radius: 2px;
  color: #fff;
  padding: 0 20px;
  text-align: center;
  box-shadow: none;
  display: inline-block;
  text-transform: uppercase;
`;

export const NoAccount = styled.div`
  color: #aeb9cb;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;

  a {
    color: #bf2fcc !important;
  }
`;

export const ForgotLink = styled.div`
  a {
    color: #bf2fcc !important;
  }

  color: #bf2fcc !important;
`;
