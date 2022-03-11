import image from '../components/error404.gif'
export default function Error404 (){
    return(
        <div>
            <h1>Whoops! Error 404</h1>
            <div><img src={image} alt='Error 404' /></div>
            <span>The info you're looking for can't be found! </span>
            <span>You might want to try searching again or go back home.</span>
            <div><button>Home</button></div>
        </div>
    )
}