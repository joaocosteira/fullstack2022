import './App.css';
import { useState, useEffect } from 'react';
import Persons, { PersonsForm, Filter } from './components/Persons';
import Notification from './components/Notification';
import personsServices from './services/persons';

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [notification,setNotification]=useState(null);
  const [notStyle,setNotStyle] = useState(null);

  useEffect(()=>{
    personsServices.getAll().then(r => setPersons(r.data));
  },[]);

  const addContact = (e) =>{
    e.preventDefault();
    const alreadyExist = persons.find(p => p.name.toLocaleLowerCase() === newName.toLocaleLowerCase());
    if(alreadyExist){
      if(window.confirm(`The name '${newName}' is already in use, do you want to update it?`)){
        personsServices
          .update(alreadyExist.id,{...alreadyExist , number : newNumber})
          .then( r =>{
            setPersons(persons.map(p => p.name !== r.data.name ? p : r.data));
            sendNotification(`Updated '${r.data.name}' contact successefully`,'success');
          }).catch( error => { sendNotification(error.response.data.error); });
      }
    }else{
      personsServices
        .create({ name : newName, number : newNumber })
        .then(r => {
          setPersons([...persons, r.data])
          sendNotification(`Added '${r.data.name}' contact successefully`,'success');
        }
      ).catch( error => { sendNotification(error.response.data.error); });
      
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (person) =>{
    if(window.confirm(`Delete ${person.name}?`)){
      personsServices.deleteContact(person.id)
      .then( _ =>{
        sendNotification(`The contact of '${person.name}' was successefully deleted`,'success');
      })
      .catch( _ =>{
        sendNotification(`The contact of '${person.name}' was already removed from the server`);
      })
      .finally(_ => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  const sendNotification = (msg,style="error",delay=2000) =>{

    setNotification(msg);
    setNotStyle(style);
    setTimeout(()=>{
      setNotification(null);
      setNotStyle(null); 
    },delay);
  }

  const contactsShown = searchTerm ? 
    persons.filter(p => p.name.toLocaleUpperCase().includes(searchTerm.toLocaleUpperCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} style={notStyle}/>
      <Filter filter={searchTerm} setFilter={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonsForm
        onSubmit={addContact}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={contactsShown} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
