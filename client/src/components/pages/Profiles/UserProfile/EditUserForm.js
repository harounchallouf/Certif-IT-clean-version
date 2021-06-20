import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../../../shared/PageAnimation/PageAnimation'
import UsersService from '../../../../service/users.service'
import FilesService from '../../../../service/upload.service'
import Loader from '../../../shared/Spinner/Loader'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
class EditUserForm extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                role: ''
            },
            uploadingActive: false
        }
        this.usersService = new UsersService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => this.setState({ user: this.props.loggedUser })

    handleInputChange = e => this.setState({ user: { ...this.setState.user, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.usersService
            .editUser(this.props.loggedUser._id, this.state.user)
            .then(user => {
                this.props.storeUser(user.data)
                this.props.history.push('/profile')
                this.props.handleToast(true, 'Modification réussie !', '#d4edda')
            })
            .catch(() => {
                this.props.history.push('/profile')
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
                    user: { ...this.state.user, imageUrl: response.data.secure_url },
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
                        <Col lg={{ span: 6, offset: 3 }}>
                            <h1 className="mt-5 edit-h">Modifier mon profile</h1>
                            <hr />

                            <Form validated={this.validated} onSubmit={this.handleSubmit}>

                                <Form.Row>
                                    <Form.Group as={Col} controlId='username'>
                                        <Form.Label>Pseudo</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            name='username'
                                            value={this.state.user.username}
                                            onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md='7' controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type='email'
                                            name='email'
                                            value={this.state.user.email}
                                            onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group as={Col} md='5' controlId='role'>
                                        <Form.Label>Choisissez votre role</Form.Label>
                                        <Form.Control as='select' name='role' value={this.state.user.role} onChange={this.handleInputChange}>
                                            <option>Apprenant ou Instructeur?</option>
                                            <option value='Student' >Apprenant</option>
                                            <option value='Teacher' >Instructeur</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group className="mt-3">
                                    <Form.Label>Imagen (fichier: jpg ou png) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button className="mt-3 add-course" type='submit' disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Chargement de l\'image...' : 'Sauvegarder les modifications'}</Button>
                            </Form>
                            {this.state.uploadingActive || <Link to='/profile' className="btn btn-outline-dark mt-5" style={{ marginBottom: '200px'}} disabled>Retour</Link>}
                        </Col>
                    </Row>

                </Container>
            </motion.div>
        )
    }
}

export default EditUserForm