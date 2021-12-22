require('dotenv').config();
const mongoose = require('mongoose');


//let Person;

const mySecret = process.env['MONGO_URI'];//check this for error
mongoose.connect(mySecret, {userNewUrlParser: true, useUnifiedTopology: true});

//Schema
const personSchema = mongoose.Schema({
  "name": {
    "type": String,
    "required": true
  },
  "age": {
    "type": Number,
    "required": true
  },
  "favoriteFoods": [String]
});

//Model
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  //new Person Document to be saved in the DB. 
  const luderioSanchez = new Person({
  "name": "Luderio Rubis Sanchez Jr.",
  "age": 23,
  "favoriteFoods": ["Pasta", "Meats", "Dick"]
  });

  luderioSanchez.save((err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });

  
};

let arrayOfPeople = [
{
  "name": "Ian Rusiana.",
  "age": 24,
  "favoriteFoods": ["Pasta", "Meats", "Fruits"]
},
{
  "name": "Ma. Ella Rusiana.",
  "age": 8,
  "favoriteFoods": ["Pasta", "Meats", "Fruits"]
},
{
  "name": "Hero Rusiana.",
  "age": 13,
  "favoriteFoods": ["Pasta", "Meats", "Fruits"]
}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, people) => {
    if (error) return console.log(error);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({"name": personName}, (error, personFound) => {
    if (error) return console.log(error);
    done(null , personFound);
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({"favoriteFoods": food}, (error, foodFound) => {
    if (error) return console.log(error);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({"_id": personId}, (error, personId) => {
    if (error) return console.log(error);
    done(null, personId);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
    Person.findById({"_id": personId}, (error, person) => {
    if (error) return console.log(error);

    person.favoriteFoods.push(foodToAdd);

    person.save((error, updatedRecord) => {
      if(error) return console.log(error);
      done(null, updatedRecord);
    });
    
    
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name": personName}, {age: ageToSet}, {new: true}, (error, updatedRecords) => {
    if (error) return console.log(error);
    done(null, updatedRecords);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({"_id": personId}, (error, person) => {
    if (error) return console.log(error)
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({"name": nameToRemove}, (error, person) => {
    if (error) return console.log(error);
    done(null, person);
  });

  
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  const callback = (error, person) => {
  if (error) return console.log(error);
    done(null, person);
}

  Person.find({"favoriteFoods": foodToSearch})
  .sort({"name": 1})
  .limit(2)
  .select({age: 0})
  .exec(callback)

};

//------------------------------------------------------







































//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
