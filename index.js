// Imports
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Constants
const app = express();
const port = 3001;

// EJS & BodyParser
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded( {extended: true} ));


// show a random joke immediately
// code adapated from the Lecture Video: 
// Making Server-Side Requests with Axios
app.get("/", async (req, res) => {
   try {
      var response = await axios.get("https://v2.jokeapi.dev/joke/Any");
      const joke = response.data;

      // Wrap the joke in an array
      const jokeData = [joke];
      res.render("index.ejs", { data: joke, error: null });
   } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
         data: null,
         error: error.message
      });
   }
});

app.post("/", async (req, res) => {
   try {
      console.log(req.body);
      const category = req.body.category;
      const response = await axios.get(
         `https://v2.jokeapi.dev/joke/${category}`
      );

      const result = response.data;
      console.log(result);
      res.render("index.ejs", {
         data: result,
         error: null,
      })
   } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
         error: "Something went wrong with your reqeust.",
      });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`)
});