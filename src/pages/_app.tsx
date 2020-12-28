import '../styles/reset.css'
import '../styles/globals.css'
import 'highlight.js/styles/hybrid.css'
import NextNprogress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {AppProps} from 'next/app'
import * as gtag from '../lib/gtag'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return (
    <>
      <NextNprogress
        color="#40FF00"
      />
      <Component {...pageProps} />
    </>
  );
}

export default App