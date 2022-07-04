import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { pokeApi } from '../../api';

import { Pokemon, PokemonListResponse } from '../../interfaces/';
import { Layout } from '../../components/layouts/';
import { getPokemonInfo } from '../../utils';
import { PokemonCard } from '../../components/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const pokemonCapitalize =  (pokeName: string) => {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  }

  return (
    <Layout title={ pokemonCapitalize(pokemon.name) }>
      <PokemonCard pokemon={ pokemon } />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );

  return {
    paths: pokemonNames.map( name => ({ 
      params: { name } 
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if( !pokemon ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400 // 60 * 60 * 24 = 1 day
  };
};

export default PokemonByNamePage;