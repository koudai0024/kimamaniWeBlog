import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClock } from '@fortawesome/free-solid-svg-icons'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import React from 'react'
import Layout from '../../components/Layout';
import Head from '../../components/Head'

import classes from '../../styles/[id].module.css'

const BlogId = ({ blog, body }) => {
  const isThumbnail = (blog) => {
    if (blog.thumbnail) {
        return blog.thumbnail.url
    } else {
        return '/image/noimage.png'
    }
  }

  const articleExcerpt = (blog) => {
    if (blog.excerpt) {
      const preformedExcerpt = blog.excerpt.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedExcerpt.length > 120) {
        return preformedExcerpt.substr(0, 120);
      } else {
        return preformedExcerpt;
      }
    } else if (!blog.body) {
      return '';
    } else {
      const preformedBody = blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      if (preformedBody.length > 120) {
        return preformedBody.substr(0, 120);
      } else {
        return preformedBody;
      }
    }
  }
  return (
    <Layout>
      <Head
        title={`${blog.title} | 気ままにWeBlog`}
        description={articleExcerpt(blog)}
        keyword={blog.tags.map(tag => {tag.name})}
        image={isThumbnail(blog)}
        url={''}
      />


      <div className={classes.container}>
        <p className={classes.date}><FontAwesomeIcon icon={faClock} className={classes.date__icon }/>{new Date(blog.publishedAt).toLocaleDateString() }</p>
        <h1 className={classes.title}>{blog.title}</h1>
        <div className={classes.tags}>
          <FontAwesomeIcon icon={faTag} className={classes.tags__icon} />    
          <ul className={classes.tags__list}>
            {blog.tags.map(tag => (
              <React.Fragment key={tag.id}>
                <li className={classes.tags__item}>{tag.name}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className={classes.visual}>
          <img src={isThumbnail(blog)} className={ classes.visual__img }/>    
        </div>    
        <div dangerouslySetInnerHTML={{__html: `${body}`}} className={classes.blog}></div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch('https://koudaiblog.microcms.io/api/v1/blogs?limit=0', key);
  const readRes = await res.json();
  const postCount = readRes.totalCount;
  const query = await fetch(`https://koudaiblog.microcms.io/api/v1/blogs?limit=${postCount}`, key)
  const repos = await query.json();

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`); 
    return {paths, fallback: false};
  };

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(
    `https://koudaiblog.microcms.io/api/v1/blogs/${id}`,
    key,
  );
  const blog = await res.json();
    
  const $ = cheerio.load(blog.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props : {
        blog: blog,
        body: $.html(),
    }
  };
};

export default BlogId;