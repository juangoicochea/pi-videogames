import React from 'react'
import { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, deleteVideogame } from '../../actions'
import loadingImage from './images/loading-videogames.gif'
import NavBar from '../NavBar/NavBar'
import styles from '../Detail/Detail.module.css'

export default function Detail(props){
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();
    const videogame = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    function ratingStars(rating){
        let stars = []
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<span className={styles.stars} key={i}>★</span>)
        }
        return stars
    }

    function handleDelete(id) {
        var result = confirm("Are you sure you want to delete this videogame?");
        if (result) {
            dispatch(deleteVideogame(id))
            alert('Videogame deleted!')
            history.push('/home')
        }
    }

    return (
        <div>
            <NavBar />
                {
                    videogame.name ?
                <div>
                    <div className={styles.containerMainImage}>
                        <img className={styles.mainImage} src={videogame.image} alt={videogame.name} />
                    </div>
                    <div className={styles.container}>
                        <h1>{videogame.name}</h1>
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: videogame.description }} />
                        <div className={styles.containerItems}>
                        <div className={styles.items}><p>{videogame.released ? (<div></div>) : 
                            (<div>
                                <Link to={`/update/${id}`}><button className={styles.updateButton}>Update</button></Link>
                                <button onClick={(e) => handleDelete(props.match.params.id)}>Delete</button>
                            </div>)}
                                </p></div>
                            <div className={styles.items}><p><b>Released: </b>{videogame.released ? videogame.released : videogame.release_date}</p></div>
                            <div className={styles.items}><p><b>Rating: </b>{videogame.rating} {ratingStars(videogame.rating)}</p></div>
                            <div className={styles.items}><p><b>Platforms: </b>{videogame.platforms[0].name ? videogame.platforms.map((e, i) => 
                                i <= videogame.platforms.length-2? e.name + ', ': e.name): videogame.platforms.join(', ')}</p></div>
                            <div className={styles.items}><p><b>Genres: </b>{videogame.genres.map((e, i) =>
                                        e.name ? i <= videogame.genres.length-2? e.name + ', ': e.name 
                                        : i <= videogame.genres.length-2? e + ', ': e)}</p></div>
                            <div className={styles.itemButton}><Link to='/home'><button>Return</button></Link></div>
                        </div>
                    </div>
                </div>
                    : <div className={styles.loadingImageContainer}>
                        <img className={styles.loadingImage} src={loadingImage} alt='Loading videogame' />
                      </div>
                }
        </div>
    )
}