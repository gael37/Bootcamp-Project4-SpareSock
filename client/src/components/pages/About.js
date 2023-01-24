import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const About = () => {
  return (
    <div className='about-us-flex-container'>
      <h3>Creator:</h3>
      <div className='about-us-flex'>
        <p id="gael-links">Gael Duchesne</p>
        <a href="https://github.com/gael37" target="blank"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/gael-duchesne-285858256/" target="blank"><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <hr></hr>
    </div>
  )
}

export default About