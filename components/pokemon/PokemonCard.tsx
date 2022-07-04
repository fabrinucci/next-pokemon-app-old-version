import { useState, FC } from 'react';
import { Grid, Card, Text, Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { localFavorites } from '../../utils';
import { Pokemon } from '../../interfaces';
import { PokemonSpritesCard } from './';

interface Props {
  pokemon: Pokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if( isInFavorites ) return;

    confetti({
      particleCount: 100,
      spread: 160,
      angle: -100,
      startVelocity: 90,
      zIndex: 1000,
      origin: {
        x: 1,
        y: 0
      }
    })
  };

  const urlDefault = pokemon.sprites.other?.dream_world.front_default;
  const urlPng = pokemon.sprites.other?.home.front_default;
  const urlNoImg = '/img/no-image.png';

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
      <Grid xs={ 12 } sm={ 4 }>
        <Card hoverable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={ urlDefault || urlPng || urlNoImg }
              alt={ pokemon.name }
              width={ "100%" }
              height={ 200 }
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={ 12 } sm={ 8 }>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text h1 transform="capitalize">
              { pokemon.name }
            </Text>

            <Button
              color="gradient"
              ghost={ !isInFavorites }
              onClick={ onToggleFavorite }
            >
              { isInFavorites ? 'In favorites' : 'Save to favorites' }
            </Button>
          </Card.Header>

          <Card.Body>
            <Text size={ 30 }>Sprites:</Text>
            {
              ( pokemon.sprites.front_default && pokemon.sprites.back_default ) 
              ? ( <PokemonSpritesCard pokemon={ pokemon }/> )
              : (
              <Text color='grey' size={ 25 }>We are working on the sprites of this pokemon</Text>
              )
            }
          </Card.Body>            
        </Card>
      </Grid>
    </Grid.Container>
  )
}
