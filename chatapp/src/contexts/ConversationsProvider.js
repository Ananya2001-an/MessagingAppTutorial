import React, {useCallback, useContext, useState, useEffect} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {
    const [conversations, setConversation] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const {contacts} = useContacts()
    const socket = useSocket()

    function createConversation(recipients){
        setConversation(prevConversations =>{
            return [...prevConversations, {recipients, messages: []
        }]
        })
    }

    const addMessageToConversation = useCallback(({recipients, text, sender})=>{
        setConversation(prevConversations=>{
            let madeChange = false //tells whether such a conversation with these recipients exists or not
            const newMessage = {sender, text}
            
            const newConversations = prevConversations.map(conversation =>{
                if(arrayEquality(conversation.recipients, recipients))
                {
                    madeChange = true
                    return {...conversation, messages:[...conversation.messages, newMessage]}
                }
                else{
                    return conversation
                }
            })

            if(madeChange){
                return newConversations
            }
            else{
                return [...prevConversations, {recipients, messages: [newMessage]}]
            }
           
        })
    }, [setConversation])

    useEffect(() => {
      if(socket == null) return
        
      socket.on('receive-message', addMessageToConversation)

      return () => socket.off('receive-message') 
    }, [socket, addMessageToConversation])
    

    function sendMesagge(recipients, text){
        socket.emit('send-message', {recipients, text})
        addMessageToConversation({recipients, text, sender: id})
    }

    const formattedConversations = conversations.map((conversation, index)=>{
        const recipients = conversation.recipients.map(recipient=>{
            const contact = contacts.find(contact=>{
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return {id: recipient, name: name}
        })

        const messages = conversation.messages.map(message=>{
            const contact = contacts.find(contact=>{
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message, name: name, fromMe}
        })
        const selected = index === selectedConversationIndex
        return {...conversation, recipients,messages, selected}
    })

    const value ={
        conversations: formattedConversations,
        sendMesagge,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

  return (
    <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b){
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index)=>{
        return element === b[index]
    })
}