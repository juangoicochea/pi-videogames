import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, getGenres, filterVideogamesByGenre, filterCreated, orderBy } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginate from './Paginate'
import SearchBar from './SearchBar'

export default function Home () {
    //useDispatch reemplaza al mapDispatchToProps -> Despacha una action al store. Esta es la única manera de desencadenar un cambio de estado.
    const dispatch = useDispatch()

    //useSelector reemplaza al mapStateToProps -> Selecciona la parte de la data del store que necesita el componente conectado
    const allVideogames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const lastVideogameOfPage = currentPage * videogamesPerPage //15
    const firstVideogameOfPage = lastVideogameOfPage - videogamesPerPage //0
    const currentVideogames = allVideogames?.slice(firstVideogameOfPage, lastVideogameOfPage)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames()),
        dispatch(getGenres())
    },[dispatch])
    
    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }

    function handleFilterGenres(e){
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e){
        dispatch(orderBy(e.target.value))
        setCurrentPage(1)
        setSort(e.target.value)
    }

    return (
        <div>
            <Link to='/create'>Add videogame</Link>
            <h1>Videogame Home</h1>
            <button onClick={e => {handleClick(e)}}>
                All Videogames    
            </button>
            <div className="filter">
                <div>
                    <div>Filter by Genre</div>
                    <select onChange={e => handleFilterGenres(e)}>
                        <option key='All' default>All</option>
                        { allGenres?.map((e) => (
                            <option value={e.name} key={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>Order</div>
                    <select onChange={e => handleSort(e)}>
                        <option value="All" key='All' default>All</option>
                        <option value="Asc_name" key="Asc_name">Alphabetically (A-Z)</option>
                        <option value="Desc_name" key="Desc_name">Alphabetically (Z-A)</option>
                        <option value="Asc_rating" key="Asc_rating">Rating (Lower-Higher)</option>
                        <option value="Desc_rating" key="Desc_rating">Rating (Higher-Lower)</option>
                    </select>
                </div>
                <div>
                    <div>Filter by Creator</div>
                        <select onChange={e => handleFilterCreated(e)}>
                        <option value="All" key="All"  default>All</option>
                        <option value="Api" key="Api">Api videogames</option>
                        <option value="Created" key="Created">User videogames</option>
                    </select>
                    <SearchBar />
                    <Paginate
                        videogamesPerPage={videogamesPerPage}
                        allVideogames={allVideogames?.length}
                        paginate={paginate}
                    />
                    {
                        currentVideogames.map(e => (
                            <Link to={'/videogame/' + e.id}>
                                <Card name={e.name} 
                                image={e.image} 
                                genres={e.genres[0].name ? e.genres.map((el, il) =>
                                        il <= e.genres.length-2? el.name + ', ': el.name): e.genres.join(', ')}
                                rating={e.rating}
                                key={e.id} />
                            </Link>
                            ) 
                        )
                    }
                </div>
            </div>
        </div>
    )
}