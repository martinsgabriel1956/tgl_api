import Route from "@ioc:Adonis/Core/Route";

Route.get("/user", "UsersController.show").middleware(["auth"]);
Route.delete("/users/:id", "UsersController.delete").middleware([
  "auth",
]);
Route.put("/users/", "UsersController.update").middleware("auth");

Route.get("/users", "UsersController.index");
Route.post("/users", "UsersController.store");
Route.post("/login", "SessionsController.store");

Route.post("/forgot_password", "ForgotPasswordsController.store");
Route.put("/reset_password", "ForgotPasswordsController.update");

Route.get("/games", "GamesController.index");

Route.group(() => {
  Route.post("/games", "GamesController.store");
  Route.put("/games", "GamesController.update");
  Route.delete("/games", "GamesController.destroy");
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("/bets", "BetsController").apiOnly();
}).middleware("auth");
