import React from 'react';
import {Form, Button } from 'react-bootstrap'
import './Contact.css'
import { useForm } from "react-hook-form";


   



export default function Contact() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, r) => {
        alert('thank u from ${data.email}');
        const templateId = 'template_el8scha';
        const serviceID = 'Certif_IT';
        sendFeedback(serviceID, templateId, { from_name: data.name, message_html: data.comment, reply_to: data.email })
        r.target.reset();
    };
    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('Il y a eu une erreur. Voici quelques réflexions sur lerreur qui sest produite:', err))
    }
 return (
        <div className="root">
            <h2>Contact</h2>
            <p className="text-center">Contactez l'administrateur en envoyant vos messages et/ou réclamations. </p>
         <Form className="form" onSubmit={handleSubmit(onSubmit)}>
         <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" name="email" required />
    </Form.Group>
    <Form.Group>
        <Form.Label>Objet</Form.Label>
        <Form.Control type="text" name="name"  required />
    </Form.Group>
    <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" name="comment"  />
             </Form.Group>
             <Button className="button" type="submit">Envoyer</Button>
            </Form>
            </div>
  );
}
