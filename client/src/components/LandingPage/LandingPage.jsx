import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={styles.background}>
            <div className={styles.containerSquares}>
                <div className={`${styles.backgroundContainer1} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background1} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer2} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background2} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer3} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background3} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer4} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background4} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer5} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background5} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer6} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background6} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer7} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background7} ${styles.backgroundSquares}`}></div>
                </div>
                <div className={`${styles.backgroundContainer8} ${styles.backgroundContainer}`}>
                    <div className={`${styles.background8} ${styles.backgroundSquares}`}></div>
                </div>
            </div>
            <div className={styles.logo}></div>
            <h1>&#60;Don't stop until you're proud&#62;</h1>
            <Link to='/home'>
                <button>Gamer entrance</button>
            </Link>
        </div>
    )
}