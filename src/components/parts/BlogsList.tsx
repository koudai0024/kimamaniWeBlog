import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';
import BlogCard from './BlogCard'

type Props = {
  blogs: BlogsTypes
}

const BlogsList = ({blogs}: Props) => {

  const articleExcerpt = (blog: BlogTypes) => {
    if (blog.excerpt) {
      const preformedExcerpt = blog.excerpt.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedExcerpt.length > 120) {
        return preformedExcerpt.substr(0, 120) + '...';
      } else {
        return preformedExcerpt;
      }
    } else if (!blog.body) {
      return '';
    } else {
      const preformedBody = blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedBody.length > 120) {
        return preformedBody.substr(0, 120) + '...';
      } else {
        return preformedBody;
      }
    }
  }

  const isThumbnail = (blog: BlogTypes): object => {
    if (blog.thumbnail) {
      return [
        blog.thumbnail.url
      ]
    } else {
      return [
        blog.thumbnail.url = '/image/noimage.png'
      ]
    }
  }

  return (
    <BlogContainer>
        {blogs.contents.map(blog => (
          <React.Fragment key={blog.id}>
            <BlogCard
              id={blog.id}
              publishedAt={new Date(blog.publishedAt).toLocaleDateString()}
              title={blog.title}
              excerpt={articleExcerpt(blog)}
              thumbnail={isThumbnail(blog)}
              tags={blog.tags}
            />
          </React.Fragment>
        ))}
      </BlogContainer>
  );
}

const BlogContainer = styled.div`
  width: 1080px;
  margin: 0 auto;

  @media (max-width: 1080px) and (min-width: 820px) {
    width: 760px;
  }

  @media (max-width: 820px) {
    width: 95%;
  }
`;

export default BlogsList