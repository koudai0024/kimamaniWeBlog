import classes from './styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <small className={classes.footer__text}>&copy; 2020 気ままにWeBlog</small>
        </footer>
    )
}

export default Footer