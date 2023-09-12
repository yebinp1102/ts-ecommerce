import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useAppDispatch } from './store/store'
import { useEffect } from 'react';
import { fetchProducts } from './store/features/ProductSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchProducts());
  },[])

  return (
    <div className='d-flex flex-column vh-100'>

      <header>
        <Navbar bg='dark' variant='dark' expand="lg">
          <Container>
            <Link to='/'>
              <Navbar.Brand>E-Commerce</Navbar.Brand>
            </Link>
            <Nav>
              <a href="/cart" className='nav-link'>Cart</a>
              <a href="/signIn" className='nav-link'>Sign In</a>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>
          All right reserved.
        </div>
      </footer>

    </div>
  )
}

export default App
