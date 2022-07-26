export const PersonsForm = ({ onSubmit,newName,setNewName,newNumber,setNewNumber }) =>{

    return(
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={ ({target}) => { setNewName(target.value); }}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={ ({target}) => { setNewNumber(target.value); }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export const Filter  = ({ filter, setFilter }) =>(
    <p>Filter shown with <input value={filter} onChange={ ({target}) => { setFilter(target.value); }}/></p>
  );

const Persons = ({ persons,deletePerson }) =>(
    <>
      {
        persons.length === 0 ?
          <p>No Contacts to show</p> :
          persons.map( p => 
            <p key={p.name}>{p.name} {p.number} 
              <button onClick={()=>{deletePerson(p)}}>Delete</button>
            </p>)
      }
    </>
  )


export default Persons;