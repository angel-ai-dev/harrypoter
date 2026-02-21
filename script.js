const container = document.getElementById('list-container');

async function getCharacters() {
    console.log("--- PASO 1: Solicitando datos... ---");
    
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        
        const limitedData = data.filter(c => c.image !== "").slice(0, 25);
        
        console.log("--- PASO 2: Array de objetos recibido ---");
        console.table(limitedData);

        limitedData.forEach((personaje, index) => {
            console.log(`Renderizando fila #${index + 1}:`, personaje.name);
            createRow(personaje);
        });

    } catch (error) {
        console.error("Error cargando la API:", error);
    }
}

function createRow(char) {
    const row = document.createElement('div');
    row.className = 'row-card';

    row.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="info">
            <h2>${char.name}</h2>
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor}</p>
        </div>
    `;
    row.addEventListener('click', () => {
        window.location.href = `detalles.html?name=${encodeURIComponent(char.name)}`;
        row.classList.toggle('active');
    });
    

    container.appendChild(row);
}

getCharacters();

container.forEach(boton => {
    boton.addEventListener('click', () => {

        const valor = container.textContent; })})
