const mongoose = require("mongoose")
const User = mongoose.model("User")


module.exports = {

	get_users: (req, res) => {
		User.find({})
			.then(users => res.json(users))
			.catch(err => {
				console.log("user find all errors", err)
				res.status(500).json(err)
		})
	},

	login: (req, res) => {
		User.findOne({email: req.body.email})
			.then(user => {
				if(user){
					req.session.user = user
					username = req.session.user.name
					res.json({username: username})

				} else {
					let new_user = new User(req.body)
					new_user.save()
			.then(() => {
				req.session.user = new_user
				username = req.session.user.name 
				res.json({username: username})
			})
			.catch(err => {
				console.log("User save error", err)
				res.status(500).json(err)
				})
			}
		})	
	},

	favorites: (req, res) => {
		id = req.session.user._id
		let favorite_recipe = {image_url: req.body.image_url, recipe_id: req.body.recipe_id, title : req.body.title}
		console.log(favorite_recipe)
		User.findOne({_id:id})	
			.then(user => {
				if(user){
					let flag = true
					for(var x = 0; x < user.favorites.length; x++){
					if(user.favorites[x].recipe_id == req.body.recipe_id){
						flag = false 
					}
				}
				if(flag == true){
					user.favorites.push(favorite_recipe)
					user.save()
					let user_favorite = user.favorites
					res.json({favorites: user_favorite})
				}else{
					res.json({message:"Recipe already been added to your Recipe Book!"})
				}
			}
		})
			.catch(err => {
				console.log("User save error", err)
				res.status(500).json(err)
			})
	},

	user_favorites: (req, res) => {
		console.log("Session id", req.session.user)
		id = req.session.user._id
		User.findOne({ _id:id})
			.then(user => {
				if(user){
				let user_favorite = user.favorites
				res.json(user_favorite)
			}
		})
			.catch(err => {
				console.log("get favorites logic js errors", err)
				res.status(500).json(err)
		})
	},

	destroy: (req, res) => {
		recipe_id = req.body.recipe_id
		id = req.session.user._id
		User.update({ _id:id}, {$pull: {favorites : {recipe_id :recipe_id }}})
			.then(user => {
				if(user){
					res.json(true)
				}
			})
			.catch(err => {
				console.log("destory recipe method errors", err)
				res.status(500).json(err)
		})
	},

	logout: (req, res) => {
		req.session.destroy()
		res. redirect('/login')
	},

	addRecipe: (req, res) => {
		console.log("add recipe logics.js")

		id = req.session.user._id
		let add_recipe = {food_title: req.body.food_title, image_url: req.body.image_url, ingredients : req.body.ingredients, instructions : req.body.instructions}

		User.findOne({_id:id})	
			.then(user => {
				if(user){
					user.item.push(add_recipe)
					user.save()
					user_recipe = req.session.user.item
					console.log(user_recipe)
				res.json(true)
			}
		})
			.catch(err => {
				console.log("User save error", err)
				res.status(500).json(err)

			})
	},

	user_recipes: (req, res) =>{
		console.log("get user_recipes logics.js")
		id = req.session.user._id
		User.findOne({ _id:id})
			.then(user => {
				if(user){
			let user_recipes = user.item
			res.json(user_recipes)
			}
		})
			.catch(err => {
				console.log("get favorites logic js errors", err)
				res.status(500).json(err)
			})
	},

	erase: (req, res) => {
		item_id = req.body._id
		id = req.session.user._id
		User.update({ _id:id}, {$pull: {item : {_id :item_id }}})
			.then(user => {
				if(user){
				res.json(true)
			}
		})
			.catch(err => {
				console.log("erase added recipe method errors", err)
				res.status(500).json(err)
			})
	},

	save_user_item: (req, res) => {
		console.log("save_user_recipe logics.ts")
		id = req.session.user._id
		let item_recipe = {_id: req.body._id, food_title: req.body.food_title, image_url: req.body.image_url, ingredients : req.body.ingredients, instructions : req.body.instructions}
		User.findOne({_id:id})	
			.then(user => {
				if(user){
					let flag = true
					for(var i = 0; i< user.item.length; i++){
					if(user.item[i]._id == req.body._id){
					flag = false 
				}
			}
				if (flag == true){
					user.item.push(item_recipe)
					user.save()
					let user_item = user.item
					console.log(user_item)
					res.json({item: user_item})
			}else{
					res.json({message:"Recipe already been added to your Recipe Book!"})
				}
			}
		})
			.catch(err => {
				console.log("User save error", err)
				res.status(500).json(err)
		})
	},

	check: (req, res) => {
		if(req.session.user){
			res.json(req.session.user)
		} else {
			res.status(401).json(false)
		}
	},
}

