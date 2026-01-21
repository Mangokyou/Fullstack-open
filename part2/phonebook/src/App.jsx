import { useState } from "react";
import Entry from './components/Entry'


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addEntry = (event) => {
    event.preventDefault();

    const exists = persons.some((p) => p.name === newName);

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const newEntry = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    };

    setPersons(persons.concat(newEntry));
    setNewName("");
    setNewNumber("");
  };

  const handleEntryChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    if (newFilter.length == 0) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
    setNewFilter(event.target.value);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        {" "}
        filter shown with:{" "}
        <input value={newFilter} onChange={handleFilterChange} />{" "}
      </div>
      <form onSubmit={addEntry}>
        <div>
          {" "}
          name: <input value={newName} onChange={handleEntryChange} />{" "}
        </div>
        <div>
          {" "}
          number: <input value={newNumber} onChange={handleNumberChange} />{" "}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Entry key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
