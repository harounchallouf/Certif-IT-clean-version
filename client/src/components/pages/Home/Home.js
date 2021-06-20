import { useState } from 'react'
import { motion } from 'framer-motion'
import CoursesService from '../../../service/courses.service'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import './Home.css'
// import CourseCard from './../../shared/CourseCard/Course-card'
import RandomCard from './Random-card'
import Loader from '../../shared/Spinner/Loader'


import Features from './Features'
import Banner from './Banner'

import HeroSection from './HeroSection'
import about from '../../../assets/about.jpg'
import Ft from './Ft'

const Home = props => {
  const coursesService = new CoursesService()

  const [courses, setCourses] = useState(() => {
    coursesService.getRandomCourses()
      .then(response => setCourses(response.data))
      .catch(() => {
        props.history.push('/courses')
        props.handleToast(true, 'Un erreur est survenue, veuillez réessayer plus tard', '#f8d7da')
      })
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroSection />
      <Ft/>
      {/* <section className="container-fluid about" >
        <Container>
          <Row className="d-flex align-items-center">

            <Col md={6}>
              <Image style={{ width: '100%' }} src={about} />
            </Col>
            <Col md={6}>

              <h2 className="mb-3">A propos</h2>
              <p>Certif IT est une plateforme de certification en ligne. Nous aidons les organisations de toutes sortes à se préparer à l'avenir du travail en constante évolution.</p>
              <p>Connecter des millions d'apprenants aux compétences dont ils ont besoin pour réussir. Nous offrons la possibilité d'ouvrir l'accès à la certification, en particulier pour ceux dont les opportunités ont été historiquement limitées.</p>

            </Col>
          </Row>

        </Container>
      </section> */}



      {/* Carousel */}
      <Container>
        <section className="carousel-section mt-5">
          <h2 className="mt-5 mb-5 text-center ">Découvrez une variété de certifications dans le secteur IT</h2>

          {courses ?
            <Carousel className='carousel'>

              <Carousel.Item >
                <Row>
                  {[...courses].slice(0, 4).map(elm =>
                    /* <CourseCard key={elm._id} {...elm} /> */
                    <RandomCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
              <Carousel.Item >
                <Row>
                  {[...courses].slice(4, 8).map(elm =>
                    /* <CourseCard key={elm._id} {...elm} /> */
                    <RandomCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
            </Carousel>
            : <Loader />
          }

        </section>
      </Container>
      <Banner title='Proposez vos propres certificats sur Certif IT'  />

      {/* Features */}
      <Features />

    </motion.div>
  )
}

export default Home