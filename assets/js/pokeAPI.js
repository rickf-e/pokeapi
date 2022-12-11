const PokeApi = {}

function converterPokeApiDetalhesParaPokemon(pokeDetalhes){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetalhes.id
    pokemon.name = pokeDetalhes.name

    const types = pokeDetalhes.types.map((typeSlot) => typeSlot.type.name)
    const [tipo] = types

    
    pokemon.types = types
    pokemon.tipo = tipo

    pokemon.photo = pokeDetalhes.sprites.other.dream_world.front_default

    return pokemon
}

PokeApi.pegarPokemonsDetalhes = (pokemon) => {
    return fetch(pokemon.url)
        .then((res) => res.json())
        .then(converterPokeApiDetalhesParaPokemon)
}

PokeApi.pegarPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((resposta) => resposta.json())        
        .then((respostaDoBody) => respostaDoBody.results)
        .then((pokemons) => pokemons.map(PokeApi.pegarPokemonsDetalhes))
        .then((detalhesDaReq) => Promise.all(detalhesDaReq))
        .then((detalhesDoPokemon) => detalhesDoPokemon)
}