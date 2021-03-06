import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../../shared/PageAnimation/PageAnimation'
import CoursesService from './../../../service/courses.service'
import FilesService from './../../../service/upload.service'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Loader from './../../shared/Spinner/Loader'
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import Examform from './Exam-form'
import EditQuiz from './EditQuiz'
import './New-Course-form.css'


class EditCourseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            examName: null,
            course: {
                title: '',
                lead: '',
                description: '',
                category: '',
                difficultyLevel: '',
                whatYouWillLearn: [],
                price: '',
                duration: '',
                requirements: [],
                videos: [],
                imageUrl: '',
                owner: this.props.teacherInfo ? this.props.teacherInfo._id : '',
                quizId: null
            },
            uploadingActive: false
        }
        this.coursesService = new CoursesService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            .getCourse(course_id)
            .then(res => this.setState({ course: res.data }))
            .catch(() => {
                this.props.history.push('/profile')
                this.props.handleToast(true, 'Un erreur est survenue, veuillez réessayer plus tard', '#f8d7da')
            })
    }

    handleInputChange = e => this.setState({ course: { ...this.state.course, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()
        const course_id = this.props.match.params.course_id
        this.coursesService
            .editCourse(course_id, this.state.course)
            .then(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'Modification réussie !', '#d4edda')
            })
            .catch(() => {
                this.props.history.push(`/teachers/${this.props.teacherInfo._id}`)
                this.props.handleToast(true, 'Un erreur est survenue, veuillez réessayer plus tard', '#f8d7da')
            })
    }

    handleImageUpload = e => {
        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    course: { ...this.state.course, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, '#f8d7da'))
    }

    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }


    render() {

        return (
            <motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
                <Container>
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h1 className="mt-5">Modifier le cour</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control type="text" name="title" value={this.state.course.title} onChange={this.handleInputChange} required />
                                </Form.Group>

                                <Form.Group controlId="lead">
                                    <Form.Label>Paragraphe principal</Form.Label>
                                    <Form.Control type="text" name="lead" value={this.state.course.lead} onChange={this.handleInputChange} required />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' name="description" value={this.state.course.description} onChange={this.handleInputChange} required />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId='category'>
                                            <Form.Label>Catégorie</Form.Label>
                                            <Form.Control as='select' name='category' value={this.state.course.category} onChange={this.handleInputChange} >
                                                <option> Choisir une catégorie </option>
                                                <option value='Design' >Design</option>
                                                <option value='Development' >Development</option>
                                                <option value='Marketing' >Marketing</option>
                                                <option value='Music' >Music</option>
                                                <option value='Other' >Other</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId='difficultyLevel'>
                                            <Form.Label>Niveau</Form.Label>
                                            <Form.Control as='select' name='difficultyLevel' value={this.state.course.difficultyLevel} onChange={this.handleInputChange}>
                                                <option>Choisir le niveau</option>
                                                <option value='All levels'>Tout les niveaux</option>
                                                <option value='Beginner'>Débutant</option>
                                                <option value='Intermidiate'>Intermédiaire</option>
                                                <option value='Advanced'>Avancé</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="whatYouWillLearn">
                                    <Form.Label>Sujets principaux</Form.Label>
                                    <Form.Control as='textarea' name="whatYouWillLearn" value={this.state.course.whatYouWillLearn} onChange={this.handleInputChange} required />
                                    <Form.Text id='whatYouWillLearn' muted>Séparez les sujets par des virgules</Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="price">
                                            <Form.Label>Prix</Form.Label>
                                            <Form.Control type="number" name="price" value={this.state.course.price} onChange={this.handleInputChange} min='0' required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="duration">
                                            <Form.Label>Durée</Form.Label>
                                            <Form.Control type="number" name="duration" value={this.state.course.duration} onChange={this.handleInputChange} min='0' required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="requirements">
                                    <Form.Label>Prérequis</Form.Label>
                                    <Form.Control as='textarea' name="requirements" value={this.state.course.requirements} onChange={this.handleInputChange} />
                                    <Form.Text id='requirements' muted>Séparez les prérequis par des virgules</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="requirements">
                                    <Form.Label>Videos</Form.Label>
                                    <Form.Control as='textarea' name="videos" value={this.state.course.videos} onChange={this.handleInputChange} />
                                    <Form.Text id='videos' muted>Séparez les liens URL par des virgules</Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Image (file: jpg or png) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>
                                {this.state.course.quizId ? (<Button onClick={() => this.openInNewTab(`http://localhost:3001/editQuiz/${this.state.course.quizId}`)} className="add-exam">Modifier examen</Button>): (<Button className="mt-3 add-exam" onClick={() => this.setState({ modalIsOpen: true })}>Ajouter Examen</Button>)}
                                <Modal onRequestClose={() => {
                                    this.setState({
                                        modalIsOpen: false,
                                    })
                                }} isOpen={this.state.modalIsOpen}>
                                    <ModalHeader onHide={() => {
                                        this.setState({
                                            modalIsOpen: false,
                                        })
                                    }} closeButton>

                                    </ModalHeader>
                                    <ModalBody>
                                        <Examform close={(id, name) => {
                                            this.setState({
                                                course: {
                                                    ...this.state.course,
                                                    quizId: id
                                                },
                                                examName: name,
                                                modalIsOpen: false,
                                            });
                                        }} />
                                    </ModalBody>
                                </Modal>
                                <Button className="mt-3 add-course" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'chargement image...' : 'Confirmer'}</Button>
                            </Form>
                            {this.state.uploadingActive || <Link to={`/teachers/${this.props.teacherInfo._id}`} className="btn btn-outline-dark mt-5" disabled>Retour</Link>}
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        )
    }
}

export default EditCourseForm