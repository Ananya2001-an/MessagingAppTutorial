import React, {useContext} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext()

export function useContacts(){
    return useContext(ContactsContext)
}

//why not default export?
export function ContactsProvider({children}) {
    const [contacts, setContact] = useLocalStorage('contacts', [])

    function createContact(id, name){
        setContact(prevContacts => [...prevContacts, {id, name}])
    }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
        {children}
    </ContactsContext.Provider>
  )
}
