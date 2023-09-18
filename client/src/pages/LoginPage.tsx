import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store";
import {toast} from 'react-toastify'
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { login } from "../store/features/UserSlice";
import { Button, Container, Form } from "react-bootstrap";
import {Helmet} from 'react-helmet-async'
import LoadingBox from "../components/LoadingBox";

const LoginPage = () => {
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const {loading, userInfo} = useAppSelector(state => state.user);

  const handleLogin = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    try{
      const userInfo = {email, password}
      const data = await dispatch(login(userInfo));
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data.payload));
    }catch(err){
      toast.error(getError(err as ApiError))
    }
  }

  // 유저가 로그인 한 상태이면 login 페이지에 접근 못하도록.
  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  },[navigate, redirect, userInfo])

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={loading} type="submit">
            Sign In
          </Button>
          {loading && <LoadingBox />}
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}

export default LoginPage