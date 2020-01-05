import fetch from 'isomorphic-unfetch';
import Container from '../../components/container'

const Post = props => {
  return(
  <Container>
  <div className="flex flex-col">
    <div className="flex items-center justify-around">      
      <div className="flex items-center">
        <img src={props.pokemon.sprites.front_default} />
        <div className="flex flex-col">
              <p className="font-bold capitalize">{props.pokemon.name}</p>
              <p>#{('00' + props.pokemon.id).slice(-3)}</p>
        </div>
        
      </div>
      <div>
        <div className="flex">
          {props.pokemon.types.map(type => (
            <div className={'mr-2 btn ' + type.type.name}>{type.type.name}</div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col my-10 w-3/4 mx-auto">
      <div className="flex flex-col">
        <span className="font-bold">Height: </span>{Math.floor(props.pokemon.height / 10 * 3.28084)}'{Math.round(props.pokemon.height / 10 * 3.28084 % 1 * 12, 1)}" ({props.pokemon.height / 10} meters)
        <span className="font-bold">Weight: </span> {(props.pokemon.weight * 0.00220462 * 100).toFixed(1)} lbs ({props.pokemon.weight / 10} kg )
      </div>
          <div className="my-4">
            <p className="font-bold">Abilities</p>
            {props.pokemon.abilities.map(ability => {
              if (ability.is_hidden) {
                return <p>{ability.ability.name}<span className="py-1 px-2 m-1 inline-block rounded border-red-500 text-red-500 border-solid border">Hidden</span></p>
              } else {
                return <p>{ability.ability.name}</p>
              }
            })}
          </div>
          <div>
            <p className="font-bold">Stats</p>
            {props.pokemon.stats.map(stat => (
              <p>{stat.stat.name} - {stat.base_stat}</p>
            ))}
          </div>
    </div>
  </div>
  </Container>);
}

Post.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  return {pokemon}
}

export default Post;