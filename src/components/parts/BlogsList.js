import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';
import BlogCard from './BlogCard'


const BlogsList = ({blogs}) => {

  const articleExcerpt = (blog) => {
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

  const isThumbnail = (blog) => {
    if (blog.thumbnail) {
        return blog.thumbnail.url
    } else {
        return '/image/noimage.png'
    }
  }
  return (
      <BlogContainer>
        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <BlogCard
              blogId={blog.id}
              blogDate={new Date(blog.publishedAt).toLocaleDateString()}
              blogTitle={blog.title}
              blogExcerpt={articleExcerpt(blog)}
              blogImgSrc={isThumbnail(blog)}
              blogTags={blog.tags}
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
    width: 95%auto;
  }
`;

export default BlogsList