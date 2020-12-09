import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import Head from '../components/Head'
import BlogsList from '../components/parts/BlogsList'
import Pagination from '../components/parts/Pagination'

const Home = ({blogs, data}) => {
  

  return (
    <Layout>
      <Head 
        title={'気ままにWeBlog'}
        description={'プログラミングの情報や、技術に関する記事を書いています。主にHTML,CSS,PHP,WordPress,JavaScript,React,Next.jsについての記事が多いです。'}
        keyword={'HTML,CSS,WordPress,JavaScript'}
        image={'/image/noimage.png'}
        url={''}
      />
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