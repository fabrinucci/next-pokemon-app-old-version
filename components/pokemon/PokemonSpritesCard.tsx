import { FC } from 'react';
import { Container, Image } from '@nextui-org/react';
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

export const PokemonSpritesCard: FC<Props> = ({ pokemon }) => {
  return (
    <Container direction="row" display="flex" gap={ 0 }>
      <Image
        src={ pokemon.sprites.front_default }
        alt={ pokemon.name }
        width={ 100 }
        height={ 100 }
      />
      <Image
        src={ pokemon.sprites.back_default }
        alt={ pokemon.name }
        width={ 100 }
        height={ 100 }
      />
      <Image
        src={ pokemon.sprites.front_shiny }
        alt={ pokemon.name }
        width={ 100 }
        height={ 100 }
      />
      <Image
        src={ pokemon.sprites.back_shiny }
        alt={ pokemon.name }
        width={ 100 }
        height={ 100 }
      />
    </Container>
  )
}
