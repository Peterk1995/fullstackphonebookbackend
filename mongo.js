const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.cznwsjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Only the password was provided, list all entries
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error fetching persons:', err);
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Password, name, and number were provided, add new entry
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error saving person:', err);
    mongoose.connection.close();
  });
} else {
  console.log('Incorrect number of arguments. Usage: node mongo.js <password> [<name> <number>]');
  mongoose.connection.close();
} 

