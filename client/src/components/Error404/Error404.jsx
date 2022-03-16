import image from '../Error404/images/error404.gif'
import { Link } from 'react-router-dom'
import styles from '../Error404/Error404.module.css'
import NavBar from '../NavBar/NavBar'

export default function Error404 (){
    return(
        <div>
            <NavBar />
            <div className={styles.container}>
                <h1>Whoops! Error 404</h1>
                <div><img src={image} alt='Error 404' /></div>
                <p>The info you're looking for can't be found! </p>
                <p>You might want to try searching again or go back home.</p>
                <div><Link to='/home'><button>Home</button></Link></div>  
            </div>    
        </div>
    )
}