import React, { useCallback, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
    const [text, setText] = useState('')
    const {sendMesagge, selectedConversation} = useConversations()
    const setRef = useCallback(node =>{
        if(node)
        {
            node.scrollIntoView({smooth: true})
        }
        
    }, [])

    function handleSubmit(e){
        e.preventDefault()

        sendMesagge(
        selectedConversation.recipients.map(r=>r.id), 
        text)
        setText('')
    }
  return (
    <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                {
                    selectedConversation.messages.map((message, index)=>{
                        const lastmessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div ref={lastmessage ? setRef : null} key={index} className={`my-1 d-flex flex-column
                            ${message.fromMe ? 'align-self-end align-items-end': 'align-items-start'}`}>
                                <div
                                className = {`rounded px-2 py-1
                                ${message.fromMe ? 'bg-primary text-white': 'border'}`}>
                                {message.text}</div>
                                <div className={`text-muted small`}>
                                {message.fromMe ? 'You': message.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
            <InputGroup>
            <Form.Control as='textarea' value={text}
            onChange={(e)=>setText(e.target.value)}
            style={{height:"75px", resize:"none"}} required/>
            
            <Button type="submit">Send</Button>
           
            </InputGroup>
        </Form.Group>
        </Form>
    </div>
  )
}

