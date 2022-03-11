import React from 'react'

export default function Card({ name, image, genres, rating}) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt='Img not found' width='200px' height='250px' />
            <h5>{genres}</h5>
            <span>Rating: {rating}</span>
        </div>
    )
}