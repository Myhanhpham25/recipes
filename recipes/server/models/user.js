const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({

	name: String, 
	email: String,
	password: String,
	favorites: [],
	item: [{
		food_title: String,
		image_url: String,
		ingredients: String,
		instructions: String,
		votes: Number, 
		comments: [],
	}],

}, {timestamps: true})


mongoose.model("User", UserSchema)