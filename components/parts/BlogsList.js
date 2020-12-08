import Link from 'next/link';
import React from 'react'
import BlogCard from './BlogCard'

import classes from './styles/BlogsList.module.css'

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
      <div className={classes.container}>
        {blogs.map(blog => (
          <React.Fragment key="blog.id">
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
      </div>
  );
}

export default BlogsList