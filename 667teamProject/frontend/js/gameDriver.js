async function createGame(game) {
  const new_game = await fetch('/api/game', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((game_data) => {
      const game_host = fetch('/api/game-user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: game_data.id,
          user_id: game_data.gameHostId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.open(`/game/${game_data.id}`, '_blank');
          return data;
        });
      return game_data;
    });
  return new_game;
}

