import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';
import { useState } from 'react'
import { ALL_AUTHORS, SET_BORN } from "../queries"
const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born,setBorn] = useState('')

  const [ editAuthor ] = useMutation(SET_BORN,{
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const setBirthday = (e) => {
    e.preventDefault();
    editAuthor({ variables : { name : selectedAuthor.label , born : Number(born) }})
    setSelectedAuthor(null);
    setBorn('');
  }

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading...</div>
  }

  if(result.data.allAuthors){
    const authors = result.data.allAuthors
    const options = authors.reduce((o,a) => !a.born ? [...o,{ value: a.name, label: a.name }] : o,[])

    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          options.length > 0 &&
          <div>
            <h2>Set Birthday</h2>
            <Select
                defaultValue={selectedAuthor}
                onChange={setSelectedAuthor}
                options={options}
                placeholder="Set Birthday"
                value={selectedAuthor}
              />
            {
              selectedAuthor &&
              <form onSubmit={setBirthday}>
                <p>born <input type="number" value={born} onChange={({ target }) =>{ setBorn(target.value) }}/></p>
                <button>update author</button>
              </form>
            }
          </div>
        }
      </div>
    )
  }
}

export default Authors
