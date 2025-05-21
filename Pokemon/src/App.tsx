import React, { useEffect, useState } from 'react';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
const POKEMON_PER_PAGE = 20;  
// only setting the page limit to 20, becuase of the given requirement to have 0-9 pages

const App: React.FC = () => {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(POKEMON_API);
        const data = await response.json();
        const names = data.results.map((pokemon: any) => pokemon.name);
        names.sort((a: string, b: string) => a.localeCompare(b));
        setPokemonNames(names);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const totalPages = Math.ceil(pokemonNames.length / POKEMON_PER_PAGE);
  const start = (page - 1) * POKEMON_PER_PAGE;
  const visiblePokemon = pokemonNames.slice(start, start + POKEMON_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handlePageClick = (pageNum: number) => setPage(pageNum);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pokémon List</h1>
      <ul>
        {visiblePokemon.map((name) => (
          <li key={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handlePrev} 
          disabled={page === 1} 
          style={{ backgroundColor: 'yellow' }}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button 
          onClick={handleNext} 
          disabled={page === totalPages} 
          style={{ backgroundColor: 'yellow' }}
        >
          Next
        </button>
      </div>

      {/* Pagination Buttons */}
      <div style={{ marginTop: '10px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            style={{
              margin: '0 3px',
              backgroundColor: page === i + 1 ? 'yellow' : undefined,
              fontWeight: page === i + 1 ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
