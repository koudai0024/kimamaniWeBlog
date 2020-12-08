import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import BlogsList from '../components/parts/BlogsList'
import Page from './page/[slug]'
// import classes from '../styles/Home.module.css'

const Home = ({blogs}) => {
  

  return (
    <Layout>
      <BlogsList
      blogs={blogs}
      />
    </Layout>
  )
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
        props : {
            blogs: data.contents,
        }
    };
};




export default Home;