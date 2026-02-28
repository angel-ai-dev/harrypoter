// contenedor principal donde se renderizan las cards
const container = document.getElementById('list-container');

// botones de filtros por casa
const botones = document.querySelectorAll('#filtros button');

// obtiene personajes desde la api
async function getCharacters() {
    console.log("--- paso 1: solicitando datos ---");
    
    try {
        // peticion a la api
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        
        // filtra los que tienen imagen y limita a 25
        const limitedData = data.filter(c => c.image !== "").slice(0, 25);
        
        console.log("--- paso 2: array recibido ---");
        console.table(limitedData);

        // renderiza cada personaje
        limitedData.forEach((personaje, index) => {
            console.log(`renderizando fila #${index + 1}:`, personaje.name);
            createRow(personaje);
        });

    } catch (error) {
        // error en la carga
        console.error("error cargando la api:", error);
    }
}

// crea una card por personaje
function createRow(char) {
    const row = document.createElement('div');
    row.className = 'row-card';

    // estructura html de la card
    row.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="info">
            <h2>${char.name}</h2>
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor}</p>
        </div>
    `;

    // evento click para ir a detalles
    row.addEventListener('click', () => {
        window.location.href = `detalles.html?name=${encodeURIComponent(char.name)}`;
        row.classList.toggle('active');
    });
    
    // agrega la card al contenedor
    container.appendChild(row);
}

// carga inicial de personajes
getCharacters();

// evento para filtrar por casa
botones.forEach(boton => {
    boton.addEventListener('click', async () => {
        const casa = boton.dataset.house;

        try {
            // vuelve a pedir datos a la api
            const response = await fetch('https://hp-api.onrender.com/api/characters');
            const data = await response.json();
         if (casa === "volver") {
                const todos = data
                    .filter(c => c.image !== "")
                    .slice(0, 25);

                todos.forEach(createRow);
                return;
            }

            // aplica filtros e imagen
            const filtrados = data
                .filter(c => c.image !== "")
                .slice(0, 25)
                .filter(c => {
                    if (casa === "none") return !c.house;
                    return c.house === casa;
                });

            // limpia el contenedor
            container.innerHTML = "";

            // renderiza los filtrados
            filtrados.forEach(createRow);

        } catch (error) {
            // error en el filtro
            console.error("error filtrando:", error);
        }
    });
});

container.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = container.textContent;
    });
});
