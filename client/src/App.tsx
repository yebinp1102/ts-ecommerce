import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { Store } from './context/store';

function App() {
  const {state: {mode} , dispatch} = useContext(Store);

  useEffect(()=>{
    document.body.setAttribute('data-bs-theme', mode);
  },[mode])

  const handleSwitchMode = () => {
    dispatch({type: 'SWITCH_MODE'});
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
              <a href="/cart" className='nav-link'>Cart</a>
              <a href="/signIn" className='nav-link'>Sign In</a>
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
