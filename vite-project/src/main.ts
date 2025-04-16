import './style.scss'


const fetchAllPokemon = async () => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await res.json();

        console.log(data)
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
                const pokeRes = await fetch(pokemon.url);
                return await pokeRes.json(); // Get full details
            })
        );

        console.log("Fetched Pokémon Details:", pokemonDetails); // Array of Pokémon objects

        // Select container where images will be displayed
        const container = document.querySelector("#pokemonContainer");

        // Ensure the container exists
        if (container) {
            container.innerHTML = ""; // Clear previous content

            // Loop through each Pokémon and add their image
            pokemonDetails.forEach((pokemon) => {
                const characterImg = pokemon.sprites?.front_default || "";
                const characterName = pokemon.name;

                // Get abilities
                const abilities = pokemon.abilities
                    ? pokemon.abilities.map((a: { ability: { name: string } }) => `<span>${a.ability.name}</span><br>`)
                    : ["<span>No abilities found</span>"];
                
                console.log("Abilities: " + abilities);

                // Get stats
                const statsHTML = pokemon.stats
                    .map((statObj: { base_stat: number; stat: { name: string } }) =>
                        `<nav><span class="left">${statObj.stat.name}</span> 
                         <span class="right">${statObj.base_stat}</span><br></nav>`
                    )
                    .join("");

                if (characterImg) {
                    const pokemonDiv = document.createElement("section");
                    pokemonDiv.style.textAlign = "center";
                    pokemonDiv.style.display = "inline-block";
                    pokemonDiv.style.margin = "2em";

                    // Create a wrapper <div> with a class
                    const contentWrapper = document.createElement("div");
                    contentWrapper.className = "pokemon-content";
                    // Create an <img> element
                    const imgElement = document.createElement("img");
                    imgElement.src = characterImg;
                    imgElement.alt = characterName;
                    imgElement.style.width = "8vw"; // Adjust size if needed
                    imgElement.style.margin = "1vh"; // Add spacing

                    // Create name element
                    const nameElement = document.createElement("h1");
                    nameElement.textContent = characterName;
                    nameElement.style.fontSize = "6rem";
                    nameElement.style.fontWeight = "bold";
                    nameElement.style.marginTop = "1em";

                    // Create stats container
                    const listStats = document.createElement("nav");
                    listStats.classList.add("stats");
                    listStats.innerHTML = `<h2>Stats</h2>${statsHTML}`;

                    // Create abilities container
                    const listAbility = document.createElement("div");
                    listAbility.classList.add("abilities");
                    
                    // Create <h2> for Abilities
                    const abilityTitle = document.createElement("h2");
                    abilityTitle.textContent = "Abilities";
                    abilityTitle.style.marginBottom = "2px";

                    // Append title and abilities
                    listAbility.appendChild(abilityTitle);
                    listAbility.innerHTML += abilities.join("");
                    listAbility.style.fontSize = "3rem";
                    listStats.style.fontSize = "3rem";


                    // Nest <img> and <h1> inside the new <div>
                    contentWrapper.appendChild(imgElement);
                    contentWrapper.appendChild(nameElement);

                    // Now append the <div> to the <section>
                    pokemonDiv.appendChild(contentWrapper);
                    // Append elements to pokemonDiv
                    // pokemonDiv.appendChild(imgElement);
                    // pokemonDiv.appendChild(nameElement);
                    
                    pokemonDiv.appendChild(listStats);
                    pokemonDiv.appendChild(listAbility);

                    // Append wrapper div to container
                    container.appendChild(pokemonDiv);

                    console.log(container)
                }
            });

 // Select all <section> elements (each character's container)
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  const img = section.querySelector("img");
  const nav = section.querySelector("nav");
  const nome = section.querySelector("h1");
  const extraDivs = section.querySelectorAll("div");
  const extraDiv = Array.from(extraDivs).find(
    (div) => !div.classList.contains("pokemon-content")
  );

  // Type safety check
  if (
    img instanceof HTMLImageElement &&
    nav instanceof HTMLElement &&
    nome instanceof HTMLElement &&
    extraDiv instanceof HTMLElement
  ) {
    let isVisible = false;

    img.addEventListener("click", () => {
      isVisible = !isVisible;
      nav.style.display = isVisible ? "block" : "none";
      extraDiv.style.display = isVisible ? "block" : "none";

      img.classList.toggle("enlarged", !isVisible);
      nome.classList.toggle("zoomed-name", !isVisible);


    });
    if (isVisible) {
        // Create and add overlay
        const overlay = document.createElement("div");
        overlay.className = "zoom-overlay";
        overlay.addEventListener("click", () => {
          img.classList.remove("zoomed");
          nav.style.display = "none";
          extraDiv.style.display = "none";
          overlay.remove();
          isVisible = false;
          
        });
        document.body.appendChild(overlay);
      } else {
        // Remove overlay if zooming out
        document.querySelector(".zoom-overlay")?.remove();
      }
  }
});

 


        }
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

// Call function to fetch and display all Pokémon images
fetchAllPokemon();




















// // Loop through each Pokémon and add their image, name, and abilities
// pokemonDetails.forEach((pokemon) => {
//     const characterImg = pokemon.sprites?.front_default || "";
//     const characterName = pokemon.name;

//     // Ensure abilities exist before mapping
//     const abilities = pokemon.abilities
//         ? pokemon.abilities.map((a) => `<span>${a.ability.name}</span><br>`)
//         : ["<span>No abilities found</span>"];

//     if (characterImg) {
//         const pokemonDiv = document.createElement("div");
//         pokemonDiv.style.textAlign = "center";
//         pokemonDiv.style.display = "inline-block";
//         pokemonDiv.style.margin = "10px";
//         pokemonDiv.style.padding = "10px";
//         pokemonDiv.style.border = "2px solid #ccc";
//         pokemonDiv.style.borderRadius = "10px";
//         pokemonDiv.style.backgroundColor = "#f9f9f9";

//         // Create an <img> element
//         const imgElement = document.createElement("img");
//         imgElement.src = characterImg;
//         imgElement.alt = characterName;
//         imgElement.style.width = "8vw"; // Adjust size if needed
//         imgElement.style.margin = "1vh";  // Add spacing

//         // Create a <p> element for the name
//         const nameElement = document.createElement("p");
//         nameElement.textContent = characterName;
//         nameElement.style.fontSize = "14px";
//         nameElement.style.fontWeight = "bold";
//         nameElement.style.marginTop = "5px";

//         // Create ability container
//         const listAbility = document.createElement("div");
//         listAbility.classList.add("abilities");
//         listAbility.style.marginTop = "10px";

//         // Create <h2> element for the title
//         const abilityTitle = document.createElement("h2");
//         abilityTitle.textContent = "Abilities";
//         abilityTitle.style.fontSize = "16px";
//         abilityTitle.style.marginBottom = "5px";

//         // Append title and abilities
//         listAbility.appendChild(abilityTitle);
//         listAbility.innerHTML += abilities.join("");

//         // 🟢 Append EVERYTHING to the same pokemonDiv
//         pokemonDiv.appendChild(imgElement);
//         pokemonDiv.appendChild(nameElement);
//         pokemonDiv.appendChild(listAbility);  // 🔥 Fix: Now the abilities are inside the same div!

//         // Append wrapper div to container
//         container.appendChild(pokemonDiv);
//     }
// });




















// const fetchPokemon = async () => {
//   const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
//   const data = await res.json();
//   console.log(data);  // Pikachu details
// };
// fetchPokemon();





// const fetchAllPokemon = async () => {
//   try {
//       const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
//       const data = await res.json();
      
//       const pokemonDetails = await Promise.all(
//           data.results.map(async (pokemon) => {
//               const pokeRes = await fetch(pokemon.url);
//               return await pokeRes.json();  // Get full details
//           })
//       );
//       // console.log(data.sprites.front_default);

//       // const characterImg = pokemonDetails?.sprites?.front_default;
//       // console.log(characterImg)
//       console.log(pokemonDetails);  // Array of 10 Pokémon objects
//   } catch (error) {
//       console.error("Error fetching Pokémon:", error);
//   }
// };
// fetchAllPokemon();




 
// const scrollContainer = document.querySelector(".scroll-container");

// const leftBtn = document.querySelector(".scroll-btn.left");
// const rightBtn = document.querySelector(".scroll-btn.right");

// if (
//   scrollContainer instanceof HTMLElement &&
//   leftBtn instanceof HTMLElement &&
//   rightBtn instanceof HTMLElement
// ) {
//   const scrollAmount = 300; // adjust as needed

//   leftBtn.addEventListener("click", () => {
//     scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//   });

//   rightBtn.addEventListener("click", () => {
//     scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   });
// }
