const express= require('express');
const app= express();

const cors= require('cors');
app.use(cors({origin: '*'}));

const mongoose= require('mongoose');
mongoose.connect(
    'mongodb+srv://niku2003:niku%402003@clustercrud2025.tm0pnky.mongodb.net/Crud_Mern?retryWrites=true&w=majority&appName=ClusterCrud2025',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('✅ MongoDB Atlas connected!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

const Post_route= require('./routes/postRoute');

app.use('/api',Post_route);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})