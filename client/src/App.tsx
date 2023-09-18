import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { Store } from './context/store';
import { useAppDispatch, useAppSelector } from './store/store';
import { logout } from './store/features/UserSlice';

function App() {
  const {state: {mode, cart} , dispatch} = useContext(Store);
  const {userInfo } = useAppSelector(state => state.user)
  const reduxDispatch = useAppDispatch();

  useEffect(()=>{
    document.body.setAttribute('data-bs-theme', mode);
  },[mode])

  const handleSwitchMode = () => {
    dispatch({type: 'SWITCH_MODE'});
  }

  const handleLogout = () => {
    reduxDispatch(logout());
    window.location.href = '/login'
  }

  return (
    <div className='d-flex flex-column vh-100'>

      <header>
        <Navbar expand="lg">
          <Container>
            <Link to='/'>
              <Navbar.Brand>E-Commerce</Navbar.Brand>
            </Link>
            <Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                 <Badge pill bg="danger">
                   {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                 </Badge>
               )}  
              </Link>

              {/* <a href="/login" className='nav-link'>login</a> */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <Link className='dropdown-item' to="#signout" onClick={handleLogout}>Logout</Link>
                </NavDropdown>
              ): (
                <Link className='nav-link' to="/login">Login</Link>
              )}
                
              <Button variant={mode} onClick={handleSwitchMode}>
                <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'} />
              </Button>
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
