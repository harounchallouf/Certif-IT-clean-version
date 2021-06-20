import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Banner = ({ title}) => {
  return (
    <section className="banner text-center mt-5 container-fluid">
      <Container>
        <Row>
          <Col style={{marginTop: '5%'}}>
            <h2>{title}</h2>
            <p>Partagez sans engagement, votre expertise et vos connaissances sur notre plateforme. <br/> Nous mettons à votre disposition tous les outils nécessaires pour prendre soin de vos apprenants.</p>
            <Link className="btn btn-dark btn-lg mt-3" to="/signup" style={{background: 'linear-gradient(to right, #3a7bd5, #3a6073)', border: 'transparent'}}>Devenir instructeur</Link>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner