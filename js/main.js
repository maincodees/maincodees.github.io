import { fetchFeed } from "./api.js";
import { registerPwa } from "./pwa.js";
import { renderFeed, showStatus } from "./ui.js";

const feedContainer = document.querySelector("#feed");
const statusElement = document.querySelector("#status");
const postTemplate = document.querySelector("#postTemplate");
const reloadButton = document.querySelector("#reloadButton");

async function loadFeed() {
  showStatus("Cargando publicaciones...", statusElement);

  try {
    const posts = await fetchFeed();
    renderFeed(posts, { feedContainer, postTemplate });
    showStatus(`${posts.length} publicaciones cargadas`, statusElement);
  } catch (error) {
    console.error(error);
    showStatus("No se pudo cargar el feed. Revisa la configuración de la API.", statusElement, true);
  }
}

reloadButton.addEventListener("click", () => {
  loadFeed();
});

registerPwa();
loadFeed();
