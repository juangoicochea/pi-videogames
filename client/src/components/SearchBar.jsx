import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../actions'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setName('nada')
        dispatch(searchByName(name))
    }

    return(
        <div>
            <input type='text' placeholder='Search videogame' onChange={(e) => handleInputChange(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}