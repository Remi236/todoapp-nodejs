const { v4: uuid } = require('uuid');
const db = require("../db");
module.exports = {
	
	get: (req,res) => res.json(db.get("todos").value()),

	search: (req,res) => {
		var query = req.query.q;
		var todos  = db.get("todos").value();
		var mathchedTodos = todos.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
		res.json(mathchedTodos);
	},

	getDetail: (req,res) => {
		var id = parseInt(req.params.id);
		var item = db.get("todos").find({id: id}).value();
		item ? res.json(item) : res.json({});
	},

	add: (req,res) =>  {
		req.body.id = db.get("todos").size().value();
		try {
			req.body.id = uuid();
			req.body.isComplete = false;
			req.body.description = req.body.description || "";
			db.get("todos").push(req.body).write();
			res.json({success: true});
		}
		catch(err) {
			res.json({success: false, message: err});
		}
	},

	delete: (req,res) => {
		try {
			var id = parseInt(req.params.id);
			db.get("todos").remove({id: id}).write();
			res.json({success: true});
		}
		catch(err) {
			res.json({success: false, message: err});
		} 
	},

	update: (req,res) => {
		try {
			var id = parseInt(req.params.id);
			db.get("todos").find({id: id}).assign(req.body).write();
			res.json({success: true});
		}
		catch(err) {
			res.json({success: false, message: err});
		} 
	}
};