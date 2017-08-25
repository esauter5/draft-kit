export const draft = (playerId) => {
  fetch(`/players/${playerId}/draft`, { method: 'PUT' })
    .then(response => response.json())
    .catch(e => console.warn(e));
};

export const undraft = (playerId) => {
  fetch(`/players/${playerId}/undraft`, { method: 'PUT' })
    .then(response => response.json())
    .catch(e => console.warn(e));
};

export const own = (playerId) => {
  fetch(`/players/${playerId}/own`, { method: 'PUT' })
    .then(response => response.json())
    .catch(e => console.warn(e));
};

export const disown = (playerId) => {
  fetch(`/players/${playerId}/disown`, { method: 'PUT' })
    .then(response => response.json())
    .catch(e => console.warn(e));
};
