export const draft = (playerId) => {
  fetch(`/players/${playerId}/draft`)
    .then(response => response.json())
};

export const undraft = (playerId) => {
  fetch(`/players/${playerId}/undraft`)
    .then(response => response.json())
};

export const own = (playerId) => {
  fetch(`/players/${playerId}/own`)
    .then(response => response.json())
};

export const disown = (playerId) => {
  fetch(`/players/${playerId}/disown`)
    .then(response => response.json())
};
