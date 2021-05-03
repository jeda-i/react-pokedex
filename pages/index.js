import {useState} from 'react';
import style from '../stylesheet/App.module.css';
import axios from 'axios';


const PokedexData = (props) =>{
    return (
        <div>
            <p>ID: {props.pokemon.id}</p>
            <p>Nome: {props.pokemon.name}</p>
            <p>Altura: {props.pokemon.height}</p>
            <p>Experiência: {props.pokemon.base_experience}</p>
            <img src={props.pokemon.sprites.front_default}/>
        </div>
    )
}

const Header = () =>{
    return (
        <div className={style.header}>
            <header><h2>Bem vindo a Pokedéx</h2></header>
        </div>
    )
}

const Search = (props) =>{
    const [pokemonName,setPokemonName] = useState("");
    const disabled = props.loading ? "disabled" : "";

    const handleSearch = async () => {
        if(pokemonName == ""){
            alert("Por favor informe o nome de um pokemon para continuar.");
        }else{
            /*axios.get("https://pokeapi.co/api/v2/pokemon/"+props.pokemon)
            .then(
                response => {
                    console.log(response.data);
                }, 
                error => {
                    console.error(error);
                    alert('Pokemon não encontrado.');
                    props.setPokemon("");
                }
            );*/
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+pokemonName)    
                console.log(response.data);
                props.setPokemon(response.data);
            } catch (error) {
                console.log(error);
                alert('Pokemon não encontrado.');
                props.setPokemon(false);
            }
            
        }
    }

    return (
        <div className={style.search}>
            <input 
                type='text' 
                placeholder='Digite o nome do pokemon' 
                value={pokemonName} 
                onChange={
                    (evt) => {setPokemonName(evt.target.value.toLowerCase())}
                }
            />
            <button onClick={handleSearch}>Pesquisar</button>
        </div>
    )
}

const AppContainer = (props) => {
    const [loading, setLoading] = useState(false);
    const [pokemon,setPokemon] = useState(false);
    return (
        <div className= {props.className}>
            <Header />
            <Search 
                loading = {loading} 
                setLoadig = {setLoading} 
                setPokemon={setPokemon} 
                pokemon = {pokemon}
            />
            {pokemon ? <PokedexData pokemon={pokemon} /> : null}
            
        </div>
    );
}

const pokedex = () => {
    return <AppContainer className={style.app}/>
}

export default pokedex;