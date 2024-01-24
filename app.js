const peoples = require("./data.js");
console.log(peoples);

const express = require("express");
const { request, response } = require("express");
const app = express();

// gauni visus irasus
app.get("/mano/routas", (request, response) => {
  response.send(peoples);
});

// gauni irasa pagal id
app.get("/mano/routas/:id", (req, res) => {
  const people = peoples.find(
    (person) => person.id === parseInt(req.params.id)
  );

  if (!people) {
    res.status(404).send("Person doesn't exist");
  }
  res.send(people);
});

// ant vaizdo prideda nauja zmogeliuka
app.post("/mano/routas", (req, res) => {
  const newPerson = {
    id: 21,
    first_name: "Kestutis",
    last_name: "Sigma",
    gender: "Mechanic",
  };

  peoples.push(newPerson);
  res.send(peoples);
});

// atnaujina peaple info tik data.js existuojanciuose
app.put("/mano/routas/:id", (req, res) => {
  const infoUpdate = peoples.find(
    (person) => person.id === parseInt(req.params.id)
  );

  if (!infoUpdate) {
    res.status(404).send("Person doesn't exist");
  }
  infoUpdate.gender = req.body.gender;
  res.send(infoUpdate);
});

//istrina zmogeliuka pagal id
app.delete("/mano/routas/:id", (req, res) => {
  const infoDelete = peoples.find(
    (person) => person.id === parseInt(req.params.id)
  );

  if (!infoDelete) {
    res.status(404).send("Person doesn't exist");
  }
  const personIndex = peoples.indexOf(infoDelete);
  peoples.splice(personIndex, 1);

  res.send(infoDelete);
});

app.use(express.json());

const PORT = 5000;

app.listen(PORT || 5000, () => {
  console.log("server is running on port " + PORT);
});
