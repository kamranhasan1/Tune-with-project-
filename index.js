const express = require('express');
const collection=require("mongodb");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose=require("mongoose")


const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// // Serve static files from the public directory
app.use('/css', express.static(__dirname + '/css'));
app.use('/picture', express.static(__dirname + '/picture'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/scss', express.static(__dirname + '/scss'));
app.use('/public', express.static(__dirname + '/public'));


//login
mongoose.connect('mongodb://localhost:27017/UserDetails')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }
        
        const newUser = new User({ username, password });
        await newUser.save();
        res.sendFile(path.join(__dirname, 'indexx.html'));
        console.log('User signed up successfully');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Error signing up');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        if (password !== user.password) {
            return res.status(401).send('Incorrect password');
        }
        res.sendFile(path.join(__dirname, 'indexx.html'));
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'indexx.html'));
});

// Route for page1
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','about.html'));
});

// Route for page2
// app.get('/blog', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','blog.html'));
// });

// app.get('/class', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','class.html'));
// });
// app.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','contact.html'));
// });
// app.get('/detail', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','detail.html'));
// });

// app.get('/team', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','team.html'));
// });
// app.get('/testimonial', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','testimonial.html'));
// });

// app.post("/contact1",async (req,res)=>{
//     const data={
//         name:req.body.name1,
//         email:req.body.email,
//         subject:req.body.subject,
//         message:req.body.message,
//     }
//     try {
//         // await collection.insertMany([data]);
//         res.sendFile(path.join(__dirname,'public', 'contact.html'));
//         console.log("Data Added");

//     } catch (error) {
//         console.error("Error inserting data:", error);
//         res.status(500).send(`Error occurred while saving contact information: ${error.message}`);
//     }
// })




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});















