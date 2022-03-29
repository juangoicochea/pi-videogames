import React from 'react'
import styles from '../AboutMe/AboutMe.module.css'
import NavBar from '../NavBar/NavBar'
import linkedin from '../AboutMe/images/linkedin-icon.png'
import github from '../AboutMe/images/github-icon.png'

export default function AboutMe() {
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.containerText}>
                    <h1>Thanks for being here!</h1>
                    <p>Hi! My name is Juan Carlos Goicochea, I’m a web fullstack developer student at Soy Henry bootcamp.</p>
                    <p>This is my individual project where I applied all the technologies that I learned, like React with Redux for the frontend and Sequelize with Postgres for the backend and data base.</p>
                    <p>This App is 100% responsive made it with CSS Modules.</p>
                    <p>If you are interested for kwon more about my skills you can get in touch at:
                        <a href='https://www.linkedin.com/in/juan-goicochea/'>
                        <img src={linkedin} alt='Linkedin icon' />
                        </a>
                        <a href='https://github.com/juangoicochea/'>
                            <img src={github} alt='Github icon' />
                        </a>
                        </p></div> 
                        
                        
            </div>
        </div>
    )
}