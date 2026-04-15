// Importamos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3WNu7emrmhmW2ao9ozOFJIdaIwl5hny4",
  authDomain: "audiovault-672e9.firebaseapp.com",
  projectId: "audiovault-672e9",
  storageBucket: "audiovault-672e9.firebasestorage.app",
  messagingSenderId: "739535149564",
  appId: "1:739535149564:web:a9bac6ab096b677f9bba79"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------------------------------
// LÓGICA PARA LEER EQUIPOS (index.html)
// -----------------------------------------------------
const gridEquipos = document.querySelector('.grid');

if (gridEquipos) {
    // Escuchamos la colección "equipos" en tiempo real
    onSnapshot(collection(db, "equipos"), (snapshot) => {
        gridEquipos.innerHTML = ""; // Limpiamos la pantalla
        
        if (snapshot.empty) {
            gridEquipos.innerHTML = "<p style='color: white;'>Aún no hay equipos en la bóveda. ¡Añade uno!</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const item = doc.data();
            
            // Asignar color de etiqueta según la categoría
            let claseTag = `tag-${item.categoria}`;
            if (item.categoria === 'headphone') claseTag = 'tag-wireless';
            if (item.categoria === 'speaker') claseTag = 'tag-dac';
            
            const tarjeta = `
                <article class="card slide-up-stagger-2 hover-scale">
                    <div class="card-content">
                        <span class="tag ${claseTag}">${item.categoria.toUpperCase()}</span>
                        <h3>${item.nombre}</h3>
                        <p>${item.specs}</p>
                    </div>
                </article>
            `;
            gridEquipos.innerHTML += tarjeta;
        });
    });
}

// -----------------------------------------------------
// LÓGICA PARA GUARDAR EQUIPOS (agregar.html)
// -----------------------------------------------------
const formulario = document.querySelector('.styled-form');

if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar
        
        const boton = formulario.querySelector('button');
        boton.textContent = "Guardando...";
        boton.disabled = true;

        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const specs = document.getElementById('specs').value;

        try {
            // Guardamos el nuevo equipo en la colección "equipos"
            await addDoc(collection(db, "equipos"), {
                nombre: nombre,
                categoria: categoria,
                specs: specs,
                fecha: new Date()
            });
            
            // Si todo sale bien, te devolvemos a la página principal
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error al guardar: ", error);
            alert("Hubo un error al guardar. Revisa la consola.");
            boton.textContent = "Guardar en Bóveda";
            boton.disabled = false;
        }
    });
}