import React, {useState} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import ConversationModal from './ConversationModal'
import ContactModal from './ContactModal'

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"


export default function Sidebar({id}) {
const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
const [modalOpen, setModalOpen] = useState(false)

function closeModal(){
    setModalOpen(false)
}

const conversationsOpen = activeKey === CONVERSATIONS_KEY
  return (
    <div style={{width:"250px", display:"flex", flexDirection:"column"}}>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
                <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
            </Nav.Item>
            </Nav>
            <Tab.Content style={{borderRight:"1px solid lightgrey", overflow:"auto", flexGrow:"1"}}>
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                <Conversations/>
                </Tab.Pane>

                <Tab.Pane eventKey={CONTACTS_KEY}>
                <Contacts/>
                </Tab.Pane>
            </Tab.Content>
            <div className='p-2 border-top small' style={{borderRight:"1px solid lightgrey"}}>
                Your id: <span className='text-muted'>{id}</span>
            </div>
            <Button onClick={()=> setModalOpen(true)} className='rounded-0'>
                New {conversationsOpen ? "Conversation" : "Contact"}
            </Button>
        </Tab.Container>
        <Modal show={modalOpen} onHide={closeModal}>
            {conversationsOpen ? <ConversationModal closeModal={closeModal} /> : <ContactModal closeModal={closeModal}/>}
        </Modal>
    </div>

  )
}
