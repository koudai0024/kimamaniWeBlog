import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import BlogsList from '../components/parts/BlogsList'
import Pagination from '../components/parts/Pagination'

const Home = ({blogs, data}) => {
  

  return (
    <Layout>
      <BlogsList
      blogs={blogs}
      />
      <Pagination
        data={data}
        params="1"
      />
    </Layout>
  )
};

export const getStaticProps = async (context) => {

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
      data: data,
    }
  };
};




export default Home;