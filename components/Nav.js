import Link from 'next/link'

import classes from './styles/Nav.module.css'

const linkItem = [
    {
        'link': '/',
        'name': 'トップ'
    },
    {
        'link': '/about',
        'name': '概要'
    }
]

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.nav__list}>
                {linkItem.map((item, index) => (
                    <li className={classes.nav__item} key={index}>
                        <Link href={item.link} >
                            <a className={classes.nav__link}>{ item.name }</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav