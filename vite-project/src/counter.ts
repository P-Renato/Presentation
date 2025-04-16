const fetchCharacter = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character/1');
  const data = await res.json();
  console.log(data);  // Rick Sanchez info
};
fetchCharacter();


