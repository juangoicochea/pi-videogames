import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions'

export default function Detail(props){
    const dispatch = useDispatch()
    let videogame = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    return (
        <div>
            {
                videogame.name ?
                <div>
                    <img src={videogame.image} alt={videogame.name} />
                    <h1>{videogame.name}</h1>
                    <p>{videogame.description}</p>
                    <p>{videogame.released}</p>
                    <p>{videogame.rating}</p>
                    <p>{videogame.platforms[0].name ? videogame.platforms.map((e, i) => 
                        i <= videogame.platforms.length-2? e.name + ', ': e.name): videogame.platforms.join(', ')}</p>
                    <p>{videogame.genres[0].name ? videogame.genres.map((e, i) => 
                        i <= videogame.genres.length-2? e.name + ', ': e.name): videogame.genres.join(', ')}</p>
                </div>
                : <p>Loading...</p>
            }
            <Link to='/home'>Return</Link>
        </div>
    )
}