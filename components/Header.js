import Nav from './Nav'
import Link from 'next/link'

import classes from './styles/Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.topBar}>
                <div className={classes.topBar__content}>
                    <Link href="/">
                        <a>
                            <p className={classes.topBar__title}>気ままにWeBlog</p>
                            <p className={classes.topBar__text}>気ままに、web系技術に関する情報をお伝えします。</p>
                        </a>

                    </Link>
                </div>
                {/* <Nav /> */}
            </div>
        </header>
    )
}

export default Header