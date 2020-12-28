import Head from 'next/head'

type Props = {
    title?: string,
    description?: string,
    keyword?: string,
    image?: string,
    url?: string
}

const HeadMeta = ({title, description, keyword, image, url}: Props) => {
    return (
        <Head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="robots" content="index" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="keywords" content={keyword} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="" />
            <meta name="twitter:url" content={image} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    )
}

export default HeadMeta