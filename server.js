const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(morgan('tiny'));

morgan.token('body', (req) => JSON.stringify(req.body));

let persons = [
  {
    name: 'Arto Hellas',
    number: '7777',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'poop',
    number: '6786',
    id: 5,
  },
];

//@desc Gets landing page
//@Route  GET '/'
app.get('/', async (req, res) => {
  await res.json('hello world');
});

//@desc Gets our persons array
//@Route  GET '/api/persons'
app.get('/api/persons', async (req, res) => {
  await res.json(persons);
});

//@desc Gets a single person
//@Route  GET '/api/persons/id'
app.get('/api/persons/:id', async (req, res) => {
  const id = await req.params.id;
  console.log(id);
  let person = persons.find((p) => p.id == id);
  res.json(person);
});

//@desc creates a new person
//@Route  POST '/api/persons'
app.post('/api/persons', async (req, res) => {
  const person = await req.body;
  console.log(person);

  if (!person.name) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  if (persons.includes(person.name)) {
    return res.status(400).json({
      error: 'Name must be unique',
    });
  }

  const personObject = {
    name: person.name,
    number: person.number,
    id: Math.floor(Math.random() * 100000),
  };
  console.log(personObject);
  persons = persons.concat(personObject);
  res.json(personObject);
});

//@desc Gets information
//@Route  GET '/info'
app.get('/info', async (req, res) => {
  const date = new Date();
  await res.send(`<p>PhoneBook has info for 4 people<p> ${date}`);
});

//@desc deletes a person
//@Route  delete '/api/persons/id'
app.delete('/api/persons/:id', async (req, res) => {
  const person = await Number(req.params.id);
  persons = persons.filter((p) => p.id !== person.id);

  res.status(204).end();
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
