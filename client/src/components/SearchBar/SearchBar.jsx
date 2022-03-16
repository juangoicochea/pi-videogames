import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../actions'
import styles from '../SearchBar/SearchBar.module.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchByName(name))
    }

    return(
        <div className={styles.container}>
            <form>
                <input type='text' placeholder='Search videogame' onChange={e => handleInputChange(e)} />
                <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
}