const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./utils/features");
const { config } = require("dotenv");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const { errorMiddleware } = require("./middleware/error");
const TestBook =require('./models/testbook')
// const userRouter = require("./routes/user");
const registerRouter = require("./routes/registerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const TestList = require("./models/testlist");
const Laboratory = require("./models/labortary")
const authenticate = require("./middleware/authenticate");
const medlist = require("./models/medlist");
const { authenticator } = require("./middleware/authenticator");
const pharmacy = require("./models/pharmacy");
const MedBook = require("./models/MedBook");

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




app.get('/labs', async (req, res) => {
  try {
    const labs = await Laboratory.find(); 
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/tests/:labId', async (req, res) => {
  const { labId } = req.params;
  console.log(labId,'lad idd')
  try {
      const tests = await TestList.find({ owner: labId });
      console.log(tests)
      return res.status(200).json(tests)
      // res.json(tests); 
  } catch (error) {
      console.error('Error fetching tests:', error);
      res.status(500).json({ message: 'Error fetching tests' });
  }
});

app.get('/booktests/:id', async (req, res) => {
  try {
      const test = await TestList.findById(req.params.id);
      if (!test) {
          return res.status(404).json({ message: 'Test not found' });
      }
      return res.status(200).json(test);
  } catch (error) {
      console.error('Error fetching test:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/bookingtests', async (req, res) => {
  try {
  
    const data = req.body;
    console.log(data)
    const { testName, testType, testPrice,LabID,TestID} = data;

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    console.log(decoded);
      const newTestBook = new TestBook({
          testName:testName,
          testType:testType,
          testPrice:testPrice,
          PatientID: decoded.id,
          LabID: LabID,
          TestID: TestID,
  
      });
      await newTestBook.save();

      res.status(201).json({ message: 'Test booked successfully!' });
  } catch (error) {
      console.error('Error booking test:', error);
      res.status(500).json({ error: 'Failed to book the test' });
  }
});


app.get('/mypatienttests', authenticate, async (req, res) => {
  try {
    const Bookedtests = await TestBook.find({ PatientID: req.userId }); 
    res.status(200).json(Bookedtests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/lab/bookings', async (req, res) => {
  try {
      const token = req.cookies['jwt'];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const labId = decoded.id;

      const bookings = await TestBook.find({ LabID: labId });

      res.status(200).json(bookings);
  } catch (error) {
      console.error('Error fetching lab bookings:', error);
      res.status(500).json({ error: 'Failed to fetch lab bookings' });
  }
});



app.post('/MedListing', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const { medName,medgrams,medPrice} = data;
    
    if (!medName || !medgrams || !medPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);

    console.log(username,'username')
  
    const newMed = await medlist.create({ 
     Pharmacyowner:decoded.id,
     medName:medName,
     medgrams:medgrams,
     medPrice:medPrice
     });
    console.log(newMed,'new med');

   
   return res.status(201).json({ message: 'Med created successfully', med: newMed });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/mymeds',authenticate, async (req, res) => {   
  try {
    const meds = await medlist.find({ Pharmacyowner: req.userId }); 
    res.status(200).json(meds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/mymeds/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await medlist.deleteOne({ _id: id, Pharmacyowner: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/mymeds/:id', async (req,res) =>{ 
  try{
    const med = await medlist.findById(req.params.id);
    if(!med){
      return res.status(404).json({message : 'med is not found'})
    }
    res.json(med);
  }
  catch(e){
    res.status(500).json({message: 'internal server error'});
  }
})

app.put('/mymed/:id', async (req,res) =>{
  const {medName, medgrams, medPrice} = req.body;
  try{
    const med = await medlist.findByIdAndUpdate(
      req.params.id,
      {medName, medgrams, medPrice},
      {new:true}
    );
    if(!med){
      return res.status(404).json({ message: 'med not found' });
    }
    res.json(med);
  }
  catch(e){
    res.status(500).json({ message: 'Server error' });
  }

})

app.get('/Pharms', async (req, res) => {
  try {
    const Pharmacies = await pharmacy.find(); 
    res.status(200).json(Pharmacies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/meds/:medId', async (req, res) => {
  const { medId } = req.params;
  console.log(medId,'idd')
  try {
      const meds = await medlist.find({ Pharmacyowner: medId });
      console.log(meds)
      return res.status(200).json(meds)
  } catch (error) {
      console.error('Error fetching meds:', error);
      res.status(500).json({ message: 'Error fetching meds' });
  }
});

app.get('/PharmacyMeds/:id', async (req, res) => {
  try {
      const meds = await medlist.findById(req.params.id);
      if (!meds) {
          return res.status(404).json({ message: 'Test not found' });
      }
      return res.status(200).json(meds);
  } catch (error) {
      console.error('Error fetching test:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/bookingmeds', async (req, res) => {
  try {
  
    const data = req.body;
    console.log(data)
    const {medName, medgrams, medPrice,Pharmacyowner,MedID,} = data;

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    console.log(decoded);
      const newMedBook = new MedBook({
          medName:medName,
          medgrams:medgrams,
          medPrice:medPrice,
          PatientID: decoded.id,
          Pharmacyowner: Pharmacyowner,
          MedID: MedID,
  
      });
      await newMedBook.save();

      res.status(201).json({ message: 'Med booked successfully!' });
  } catch (error) {
      console.error('Error booking test:', error);
      res.status(500).json({ error: 'Failed to book the test' });
  }
});





app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(errorMiddleware);
