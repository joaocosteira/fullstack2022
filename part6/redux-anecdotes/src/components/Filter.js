//import { useDispatch } from "react-redux"
import { updateSearchTerm } from "../reducers/filterReducer";
import { connect } from 'react-redux'

const Filter = (props) => {

    //const dispatch = useDispatch();

    const handleChange = (event) => {
        //dispatch(updateSearchTerm(event.target.value))
        props.updateSearchTerm(event.target.value)
    }
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

const mapStateToProps = (state) => {
    return state
}  
const mapDispatchToProps = {
  updateSearchTerm,
  }  
  
//export default Filter
const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
