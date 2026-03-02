export function renderFeed(posts, elements) {
  const { feedContainer, postTemplate } = elements;
  feedContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const clone = postTemplate.content.cloneNode(true);
    clone.querySelector(".post-avatar").src = post.avatarUrl;
    clone.querySelector(".post-user").textContent = post.username;
    clone.querySelector(".post-meta").textContent = post.createdAt;
    clone.querySelector(".post-image").src = post.imageUrl;
    clone.querySelector(".post-likes").textContent = `${post.likesCount.toLocaleString("es-ES")} Me gusta`;
    clone.querySelector(".post-caption").innerHTML = `<strong>${post.username}</strong> ${post.caption}`;
    fragment.appendChild(clone);
  });

  feedContainer.appendChild(fragment);
}

export function showStatus(message, statusElement, isError = false) {
  statusElement.textContent = message;
  statusElement.classList.toggle("status--error", isError);
}
