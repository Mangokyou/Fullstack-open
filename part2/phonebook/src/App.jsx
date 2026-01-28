import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", number: "" });
  const [newFilter, setNewFilter] = useState("");
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
      console.log(initialPhonebook)
    });
  }, []);

  const addEntry = (event) => {
    event.preventDefault();

    const exists = persons.some((p) => p.name === newEntry.name);
    if (exists) {
      const change = confirm(
        `${newEntry.name} is already added to phonebook, replace the old number with a new one?`,
      );

      console.log(change)

      if (change) {
        phonebookService
          .alterEntry(
            persons.find((x) => x.name === newEntry.name),
            newEntry.number,
          )
          .then((returnedEntry) => {
            setPersons(
              persons.map((p) => (p.id !== returnedEntry.id ? p : returnedEntry)),
            );
          });
        setNewEntry({ name: "", number: "" });

        setNewNotification({
          message: `${newEntry.name}'s number was changed`,
          class: "newEntry",
        });
        setTimeout(() => {
          setNewNotification(null);
        }, 5000);
        return;
      } else {
        setNewEntry({ name: "", number: "" });
        return;
      }
    }

    const newPerson = {
      name: newEntry.name,
      number: newEntry.number,
    };

    phonebookService.create(newPerson).then((returnedEntry) => {
      setPersons(persons.concat(returnedEntry));
      setNewEntry({ name: "", number: "" });
      setNewNotification({
        message: `${returnedEntry.name} was added to the phonebook`,
        class: "newEntry",
      });
      setTimeout(() => {
        setNewNotification(null);
      }, 5000);
    })
    .catch(error => {
      setNewNotification({
        message: error.response.data.error,
        class: "error"
      });
      setTimeout(() => {
        setNewNotification(null);
      }, 5000);
    })

  };

  const deleteEntry = (event) => {
    console.log("works");
    console.log(event.target.value);

    if (confirm("Do you want to delete " + event.target.name)) {
      phonebookService.deleteEntry(event.target.value).then((returnedEntry) => {
        console.log("returned", returnedEntry);
        setPersons(
          persons.filter((person) => person.id !== event.target.value),
        );

        setNewNotification({
          message: `${event.target.name} was removed from the phonebook`,
          class: "newEntry",
        });
        setTimeout(() => {
          setNewNotification(null);
        }, 5000);
      })
      .catch(() => {
        setNewNotification({
          message: `${event.target.name} was already removed from the server`,
          class: "error",
        });
        setTimeout(() => {
          setNewNotification(null);
        }, 5000);
        setPersons(persons.filter((n) => n.id !== event.target.value))
      })
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setNewEntry({ name: value, number: newEntry.number });
    else if (name === "number")
      setNewEntry({ name: newEntry.name, number: value });
  };

  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const filteredEntries =
    newFilter.length == 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={newNotification} />
      <Filter onChange={handleFilterChange} newFilter={newFilter} />
      <h3>Add a new number</h3>
      <PersonForm
        newEntry={newEntry}
        addEntry={addEntry}
        onChange={handleChange}
      />
      <h3>Numbers</h3>
      <PersonList persons={filteredEntries} onClick={deleteEntry} />
    </div>
  );
};

export default App;
