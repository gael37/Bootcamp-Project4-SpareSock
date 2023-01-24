// React Components
import { Link, useNavigate } from 'react-router-dom'

// Imports
import { isAuthenticated, handleLogout } from '../../helpers/auth'

// Bootstrap Components
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react'
import { getToken, getPayload } from '../../helpers/auth'
import axios from 'axios'

const PageNavBar = () => {

  getToken()
  const currentUserPayload = getPayload()
  const currentUserId = currentUserPayload.sub
  console.log('id', currentUserId)

  const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState(false)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`api/auth/${currentUserId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('user', data)
        setUserData(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getUserData()
  }, [])
  // ! Location Variables
  const navigate = useNavigate()

  return (
    <Navbar expand="sm">
      <Container>
        <Nav className='nav-links'>

          {isAuthenticated() ?
            <>
              <div className='nav-tel'>
                <Nav.Link className='home-link' as={Link} to="/home-user">Search</Nav.Link>
                <Nav.Link as={Link} to="/products/new">Post an ad</Nav.Link>
              </div>
              <div className="brand-tel">
                <NavbarBrand className='navbrand' as={Link} to="/home-user">Spare Sock 🧦</NavbarBrand>
                <p className="catch-sentence">Post ads and find good deals</p>
              </div>
              <div className='nav-user'>
                <div className='nav-user-bottom'>
                  <Nav.Link as={Link} to="/profile">Account</Nav.Link>
                  <span className='nav-link' onClick={() => handleLogout(navigate)}>Logout</span>
                </div>
              </div>
            </>
            :
            <>
              <div className='nav-tel'>
                <Nav.Link className='home-link' as={Link} to="/">Search</Nav.Link>
                <Nav.Link as={Link} to="/login">Post an ad</Nav.Link>
              </div>
              <div id="brand-tel">
                <NavbarBrand className='navbrand' as={Link} to="/">Spare Sock 🧦</NavbarBrand>
                <p className='catch-sentence'>Post ads and find good deals</p>
              </div>
              <div className='nav-user-bottom'>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </div>
            </>
          }
        </Nav>

      </Container>
    </Navbar >
  )
}

export default PageNavBar