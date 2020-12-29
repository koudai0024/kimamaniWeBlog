import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClock } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const BlogCard = (blog: BlogTypes) => {

    const src: string = String(blog.thumbnail)
    return (
        <Card>
            <CardDate><FontAwesomeIcon icon={faClock} className="icon" />{ blog.publishedAt }</CardDate>
            <CardTitle>
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>
                        {blog.title}
                    </a>
                </Link>
            </CardTitle>
            <CardContents>
                <CardVisual>
                    <img src={src} className="img" loading="lazy"/>
                </CardVisual>
                <CardInfo>
                    <CardExcerpt>{blog.excerpt}</CardExcerpt>
                    <CardTags>
                        <li><FontAwesomeIcon icon={faTag} className="icon" /></li>
                        {blog.tags.map(tag => (
                            <React.Fragment key="tag.id">
                                <li className="item">{ tag.name }</li>
                            </React.Fragment>
                        ))}
                    </CardTags>
                </CardInfo>
            </CardContents>
        </Card>
    )
}

const Card = styled.div`
    background: #fff;
    width: 100%;
    padding: 16px;
    border-radius: 5px;
    margin-bottom: 32px;
`;

const CardDate = styled.p`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    font-size: 12px;
    margin-bottom: 8px;
    @media (max-width: 820px) {
        text-align: center;
    }
    .icon {
        width: 12px;
        height: auto;
        font-size: 12px;
        margin-right: 4px;
    }
`;

const CardTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 16px;
    @media (max-width: 820px) {
        text-align: center;
    }
`;

const CardContents = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 820px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const CardVisual = styled.div`
    width: 300px;
    height: 200px;
    overflow: hidden;
    @media (max-width: 820px) {
        margin-bottom: 16px;
        max-width: 300px;
        width: 100%;
    }
    .img {
        width: 100%;
        height: auto;
    }
`;

const CardInfo = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: calc(100% - 300px - 24px);
    min-height: 200px;
    @media (max-width: 820px) {
        flex-direction: column;
        width: 100%;
        min-height: auto;
        height: auto;
    }
`;

const CardExcerpt = styled.p`
    font-size: 16px;
    @media (max-width: 820px) {
        display: block;
        text-align: center;
        margin-bottom: 16px;
    }
`;

const CardTags = styled.ul`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    margin-top: auto;
    @media (max-width: 820px) {
        position: static;
        align-items: center;
    }
    .icon {
        width: 14px;
        height: auto;
        font-size: 14px;
        margin-right: 8px;
    }
    .item {
        font-size: 14px;
    }
`;

export default BlogCard