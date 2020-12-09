import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClock } from '@fortawesome/free-solid-svg-icons';

import classes from './styles/BlogCard.module.css'

const BlogCard = (blog) => {
    return (
        <div className={classes.card}>
            <p className={classes.card__date}><FontAwesomeIcon icon={faClock} className={classes.data__icon} />{ blog.blogDate }</p>
            <h2 className={classes.card__title}>
                <Link href="/blogs/[id]" as={`/blogs/${blog.blogId}`}>
                    <a>
                        {blog.blogTitle}
                    </a>
                </Link>
            </h2>
            <div className={classes.card__content}>
                <div className={classes.card__visual}>
                    <img src={blog.blogImgSrc} className={ classes.card__img }/>
                </div>
                <div className={classes.card__info}>
                    <p className={classes.card__excerpt}>{blog.blogExcerpt}</p>
                    <ul className={classes.tags}>
                        <li><FontAwesomeIcon icon={faTag} className={classes.tags__icon} /></li>
                        {blog.blogTags.map(tag => (
                            <React.Fragment key="tag.id">
                                <li className={classes.tags__item}>{ tag.name }</li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogCard