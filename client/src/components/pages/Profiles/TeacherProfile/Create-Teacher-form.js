import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../../../shared/PageAnimation/PageAnimation'
import TeachersService from '../../../../service/teachers.service'
import FilesService from '../../../../service/upload.service'
import Loader from '../../../shared/Spinner/Loader'
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap'
import './Create-Teacher-form.css'




class NewTeacherForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                surname: '',
                jobOccupation: '',
                description: '',
                linkedin: '',
                youtube: '',
                website: '',
                user: this.props.loggedUser ? this.props.loggedUser._id : '',
                email: this.props.loggedUser ? this.props.loggedUser.email : ''
            },
            uploadingActive: false
        }
        this.teachersService = new TeachersService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => this.setState({ teacher: { ...this.state.teacher, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.teachersService
            .saveTeacher(this.state.teacher)
            .then(() => {
                this.props.storeUser(this.props.loggedUser)
                this.props.history.push('/profile')
                this.props.handleToast(true, 'Félicitations !, vous avez maintenant un profil d\'instructeur', '#d4edda')
            })
            .catch(err => this.props.handleToast(true, err.response?.data?.message[0].msg, '#f8d7da'))
    }

    handleImageUpload = e => {
        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    teacher: { ...this.state.teacher, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, '#f8d7da'))
    }

    render() {
        return (
            <motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition} style={{marginTop: '3%'}}>

                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <h1 className='mt-5' >Créer votre profile Instructeur ! </h1>
                            <hr />

                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                <Col md={6}>
                                        <Form.Group controlId="surname">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="text" name="surname" value={this.state.surname} onChange={this.handleInputChange} placeholder='Entrer votre nom' required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="name">
                                            <Form.Label>Prénom</Form.Label>
                                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder='Entrer votre prénom' required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="jobOccupation">
                                    <Form.Label>Occupation</Form.Label>
                                    <Form.Control type="text" name="jobOccupation" value={this.state.jobOccupation} onChange={this.handleInputChange} placeholder='Quelle est votre profession ?' />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>A propos de moi</Form.Label>
                                    <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} placeholder='Dites-nous quelque chose sur vous' />
                                </Form.Group>

                                <Tabs className="mt-4" defaultActiveKey="linkedin" id="Personal Links">
                                    <Tab eventKey="linkedin" title="Linkedin">
                                        <Form.Group controlId="linkedin">
                                            <Form.Label>Compte Linkedin </Form.Label>
                                            <Form.Control type="text" name="linkedin" value={this.state.linkedin} onChange={this.handleInputChange} placeholder='Avez-vous un profil linkedIn ?' />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="website" title="Website">
                                        <Form.Group controlId="website">
                                            <Form.Label>Site web</Form.Label>
                                            <Form.Control type="text" name="website" value={this.state.website} onChange={this.handleInputChange} placeholder='Avez-vous un site Web?' />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="youtube" title="Youtube">
                                        <Form.Group controlId="youtube">
                                            <Form.Label>Chaîne YouTube</Form.Label>
                                            <Form.Control type="text" name="youtube" value={this.state.youtube} onChange={this.handleInputChange} placeholder='Avez-vous une chaîne Youtube ?' />
                                        </Form.Group>
                                    </Tab>
                                </Tabs>

                                <Form.Group className="mt-3">
                                    <Form.Label>Imagen (fichier: jpg ou png) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button className="mt-3 add-course" type="submit" disabled={this.state.uploadingActive}> {this.state.uploadingActive ? 'Chargement de l\'image...' : 'Créer le profile Instructeur'}</Button>
                            </Form>
                            {this.state.uploadingActive || <Link to='/profile' className="btn btn-outline-dark mt-5" disabled>Retour</Link>}
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        )
    }
}

export default NewTeacherForm