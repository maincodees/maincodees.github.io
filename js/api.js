import { API_CONFIG } from "./config.js";

function buildUrl(baseUrl, endpoint, queryParams = {}) {
  const url = new URL(endpoint, baseUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url;
}

function normalizePost(raw, index = 0) {
  const id = raw.id ?? index + 1;
  const username = raw.username ?? raw.title?.split(" ")[0] ?? `user_${id}`;
  const imageUrl = raw.imageUrl ?? raw.url ?? `https://picsum.photos/seed/post-${id}/800/1000`;
  const avatarUrl = raw.avatarUrl ?? `https://i.pravatar.cc/100?img=${(id % 70) + 1}`;

  return {
    id,
    username,
    avatarUrl,
    imageUrl,
    caption: raw.caption ?? raw.title ?? "Publicación sin descripción.",
    likesCount: raw.likesCount ?? Math.floor(Math.random() * 1000) + 50,
    createdAt: raw.createdAt ?? "Hace un momento"
  };
}

export async function fetchFeed() {
  const url = buildUrl(API_CONFIG.baseUrl, API_CONFIG.endpoint, API_CONFIG.queryParams);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("La API no devolvió una lista");
    }

    return data.map((item, index) => normalizePost(item, index));
  } catch (error) {
    if (!API_CONFIG.useMocksOnError) {
      throw error;
    }

    return getMockFeed();
  }
}

function getMockFeed() {
  return Array.from({ length: 6 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      username: `demo_user_${id}`,
      avatarUrl: `https://i.pravatar.cc/100?img=${id + 20}`,
      imageUrl: `https://picsum.photos/seed/mock-${id}/800/1000`,
      caption: "Este es un post de ejemplo mientras configuras tu API REST.",
      likesCount: 120 + id * 17,
      createdAt: `Hace ${id} h`
    };
  });
}
