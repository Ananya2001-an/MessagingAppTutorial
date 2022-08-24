import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function ContactModal({closeModal}) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  function handleSubmit(e){
    e.preventDefault()
    //when calling useContacts inside this, gave an error of invalid hook call for usecontext why?
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
}

  return (
    <>
    <Modal.Header closeButton>Create Contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" ref={idRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
                <Button className='mt-2' type="submit">Create</Button>
            </Form>
        </Modal.Body>
    </>
  )
}
