import { Row, Col, Container } from "react-bootstrap";
import FeaturesCard from "./FeaturesCard";

const Features = () => {
  return (
    <section className="features text-center">
      <Container>
        <Row className="d-flex align-items-center">
          <Col lg={12} md={12} style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 className="mb-3">Ne perdez pas votre temps précieux</h2>
            <p>
              Seul Certif IT possède tous les facteurs critiques pour fournir de
              vrais résultats.
            </p>
            <p>
              Notre collection organisée de certificats de premier ordre offre
              aux entreprises, aux gouvernements, et les organisations à but non
              lucratif le pouvoir de développer une expertise interne et de
              satisfaire la soif d'apprentissage des employés et développement.
            </p>
            {/* <p className="mb-5">Empower your remote workforce to learn what they need, when they need it. Online learning from global experts across tech, business, wellness and more to help your employees do whatever comes next.</p> */}
          </Col>
          <Row >
            <Col lg={3} md={4}>
              <FeaturesCard
                imgSrc="//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6pk4riNMII7w6COla8glF4/8c8655c3e7f185537eec5ee9ed118e83/EmployeableSkills__1_.svg"
                alt="Compétences employables"
                title="Obtenez de vraies compétences employables"
                text="Our curriculum is designed with top-tier industry partners, so you learn the high-impact skills that top companies want."
              />
            </Col>
            <Col lg={3} md={4}>
            <FeaturesCard
              imgSrc="//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6oOXJEvILWWE2x4mUiRnwH/fc4d17a755c4e78b11bb24775458fcc2/ActiveLearning__1_.svg"
              alt="ActiveLearning icon"
              title="Project-based learning"
              text="Learn by doing with real-world projects and other hands-on exercises that lead to real skills mastery."
            />
            </Col>
            <Col lg={3} md={4}>
            <FeaturesCard
              imgSrc="//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/1lUt0ObnFgoXsVtDTRaiIB/ba0d0f3d6e84f6f0740234ccb474ed28/Schedule__1_.svg"
              alt="Schedule icon"
              title="Learn on your schedule"
              text="Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week."
              />
            </Col>
            <Col lg={3} md={4}>
            <FeaturesCard
              imgSrc="//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/7mYegAlCmb6Zmh4fvWlAxK/e036c865aff3c5b1f9f816d08ab2a545/HelpYouNeed__1_.svg"
              alt="Help you need icon"
              title="The help you need"
              text="Reach out to our mentors 24/7 and have your coding questions answered quickly so you can keep learning."
              />
              </Col>
          </Row>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
