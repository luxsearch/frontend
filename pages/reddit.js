import React from 'react';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import RedditResults from '../components/search-container/RedditResults';
import ResponseReddit from '../dummy_response/ResponseReddit';
import configs from '../configs';

function Reddit({ results }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`${router.query.q || 'LuxSearch'} - Reddit Results`}</title>
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <Header q={router.query.q} />
      <RedditResults results={results} />
      <Footer />
    </div>
  );
}

export default Reddit;

export async function getServerSideProps(context) {
  const useDummyData = configs.useDummyData;
  const apiURL = process.env.API_URL;
  const q = context.query.q;
  const startIndex = context.query.start || '0';

  if (q === undefined || q === null || q.length < 1) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const resData = useDummyData
    ? ResponseReddit
    : await fetch(`${apiURL}/reddit?q=${q}&start=${startIndex}`).then(
        (response) => response.json()
      );

  return {
    props: {
      results: resData,
    },
  };
}
