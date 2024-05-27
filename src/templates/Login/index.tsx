'use client';
import useLoginModel from './model';
import LoginView from './view';

export default function Login() {
  const loginModel = useLoginModel();

  return <LoginView {...loginModel} />;
}
