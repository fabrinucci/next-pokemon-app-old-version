import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoritePokemonCard } from './';

interface Props {
  pokemon: number[];
}

export const FavoritePokemon: FC<Props> = ({ pokemon }) => {
  return (
    <Grid.Container
      direction="row"
      gap={2}
      justify="flex-start"
    >
      {
        pokemon.map( id => (
          <FavoritePokemonCard pokemonId={ id } key={ id } />
        ))
      }

    </Grid.Container>
  );
};
