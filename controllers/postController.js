const post =require('../models/postModel');

const createPost = async (req, res) => {
  try{
    const newpost =new post ({
      title: req.body.title,
      date: req.body.date,
      image:req.file.filename,
    });
    const postData= await newpost.save();
    res.status(200).send({
      message: 'Post created successfully',
      data:postData,
    });
  }catch(err){
    res.status(400).send(err.message);
}
}

const getPosts = async (req, res) => {
  try {
    const Posts=await post.find({});
    res.status(200).send({scucess:true,
      message: 'Posts fetched successfully',
      data: Posts,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await post.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send({ success: false, message: 'Post not found' });
    }

    res.status(200).send({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const date = req.body.date;

    if (req.file !== undefined) {
      const image = req.file.filename;

      await post.findByIdAndUpdate(
        { _id: id },
        { $set: { title, date, image } }
      );

      res.status(200).send({
        success: true,
        message: 'Post updated successfully with image',
      });
    } else {
      await post.findByIdAndUpdate(
        { _id: id },
        { $set: { title, date } }
      );

      res.status(200).send({
        success: true,
        message: 'Post updated successfully without image',
      });
    }
  } catch (error) {
    console.error('❌ Update Error:', error);
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = {
     createPost,getPosts,deletePost,updatePost
}