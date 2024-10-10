
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const bannerRoutes = require('./routes/bannerRoutes');
const aboutRoutes = require('./routes/aboutRoute');
const aboutHomeRoutes = require('./routes/homeAboutRoute');
const spotlightRoutes = require('./routes/spotlightRoute');
const alumniRoutes = require('./routes/alumniRoute');
const academicSpectrumRoutes = require('./routes/academicRoute');
const beingUnique = require('./routes/being-unique');
const direcorMsg = require('./routes/directorRoute');
const facultyRoute = require('./routes/facultyRoute');
const awardRoute = require('./routes/awardRoute');
const learningRoute = require('./routes/learningRoute');



const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());


const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log(('Connected to MongoDB Atlas')))
.catch((err) => console.error('Failed to connect to MongoDB Atlas', err));

app.use('/api/banner-images', bannerRoutes); // Register the banner routes
app.use('/api/about', aboutRoutes);
app.use('/api/home-about', aboutHomeRoutes);
app.use('/api/spotlights', spotlightRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/academic-spectrum', academicSpectrumRoutes);
app.use('/api/being-unique', beingUnique);
app.use('/api/director-msg', direcorMsg);
app.use('/api/faculty', facultyRoute);
app.use('/api/awards', awardRoute);
app.use('/api/learning-stage', learningRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
