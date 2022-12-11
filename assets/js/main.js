const pokeID = document.getElementById('pokemonList')
const mudarPagina = document.getElementById('pagination')
const maxPokemons = 151
const limit = 12
let offset = 0


function carregarPokemonItens(offset, limit){

    PokeApi.pegarPokemons(offset, limit).then((listaDePokemons = []) => {
        const newHTML = listaDePokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.tipo}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt=${pokemon.name}>
                </div>
            </li>
        `).join('')
        pokeID.innerHTML += newHTML
    })
}

carregarPokemonItens(offset, limit)

mudarPagina.addEventListener("click", () => {
    offset += limit
    const qtdRecord = offset + limit

    if(qtdRecord >= maxPokemons){
        const novoLimite = maxPokemons - offset
        carregarPokemonItens(offset, novoLimite)

        mudarPagina.parentElement.removeChild(mudarPagina)
    }else{
        carregarPokemonItens(offset, limit)
    }
})