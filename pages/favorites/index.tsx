import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils/';
import { FavoritePokemon } from '../../components/pokemon/';

const FavoritesPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemon(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites">
      {
        favoritePokemon.length === 0 
        ? <NoFavorites /> 
        : (
          <FavoritePokemon pokemon={ favoritePokemon } />)
      }
    </Layout>
  );
};

export default FavoritesPage;
