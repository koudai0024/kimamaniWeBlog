import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout';
import BlogsList from '../../components/parts/BlogsList'
import Pagination from '../../components/parts/Pagination'

import {GetStaticProps} from 'next'

type PageProps = {
    blogs: BlogsTypes,
    data: object,
    params: any
}

const Page = ({ blogs, data, params }: PageProps) => {

    return (
        <Layout>
            <Head>
                <meta name="robots" content="noindex" />
                <title>気ままにWeBlog</title>
            </Head>
            <BlogsList
                blogs={blogs}
            />
             <Pagination
                data={data}
                params={params.slug}
            />
        </Layout>
   ) 
}

export const getStaticPaths = async () => {
    const key: object = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };

    const res = await fetch('https://koudaiblog.microcms.io/api/v1/blogs?limit=0', key);
    const repos = await res.json();

    //test
    const limit = 10;
    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
   
    const paths: Array<string> = []
    range(1, Math.ceil(repos.totalCount / limit)).map((p) => (
       paths.push(`/page/${p}`) 
    ))

    return {paths, fallback: false};
};



export const getStaticProps: GetStaticProps  = async (context) => {
    const id: number = Number(context.params.slug);

    const key: object = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };

    const limit = 10;
    const iti = `?limit=${limit}&offset=${((id - 1) * limit)}`
    const res = await fetch(
        `https://koudaiblog.microcms.io/api/v1/blogs/${iti}`,
        key,
    );
    const data = await res.json();

    return {
        props : {
            blogs: data,
            data: data,
            params: context.params
        }
    };
};

export default Page