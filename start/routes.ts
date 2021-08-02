import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/users/:id", "UsersController.show")
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.delete");
}).middleware(['auth'])

Route.get("/users", "UsersController.index");
Route.post("/users", "SessionsController.store");
Route.post("/user", "UsersController.store");

Route.post("/forgot_password", "ForgotPasswordsController.store");
Route.put("/reset_password", "ForgotPasswordsController.update");

Route.get('/games', 'GamesController.index');
Route.get('/games/:id', 'GamesController.show');
Route.post("/games", "GamesController.store");
Route.put("/games/:id", "GamesController.update");
Route.delete("/games/:id", "GamesController.destroy");

Route.get('/bets', 'BetsController.index');
Route.get('/bet/:id', 'BetsController.show');
Route.post('/new_bet', 'BetsController.store');
Route.delete('/bets/:id', 'BetsController.destroy');
Route.put('/bets/:id', 'BetsController.update');