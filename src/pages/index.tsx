import Link from 'next/link';
import React from 'react'
import {GetStaticProps} from 'next'
import Layout from '../components/Layout';
import HeadMeta from '../components/Head'
import BlogsList from '../components/parts/BlogsList'
import Pagination from '../components/parts/Pagination'


type HomeProps = {
  blogs: BlogsTypes,
  data: object
}

const Home = ({blogs, data}: HomeProps) => {
  

  return (
    <Layout>
      <HeadMeta 
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
        params={1}
      />
    </Layout>
  )
};

export const getStaticProps: GetStaticProps = async () => {

  const key: object = {
      headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(
      `https://koudaiblog.microcms.io/api/v1/blogs/`,
      key,
  );
  const data = await res.json();


  return {
    props : {
      blogs: data,
      data: data,
    }
  };
};




export default Home;