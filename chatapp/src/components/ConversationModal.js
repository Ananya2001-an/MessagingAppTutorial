import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function ConversationModal({closeModal}) {

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const {contacts} = useContacts()
    const { createConversation } = useConversations()

    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevContactIds => {
            if(prevContactIds.includes(contactId))
            {
                return prevContactIds.filter(prevContactId=>{
                    return prevContactId !== contactId
                })
            }
            else{
                return [...prevContactIds, contactId]
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

  return (
    <>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {
                    contacts.map(contact=>{
                        return <Form.Group>
                            <Form.Check type='checkbox'
                            value={selectedContactIds.includes(contact.id)} 
                            label={contact.name}
                            onChange={()=> handleCheckboxChange(contact.id)} />
                        </Form.Group>
                    })
                }
                <Button className='mt-2' type="submit">Create</Button>
            </Form>
        </Modal.Body>
    </>
  )
}
