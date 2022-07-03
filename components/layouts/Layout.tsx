import { FC } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
  title?: string;
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  
  return (
      <>
        <Head>
            <title>{ 'Pokemon | ' } { title || 'App' }</title>
            <meta name="author" content="Fabrizio Nucci" />
            <meta name="description" content={`Information about ${ title }`} />
            <meta name="keywords" content={ `${ title }, pokemon, pokedex`} />

            <meta property="og:title" content={`Information about ${ title }`} />
            <meta property="og:description" content={`This is the page about ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />
        </Head>
      
        <Navbar />

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>
      
      </>
  )
};
