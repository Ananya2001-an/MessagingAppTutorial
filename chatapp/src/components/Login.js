import React, { useRef } from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

export default function Login({onIdSubmit}) {

const idRef = useRef() 

function handleSubmit(e){
    e.preventDefault()

    onIdSubmit(idRef.current.value)

}

function createNewId(){
    onIdSubmit(uuidv4())
}
  return (
    <Container className='d-flex align-items-center' style={{height:"100vh"}}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group className='mb-4'>
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" required ref={idRef}></Form.Control>
            </Form.Group>
            <Button type="submit" style={{marginRight:"10px"}}>Login</Button>
            <Button onClick={createNewId} variant='secondary'>Create a new ID</Button>
        </Form>
    </Container>
  )
}
