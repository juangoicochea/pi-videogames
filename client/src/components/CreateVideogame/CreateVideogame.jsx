import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postVideogame, getGenres } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../actions'
import NavBar from '../NavBar/NavBar'
import styles from '../CreateVideogame/CreateVideogame.module.css'

function validate(input) {
    let errors = {}
    
    if (!input.name) {
        errors.name = 'Name is require'
    } 
    if (!input.description) {
        errors.description = 'Description is require'
    } 
    if (input.platforms.length <= 0) {
        errors.platforms = 'Please select one platform at least'
    } 
    if (input.genres.length <= 0) {
        errors.genres = 'Please select one genre at least'
    } 
    if (input.genres.length >= 5 ) {
        errors.genres = 'Please select maximum 4 genres'
    }
    return errors
}

function validateBlur(input) {
    let errors = {}
    const RegExesUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

    if (input.image && input.image.match(RegExesUrl) === null) {
        errors.image = 'Is not a valid URL image'
    }
    if (input.rating < 0 || input.rating > 5 ) {
        errors.rating = 'please write a number between 0 and 5'
    }
    return errors
}

export default function CreateVideogame () {
     const dispatch = useDispatch()
     const history = useHistory()
     const allGenres = useSelector((state) => state.genres)
     const allPlatforms = useSelector((state) => state.videogames)
     const [ errors, setErrors ] = useState({})

     const [ input, setInput ] = useState({
         name: '',
         image: '',
         description: '',
         release_date: '',
         rating: '',
         platforms: [],
         genres: []
     })

     useEffect(() => {
        dispatch(getVideogames()),
        dispatch(getGenres())
     }, [dispatch])

     function getAllPlatforms() {
        let data = allPlatforms.flatMap((e, i) => (e.platforms))
        const dataArr = new Set(data);
        let result = [...dataArr]
        return result.map((e) => (
            <option key={e} value={e}>{e}</option>
        ))
     }

     function getAllGenres() {
        let data = allGenres?.map((e) => (
            <option key={e.name} value={e.name}>{e.name}</option>
        ))
        return data
     }

     function handleChange(e) {
         setInput({
             ...input,
             [e.target.name]: e.target.value
         })
         setErrors(validate({
             ...input,
             [e.target.name]: e.target.value
         }))
     }

     function handleBlur(e) {
        setErrors(validateBlur({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

     function handleSelectPlatforms(e) {
        if(!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
     }

     function handleSelectGenres(e) {
        if(!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
     }

     function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== e)
        })
         setErrors(validate({
            ...input,
            platforms: input.platforms.filter(plat => plat !== e)
        }))
     }

     function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== e)
        })
        setErrors(validate({
            ...input,
            genres: input.genres.filter(gen => gen !== e)
        }))
    }

     function handleSubmit(e) {
         e.preventDefault()
         dispatch(postVideogame(input))
         alert('Videogame created')
         setInput({
            name: '',
            image: '',
            description: '',
            release_date: '',
            rating: '',
            platforms: [],
            genres: []  
         })
         history.push('/home')
     }

     return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.containerForm}>
                <h1>Create your videogame</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Name<span>*</span></div>
                        <input type='text' value={input.name} name='name' placeholder='Insert name' onChange={(e) => handleChange(e)} />
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Image</div>
                        <input type='text' value={input.image} name='image' placeholder='Image url' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)} />
                        {errors.image && (<p>{errors.image}</p>)}
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Description<span>*</span></div>
                        <input type='text' value={input.description} name='description' placeholder='Insert description' onChange={(e) => handleChange(e)} />
                        {errors.description && (<p>{errors.description}</p>)}
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Release date</div>
                        <input type='date' value={input.release_date} name='release_date' placeholder='Insert date' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Rating</div>
                        <input type='number' value={input.rating} name='rating' placeholder='Insert rating' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)} />
                        {errors.rating && (<p>{errors.rating}</p>)}
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Platforms<span>*</span></div>
                        <select name='platforms' onChange={(e) => handleSelectPlatforms(e)}>
                            <option disabled selected value>Select...</option>
                            {getAllPlatforms()}
                        </select>
                        <ul className={styles.PGLists}>
                            {input.platforms.map(e => 
                                <li>{e} <span onClick={() => handleDeletePlatforms(e)}>x</span></li>
                                )}
                        </ul>
                        {errors.platforms && (<p>{errors.platforms}</p>)}
                    </div>
                    <div className={styles.formItems}>
                        <div className={styles.formLabels}>Genres<span>*</span></div>
                        <select name='genres' onChange={(e) => handleSelectGenres(e)}>
                            <option disabled selected value>Select...</option>
                            {getAllGenres()}
                        </select>
                        <ul className={styles.PGLists}>
                            {input.genres.map(e => 
                                <li>{e} <span onClick={() => handleDeleteGenres(e)}>x</span></li>
                                )}
                        </ul>
                        {errors.genres && (<p>{errors.genres}</p>)}
                    </div>
                    {Object.keys(errors).length === 0 && input.name.length >= 1 && (
                        <button type='submit'>Create videogame</button>
                    )}
                </form>
            </div>
        </div>
     )
}