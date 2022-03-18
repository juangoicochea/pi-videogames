import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, getGenres, filterVideogamesByGenre, filterCreated, orderBy } from '../../actions'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../NavBar/NavBar'
import styles from '../Home/Home.module.css'
import loadingImage from './images/loading-videogames.gif'
import notfound from './images/error404.gif'

export default function Home () {
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)
    const [sort, setSort] = useState('')
    const [loader, setLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const videogamesPerPage = 15
    const lastVideogameOfPage = currentPage * videogamesPerPage
    const firstVideogameOfPage = lastVideogameOfPage - videogamesPerPage
    const videogamesOfActualPage = allVideogames?.slice(firstVideogameOfPage, lastVideogameOfPage)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames()),
        dispatch(getGenres())
    },[dispatch])

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

    if (videogamesOfActualPage.length > 0 && loader) {
        setLoader(false);
    }
    
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.emptySpace}></div>
                <div className={styles.ContainerFilters}>
                    <div className={styles.filters}>
                        <div className={styles.filterBy}>
                            <div>Order</div>
                            <select onChange={e => handleSort(e)}>
                                <option value="All" key='All' default>All</option>
                                <option value="Asc_name" key="Asc_name">Alphabetically (A-Z)</option>
                                <option value="Desc_name" key="Desc_name">Alphabetically (Z-A)</option>
                                <option value="Asc_rating" key="Asc_rating">Rating (Lower-Higher)</option>
                                <option value="Desc_rating" key="Desc_rating">Rating (Higher-Lower)</option>
                            </select>
                        </div>
                        <div className={styles.filterBy}>
                            <div>Filter by Genre</div>
                            <select onChange={e => handleFilterGenres(e)}>
                                <option key='All' default>All</option>
                                { allGenres?.map((e) => (
                                    <option value={e.name} key={e.name}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.filterBy}>
                            <div>Filter by Creator</div>
                                <select onChange={e => handleFilterCreated(e)}>
                                <option value="All" key="All"  default>All</option>
                                <option value="Api" key="Api">Api videogames</option>
                                <option value="Created" key="Created">User videogames</option>
                            </select>
                        </div>
                    </div>
                    <SearchBar />
                </div>

                <div className={styles.gridvideogames}>
                    {
                        videogamesOfActualPage.length > 0 && !loader ? (
                            videogamesOfActualPage.map(e => (
                                <Card 
                                    id={e.id}
                                    name={e.name} 
                                    image={e.image}
                                    genres={e.genres.map((el, il) =>
                                        el.name ? il <= e.genres.length-2? el.name + ', ': el.name 
                                        : il <= e.genres.length-2? el + ', ': el)}
                                    rating={e.rating}
                                    key={e.id} 
                                />
                            ) 
                        )
                        ) : !videogamesOfActualPage.length > 0 && loader ? (
                            <img src={loadingImage} alt='Loading videogames' />
                        ) : (
                            <div className={styles.center}>
                                <img src={notfound} alt='Not found' />
                                <h1>There is no videogame by that name!</h1>
                            </div> 
                        )
                    }
                </div>
                <Paginate
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginate={paginate}
                />
                <div className={styles.emptySpace}></div>
            </div> 
        </div>
    )
}