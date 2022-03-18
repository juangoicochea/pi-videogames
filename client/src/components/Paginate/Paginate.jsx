import React from 'react'
import styles from '../Paginate/Paginate.module.css'

export default function Paginate ({ videogamesPerPage, allVideogames, paginate }) {
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={styles.container}>
            <ul className='paginate'>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className='number' key={number}>
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}