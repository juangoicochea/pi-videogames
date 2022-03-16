import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Card/Card.module.css'

export default function Card({ id, name, image, genres, rating}) {
    function ratingStars(rating){
        let stars = []
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<span className={styles.stars} key={i}>★</span>)
        }
        return stars
    }
    return (
        <div className={styles.container}>
            <Link to={`/videogame/${id}`}>
                <div className={styles.boxImg}>
                    <img src={image} alt={name} />
                </div>
            </Link>
            <div className={styles.containerText} style={{backgroundImage:`linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,1)), url(${image})`}}>
                <p>Rating: {rating} {ratingStars(rating)}</p>
                <h5>{genres}</h5>
                <Link to={`/videogame/${id}`}>
                    <h3>{name}</h3>
                </Link>
            </div>         
        </div>
    )
}