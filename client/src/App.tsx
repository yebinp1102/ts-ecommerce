import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='d-flex flex-column vh-100'>

      <header>
        <Navbar bg='dark' variant='dark' expand="lg">
          <Container>
            <Navbar.Brand>E-Commerce</Navbar.Brand>
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
