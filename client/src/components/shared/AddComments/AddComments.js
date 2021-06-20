import React, { Component } from 'react'
import CommentsService from './../../../service/comments.service'
import { Form, Button, Row, Col } from 'react-bootstrap'
import './AddComments.css'


class AddComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                content: '',
                user: this.props.loggedUser._id || '',
                course: this.props.courseId || ''
            }
        }
        this.commentsService = new CommentsService()

    }


    handleInputChange = e => this.setState({ comment: { ...this.state.comment, [e.target.name]: e.target.value } })


    handleSubmit = e => {
        e.preventDefault()

        this.commentsService
            .saveComment(this.state.comment)
            .then(() => {
                this.props.refreshCourse()
                this.setState({ comment: { ...this.state.comment, content: '' } })
            })
            .catch(err => this.props.handleToast(true, 'Un erreur est survenue, veuillez réessayer plus tard', 'red'))

    }


    render() {
        return (
            <Row>
                <Col>
                    <h2 className="mt-4 mb-3">Ajouter un Commentaire</h2>
                    <Form className="comment-form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="content">
                            <Form.Control as='textarea' name="content" value={this.state.comment.content} onChange={this.handleInputChange} placeholder="Ecrivez votre commentaire..." />
                        </Form.Group>
                        <Button className="cmnt-btn" type="submit"> Commenter</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default AddComments