import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const password="ILoveProgramming";
const blogWeb =[
    {id:1, title: "Using EJS- Express- Node"},
    {id:2, title:"Learning Web Develpment"}
]
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    res.render("../view/page/homepage.ejs",{blogWeb});
})
var name ="";
function getName(req,res,next){
    name = req.body["nameUser"];
    next();
    }
app.use(getName);
app.get("/page/:id",(req,res)=>{
const pageID= req.params['id'];
const page = blogWeb.find((page) => page.id==pageID);
if (page){
    res.render(`../view/page/page${page.id}.ejs`,{page});
}
else {
res.status(404).sendFile(__dirname+`/view/src/404.html`);
}
})
app.get("/login",(req,res)=>{
    res.render("../view/page/login.ejs",{name});
})
app.post("/check",(req,res)=>{
    var type = req.body['password'];
    if (type=== password&& name==="Ha"){
        res.render("../view/src/congratulation.ejs");
    } 
})
app.post("/game",(req,res)=>{
    res.sendFile(__dirname+"/view/src/game.html");
})
app.get("/contact",(req,res)=>{
    res.render("../view/src/contact.ejs");
})
app.get("/about",(req,res)=>{
    res.render("../view/src/about.ejs");
})
app.get("/game",(req,res)=>{
    res.sendFile(__dirname+"/view/src/game.html");
})
app.listen(port,()=>{
    console.log(`Sever is running on ${port} `);
})