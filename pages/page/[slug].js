import Link from 'next/link';
import React from 'react'
import Layout from '../../components/Layout';
import BlogCard from '../../components/parts/BlogCard'

import classes from '../../components/parts/styles/BlogsList.module.css'

const Page = ({ blogs }) => {

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
    <Layout>
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
    </Layout>
  );
}

export const getStaticPaths = async () => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };

    const res = await fetch('https://koudaiblog.microcms.io/api/v1/blogs', key);
    const repos = await res.json();

    const numberList = []
    for (let i = 0; i < repos.totalCount; i += 1) {
        numberList.push(i);
    }
    const divideLength = 10;
    const count = []
    for(let i = 0; i < numberList.length; i += divideLength){
    　// 指定した個数ずつに分割する
    　let splitNumberList = numberList.slice(i, i + divideLength);
    　// カンマで接続し、文字列にする
        let numberStr = splitNumberList.join();
        count.push(numberStr)
    }

    count.shift();
    const pat = { "p": [] }
    for (let i = 0; i < count.length; i += 1) {
        pat.p.push(i) 
    }
    const paths = pat.p.map((repo, index) => `/page/${index + 1}`); 
    return {paths, fallback: false};
};

export const getStaticProps = async context => {
    const id = context.params.slug;
    console.log(id)

    const key = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };

    const limit = 10;
    const iti = `?limit=${limit}&offset=${((id - 1) * limit) + 10}`
    // const iti = `?limit=${limit}&offset=10`
    const res = await fetch(
        `https://koudaiblog.microcms.io/api/v1/blogs/${iti}`,
        key,
    );
    const data = await res.json();

    console.log(data)
    
    return {
        props : {
            blogs: data.contents,
        }
    };
};

export default Page