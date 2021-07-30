import Route from "@ioc:Adonis/Core/Route";

Route.get("/user/:id", "UsersController.show")
Route.put("/user/:id", "UsersController.update");
Route.delete("/logout/:id", "UsersController.delete");

Route.get("/users", "UsersController.index");
Route.post("/login", "SessionsController.store");
Route.post("/register", "UsersController.store");
Route.post("/forgot_password", "ForgotPasswordsController.store");
Route.put("/reset_password", "ForgotPasswordsController.update");
