import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { PokemonCard } from '../../components/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const pokemonCapitalize =  ( pokeName: string ) => {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  }

  return (
    <Layout title={ pokemonCapitalize(pokemon.name) }>
      <PokemonCard pokemon={ pokemon } />
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if( !pokemon ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400, //60 * 60 * 24 = 1 day
  };
};

export default PokemonPage;