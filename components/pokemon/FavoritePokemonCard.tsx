import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card } from '@nextui-org/react';

interface Props {
  pokemonId: number;
}

export const FavoritePokemonCard: FC<Props> = ( { pokemonId } ) => {
  
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${ pokemonId }`)
  }

  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ pokemonId }.png`

  return (
    <Grid 
      key={ pokemonId } 
      onClick={ onFavoriteClicked }
      xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }
    >
      <Card hoverable clickable>
        <Card.Image
          src={ url }
          alt={`Pokemon ${ pokemonId }`}
          width={ '100%' }
          height={ 140 }
        />
      </Card>
    </Grid>
  )
}