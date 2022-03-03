import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'

export default function Home () {
    //useDispatch reemplaza al mapDispatchToProps -> Despacha una action al store. Esta es la única manera de desencadenar un cambio de estado.
    const dispatch = useDispatch()

    //useSelector reemplaza al mapStateToProps -> Selecciona la parte de la data del store que necesita el componente conectado
    const allVideogames = useSelector((state) => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame =currentPage * videogamesPerPage // 15


    useEffect(() => {
        dispatch(getVideogames())
    },[])
    
    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }

    return (
        <div>
            <Link to='/videogame'>Add videogame</Link>
            <h1>Videogame Home</h1>

            <div className="filter">
                <div>
                    <div>Filter by Genre</div>
                    <select>
                        <option default>All</option>
                        {/* {genres.map((G) => (
                            <option value={G.name}>{G.name}</option>
                        ))} */}
                        <option>Aca van los generos</option>
                    </select>
                </div>
                <div>
                    <div>Order</div>
                    <select>
                        <option value="All" default>All</option>
                        <option value="asc_name">Alphabetically (A-Z)</option>
                        <option value="desc_name">Alphabetically (Z-A)</option>
                        <option value="asc_rating">Rating (Lower-Higher)</option>
                        <option value="desc_rating">Rating (Higher-Lower)</option>
                    </select>
                </div>
                <div>
                    <div>Filter by Creator</div>
                        <select>
                        <option default>All</option>
                        <option value="Api">Api videogames</option>
                        <option value="Created">User videogames</option>
                    </select>
                    {
                        allVideogames.data?.map(e => {
                        
                            return (
                                
                                <Fragment>
                                    <Link to={'/videogame/' + e.id}>
                                        <Card name={e.name} image={e.image} genres={e.genres} key={e.id} />
                                    </Link>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}