const path= require("path")
const logics = require('./../controllers/logics.js')

module.exports = app => {
	app.post("/login", logics.login)
	app.post("/favorites", logics.favorites)
	app.get("/user_favorites", logics.user_favorites)
	app.get("/get_users", logics.get_users)
	app.post("/destroy", logics.destroy)
	app.get('/logout', logics.logout)
	app.post("/addRecipe", logics.addRecipe)
	app.get("/user_recipes", logics.user_recipes)
	app.post("/erase", logics.erase)
	app.post("/save_user_item", logics.save_user_item)
	app.get("/check", logics.check)


	app.get("*", (req, res) => res.sendFile(path.resolve("./client/dist/index.html")))

}