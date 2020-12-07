import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import BlogCard from '../components/parts/BlogCard'

import classes from '../styles/Home.module.css'

const Home = ({ blogs }) => {
  
  const articleExcerpt = (blog) => {
    if (blog.excerpt) {
      const preformedExcerpt = blog.excerpt.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedExcerpt.length > 120) {
        return preformedExcerpt.substr(0, 120) + '...';
      } else {
        return preformedExcerpt;
      }
    } else {
      const preformedBody = blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedBody.length > 120) {
        return preformedBody.substr(0, 120) + '...';
      } else {
        return preformedBody;
      }
    }
  }

  return (
    <Layout>
      <div className={classes.container}>
        {blogs.map(blog => (
          <React.Fragment key="blog.id">
            <BlogCard
              blogId={blog.id}
              blogDate={new Date(blog.publishedAt).toLocaleDateString()}
              blogTitle={blog.title}
              blogExcerpt={articleExcerpt(blog)}
              blogImgSrc={blog.thumbnail.url}
              blogTags={blog.tags}
            />
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(
    `https://koudaiblog.microcms.io/api/v1/blogs/`,
    key,
  );
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

export default Home;