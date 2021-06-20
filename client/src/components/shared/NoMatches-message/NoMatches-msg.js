import { Col } from 'react-bootstrap'
import './NoMatches-msg.css'

const NoMatchesMsg = () => {
  return (
    <Col md={{ span: 10, offset: 1}}>
      <h2 className='noMatch-msg' >Il n'y a aucune correspondance, réessayez</h2>
    </Col>
  )
}

export default NoMatchesMsg