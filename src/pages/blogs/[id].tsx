import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClock } from '@fortawesome/free-solid-svg-icons'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import React from 'react'
import {GetStaticProps} from 'next'
import Layout from '../../components/Layout';
import HeadMeta from '../../components/Head'

import fetchWrap from '../../lib/fetch'

import styled from 'styled-components';



type BlogProps = {
  blog: BlogTypes,
  body: object
}

const BlogId = ({ blog, body }: BlogProps) => {
  const isThumbnail = (blog: BlogTypes) => {
    if (blog.thumbnail) {
        return blog.thumbnail.url
    } else {
        return '/image/noimage.png'
    }
  }

  const articleExcerpt = (blog: BlogTypes) => {
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

  const tags: Array<void> = blog.tags.map(tag => {tag.name});
  const keywordtext: string = tags.join(',');
  return (
    <Layout>
      <HeadMeta
        title={`${blog.title} | 気ままにWeBlog`}
        description={articleExcerpt(blog)}
        keyword={keywordtext}
        image={isThumbnail(blog)}
        url={''}
      />


      <Article>
        <ArticleDate><FontAwesomeIcon icon={faClock} className="icon"/>{new Date(blog.publishedAt).toLocaleDateString() }</ArticleDate>
        <ArticleTitle>{blog.title}</ArticleTitle>
        <ArticleTags>
          <FontAwesomeIcon icon={faTag} className="icon" />    
          {blog.tags.map(tag => (
            <React.Fragment key={tag.id}>
              <li className="item">{tag.name}</li>
            </React.Fragment>
          ))}
        </ArticleTags>
        <ArticleVisual>
          <img src={isThumbnail(blog)} className="img" loading="lazy"/>    
        </ArticleVisual>    
        <ArtcleContents dangerouslySetInnerHTML={{__html: `${body}`}}></ArtcleContents>
      </Article>
    </Layout>
  );
};

const Article = styled.article`
  background: #fff;
  width: 1080px;
  margin: 0 auto 40px;
  padding: 24px;
  @media (max-width: 1080px) and (min-width: 820px) {
    width: 760px;
  }
  @media (max-width: 820px) {
    width: 100%;
    margin-bottom: 0;
    margin-top: -40px;
  }
`;

const ArticleDate = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  margin-bottom: 1em;
  .icon{
    width: 14px;
    height: auto;
    font-size: 14px;
    margin-right: 4px;
  }
`;

const ArticleTitle = styled.h1`
  font-size: 32px;
  border-left: 5px solid #0101df;
  margin-bottom: 16px;
  padding: 8px 0 8px 8px;
`;

const ArticleTags = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .icon {
    width: 16px;
    height: auto;
    font-size: 16px;
    margin-right: 8px;
  }
  .item{
    font-size: 16px;
    margin-right: 8px;
  }
`;

const ArticleVisual = styled.div`
  width: 600px;
  @media (max-width: 820px) {
    width: 100%;
    max-width: 300px;
  }
  .img {
    width: 100%;
    height: auto;
    margin-bottom: 24px;
  }
`;

const ArtcleContents = styled.div`
  font-size: 16px;
  line-height: 1.75;
  h2 {
    background: #f4f4f4;
    font-size: 24px;
    font-weight: bold;
    border-left: 5px solid #0174df;
    padding: 4px 0 4px 4px;
    margin-bottom: 16px;
    margin-top: 32px;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    padding: 2px 0 2px 4px;
    border-left: 3px solid #81F7F3;
    margin-bottom: 16px;
    margin-top: 24px;
  }
  p {
    margin-bottom: 16px;
  }
  a {
    color: #0000ee;
  }
  pre > code {
    margin-bottom: 16px;
  }
  s {
    text-decoration: line-through;
  }
  u {
    text-decoration: underline;
  }
  img {
    max-width: 100%;
    height: auto;
    margin: 8px 0;
  }
  ul {
    color: #1e366a;
    padding: 0.5em 0 0.5em 1.5em;
    margin-bottom: 16px;
  }
  ul li {
    list-style-type: disc;
    padding: 0.5em 0;
  }
  blockquote {
    position: relative;
    padding: 30px 15px 8px 15px;
    box-sizing: border-box;
    font-style: italic;
    background: #efefef;
    color: #555;
    margin-bottom: 16px;
    &::before {
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 3px;
      content: "“";
      font-family: sans-serif;
      color: #cfcfcf;
      font-size: 90px;
      line-height: 1;     
    }
    & p {
      padding: 0;
      margin: 10px 0;
      line-height: 1.7;
    }
    & cite {
      display: block;
      text-align: right;
      color: #888888;
      font-size: 0.9em;
    }
  }
`;

export const getStaticPaths = async () => {

  const readRes = await fetchWrap('blogs', 'limit=0');
  const postCount = readRes.totalCount;
  const repos = await fetchWrap('blogs', `limit=${postCount}`)

  const paths: object = repos.contents.map((repo: BlogTypes) => `/blogs/${repo.id}`); 
    return {paths: paths, fallback: false};
  };

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const blog = await fetchWrap(`blogs/${id}`)
    
  const $ = cheerio.load(blog.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  $('img').each((_, elm) => {
    $(elm).attr('loading', 'lazy');
  });

  return {
    props : {
        blog: blog,
        body: $.html(),
    }
  };
};

export default BlogId;