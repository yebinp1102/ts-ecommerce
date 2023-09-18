import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import {Helmet} from 'react-helmet-async'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { register } from "../store/features/UserSlice";
import {toast} from 'react-toastify'
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect= redirectInUrl ? redirectInUrl : '/';

  const { userInfo } = useAppSelector(state => state.user);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // 이미 로그인 한 유저가 접근하지 못하게 함.
  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  },[navigate, userInfo, redirect])

  const handleRegister = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    try{
      const userInfo = {
        name,
        email,
        password: pwd
      }
      const data = await dispatch(register(userInfo));
      if(data) localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect)
    }catch(err){
      toast.warn(getError(err as ApiError));
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1 className="my-3">Register</h1>

      {/* form */}
      <Form onSubmit={handleRegister}>
        
        {/* name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        {/* email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setPwd(e.target.value)} required />
        </Form.Group>

        
        {/* confirm password */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" onChange={(e) => setConfirmPwd(e.target.value)} required />
        </Form.Group>

        {/* Submit button */}
        <div className="mb-3">
          <Button 
            disabled={pwd !== confirmPwd} 
            variant={pwd !== confirmPwd || !pwd || !confirmPwd ? 'secondary' : 'primary'}  
            type="submit"
          >Register
          </Button>
        </div>

        {/* router to login page */}
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/login?redirect=${redirect}`}>Login</Link>
        </div>

      </Form>
    </Container>
  )
}

export default RegisterPage