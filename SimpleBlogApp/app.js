var express    		 = require('express'),
	app        		 = express(),
	bodyParser 		 = require('body-parser'),
	mongoose   		 = require('mongoose'),
	methodOverride   = require('method-override');

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String, 
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

app.get("/", function(req, res){
	res.redirect("/blogs");
})

//Index route
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index", {blogs});
		}
	});
});
//NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
	//create blog
	var title = req.body.title;
	var image = req. body.image;
	var body = req.body.body;
	Blog.create({
		title: title,
		image: image,
		body: body
	}, function(err, newBlog){
		if(err){
			console.log(err);
		}else{
			//redirect to the index page
			res.redirect("/blogs");
		}
	});
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog});
		}
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	var title= req.body.title;
	var image= req.body.image;
	var body= req.body.body;
	Blog.findOneAndUpdate({"_id": req.params.id}, {
		title: title,
		image: image,
		body: body
	}, function(err, update){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id",function(req, res){
	Blog.findOneAndRemove(
		{'_id': req.params.id},function(err){
			if(err){
				res.redirect("/");
			}else{
				res.redirect("/");
			}
		});
});

app.listen(9786, function(){
	console.log("Server is running.");
});