import { useEffect, useState } from 'react'

const PREFIX = 'chatapp-' 
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    let [value, setValue]= useState(()=>{
        let jsonvalue = localStorage.getItem(prefixedKey)
        if (jsonvalue != null) return JSON.parse(jsonvalue)
        if(typeof initialValue === 'function')
            return initialValue()
        else
            return initialValue
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])

    return [value, setValue]
}
