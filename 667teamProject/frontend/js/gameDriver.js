async function createGame(event) {
  event.preventDefault();
  const user = await getUser().then((user) => {
    return user;
  });


  const game = await fetch('/api/game', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((game_data) => {
      return game_data;
    });

  const game_host = await fetch('/api/game-user', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      game_id: game.id,
      user_id: user.id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    });


  const game_list = document.getElementById('game-list');
  const game_list_item = document.createElement('li');
  game_list_item.className = 'game-list-item';
  game_list_item.id = game.id;
  game_list_item.onclick = function () {
    window.open('/game/' + game.id, '_blank');
  };
  game_list_item.innerHTML = game.gameName;
  game_list_item.innerHTML += ' - ' + game.gameHost;
  game_list_item.innerHTML += ' - ' + game.gameStatus;
  game_list_item.innerHTML += ' - ' + game.maxPlayers;
  game_list.appendChild(game_list_item);
}
