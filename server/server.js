const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./utils/features");
const { config } = require("dotenv");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const { errorMiddleware } = require("./middleware/error");

// const userRouter = require("./routes/user");
const registerRouter = require("./routes/registerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const TestList = require("./models/testlist");
const authenticate = require("./middleware/authenticate");

const app = express();
app.use(cookieParser());


app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOptions = {
  origin: "http://localhost:5173", // replace with your client's origin
  credentials: true, // this allows the cookie to be sent with the request
};

app.use(cors(corsOptions));

config({
  path: "./.env",
});

connectDB();
const port = process.env.PORT || 5000;

app.use("/api/v1/register", registerRouter);
app.use("/api/v1/users", adminRoutes);


app.post('/TestListing', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const {name,TestType,TestPrice} = data;
    
    if (!name || !TestType || !TestPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);

    console.log(decoded)
  
    const newTest = await TestList.create({ 
      owner:decoded.id,
      testName:name,
      testType:TestType,
      testPrice:TestPrice,
     });
    console.log(newTest);

   
   return res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/labtests', async (req, res) => {
  try {
    const tests = await TestList.find(); // Fetch all tests from the database
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/labs', async (req, res) => {
  try {
    const tests = await Laboratory.find(); // Fetch all tests from the database
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/mytests', authenticate, async (req, res) => {
  try {
    const tests = await TestList.find({ owner: req.userId }); 
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/test/:id', async (req, res) => {
  try {
      const testId = req.params.id;
      await TestList.findByIdAndDelete(testId);
      res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
      console.error('Error deleting test:', error);
      res.status(500).json({ message: 'Error deleting test' });
  }
});

app.get('/tests/:id', async (req,res) =>{ // to get data of tests 
  try{
    const test = await TestList.findById(req.params.id);
    if(!test){
      return res.status(404).json({message : 'test is not found'})
    }
    res.json(test);
  }
  catch(e){
    res.status(500).json({message: 'internal server error'});
  }
})


app.put('/tests/:id', async (req,res) =>{
  const {testName, testType, testPrice} = req.body;
  try{
    const test = await TestList.findByIdAndUpdate(
      req.params.id,
      {testName, testType, testPrice},
      {new:true}
    );
    if(!test){
      return res.status(404).json({ message: 'test not found' });
    }
    res.json(test);
  }
  catch(e){
    res.status(500).json({ message: 'Server error' });
  }

})


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(errorMiddleware);
