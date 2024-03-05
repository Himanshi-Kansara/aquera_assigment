import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <Navbar expand="lg" className='my-2' >
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt='Star War Planet' style={{height: '8rem'}}></img>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar