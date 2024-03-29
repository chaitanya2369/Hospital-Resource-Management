const Hospitals = require("../models/hospitals");

module.exports.home = function (req, res) {
  res.render('home', {
    title: 'Hospital Resource Management'
  });
}

module.exports.homepage = async function (req, res) {
  try {
    // Fetch the hospital data from the database
    const locationQuery = req.body.location.toLowerCase();

    const hospitalsData = await Hospitals.find({'location': locationQuery});

    // Log the fetched data
    console.log("Hospitals data:", hospitalsData);

    // Render the template with the fetched data
    res.render('hospitalsData', {
      title: 'Home page',
      Hospitals: hospitalsData,
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    // Handle the error appropriately
    res.status(500).send("Internal Server Error");
  }
}


module.exports.resourcesearch = async function (req, res) {
    try {
       const resourceQuery = req.query.resource;
      console.log("resource is: ",resourceQuery);
       // Fetch hospitals that have the specified resource
       const hospitalsData = await Hospitals.find({ 'resource': resourceQuery });
      console.log("hospitalData is: ",hospitalsData);
       console.log("Now rendering the page");
       res.render('hospitalsData', {
          title: 'Search Results',
          Hospitals: hospitalsData,
       });
    } catch (error) {
       console.error("Error searching hospitals by resource:", error);
       res.status(500).send("Internal Server Error");
    }
 }
module.exports.resourcesearchs = async function (req, res) {
    try {
       const resourceQuery = req.body.resource;
      console.log("resource is: ",resourceQuery);
       // Fetch hospitals that have the specified resource
       const hospitalsData = await Hospitals.find({ 'resource': resourceQuery });
      console.log("hospitalData is: ",hospitalsData);
       console.log("Now rendering the page");
       res.render('hospitalsData', {
          title: 'Search Results',
          Hospitals: hospitalsData,
       });
    } catch (error) {
       console.error("Error searching hospitals by resource:", error);
       res.status(500).send("Internal Server Error");
    }
 }

 module.exports.hospitalDetails = async function(req,res){
   var id = req.query.id;
  console.log(id);
  const hospitalData = await Hospitals.findById(id);
  res.render('hospitalDetails',{
  title: 'hospitalName',
  hospital_datas : hospitalData
});
}