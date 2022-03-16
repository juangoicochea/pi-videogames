import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../actions'
import { Link } from 'react-router-dom'
import logoVideogames from './images/api-videogames-logo-c.png'
import styles from '../NavBar/NavBar.module.css'

export default function NavBar(props) {
    const dispatch = useDispatch()

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }

    function handleClickReturn(){
        window.location.href = 'http://localhost:3000/home'
    }

    function buttonMenu() {
        const getURL = document.URL
        if(getURL.search('/home') === -1) {
            return (
                <button className={styles.reloadVideogames} onClick={e => {handleClickReturn()}}>
                    Return home
                </button>
            )
        } else {
            return (
                <button className={styles.reloadVideogames} onClick={e => {handleClick(e)}}>
                    Reload games 
                </button>
            )
        }
    }
    
    return (
        <div className={styles.navbar}>
            <Link to='/'>
                <img src={logoVideogames} className={styles.logo} alt='Videogames api logo'/>
            </Link>
            <div className={styles.menu}>
                {buttonMenu()}
                <Link className={styles.addVideogames} to='/create'>Add videogame</Link>
                <Link className={styles.addVideogames} to='/aboutme'>About me</Link>
            </div>
        </div>
    )
}