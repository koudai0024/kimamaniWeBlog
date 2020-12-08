import Link from 'next/link'

import classes from './styles/Pagination.module.css'


const Pagination = (props) => {
    

    const limit = 10;
    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
   
    const paths = []
    range(1, Math.ceil(props.data.totalCount / limit)).map((p) => (
       paths.push(`/page/${p}`) 
    ))



    return (
        <div className={classes.pagination}>
            <ul className={classes.pagination__list}>
                {paths.map((item, index) => (
                    <li className={(props.params == (index + 1)) ?  `${classes.pagination__itemSelected} ${classes.pagination__item}` : classes.pagination__item}>
                        <Link href='/page/[slug]' as={`/page/${index + 1}`}>
                            <a>{ index + 1 }</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}





export default Pagination