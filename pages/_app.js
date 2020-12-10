import '../styles/reset.css'
import '../styles/globals.css'
import 'highlight.js/styles/hybrid.css';
import Router from 'next/router'
import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
