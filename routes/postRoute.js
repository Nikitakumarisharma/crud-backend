const express= require('express');
const Post_routes= express();

const bodyParser= require('body-parser');
Post_routes.use(bodyParser.json());
Post_routes.use(bodyParser.urlencoded({extended:true}));

const multer= require('multer');
const path= require('path');

Post_routes.use(express.static('public'));

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/postImages'));
    },
    filename: function (req, file, cb) {
      const name = Date.now() + path.extname(file.originalname);
      cb(null, name);
    }
  });
  
const upload = multer({storage: multerStorage});

// backend loging ko handle krega 
const postController= require('../controllers/postController');

// postController.createPost ko call krega jab bhi koi post create hoga
Post_routes.post('/create-post',upload.single('image'),postController.createPost);

// postController.getAllPosts ko call krega jab bhi koi post get hoga
Post_routes.get('/get-posts',postController.getPosts);

Post_routes.delete('/delete-posts/:id',postController.deletePost);

Post_routes.post('/update-post',upload.single('image'),postController.updatePost);

module.exports= Post_routes;
