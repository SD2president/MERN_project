import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


function NewDestination() {
    //redirects page after submit button
    const navigate = useNavigate()
    //set states for all database columns to be added
    const [name, setName] = useState('')
    const [continent_name, setContinent_name] = useState('')
    const [country_name, setCountry_name] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [picture, setPicture] = useState('')
    const [destinations, setDestinations] = useState([])

    //finds all destinations in the database
    const getDestinations = async () => {
        try {
            const findDestinations = await fetch(`http://localhost:4000/destinations`)
            const jsonData = await findDestinations.json()
            setDestinations(jsonData)
        } catch (Error) {
            console.log(Error)

        }
    }

    useEffect(() => {
        getDestinations()
    }, [])


    const checkList= new Set() //CREATES A BLANK LIST
    //MAKES AND ARRAY OF JUST THE DESTINATION NAMES
    const list = destinations.map((destination) => {
           return destination.name
    })
    //goes through the list array of destination names and adds it to the Set() with the addSet funciton
    list.forEach(addSet)
    //adds the desintation name to the Set()
    function addSet(name){
        checkList.add(name)
    }

    //ADD NEW(POST) TO THE DB DESTINATION FUNCTION 
    const addDestination = async (e) => {
        e.preventDefault()
        try {                
            let status =checkList.has(name) //if the checkList already has the value as name, it will return true and set it to status
            //if status is true, the destination exisits in the db and an alert will be displayed 
            if(status===true){
                alert(`${name} already exisits as a Destination - Go to ${name} page to add comment or add new Destination Name`)  
            }
            //creates a new row in the db based on the form data
            const addedDestination={name, continent_name, country_name, description, author, picture,date} 
             const response = await fetch(`http://localhost:4000/destinations/`,
            { method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(addedDestination)
        })
        .then ((response)=>response.json())
        console.log(response)
        navigate('/continents') //redirects to the continents page after successful submit
        } catch (Error) {
            console.log(Error)
        }
    }

    return (

            <main>
                <h1>Add a New Destination</h1>
                <form method='POST' onSubmit={addDestination} >
                    <div className="form-group">
                        <label htmlFor='name'>Destination Name</label>
                        <input id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required />
                    </div>
                    <div className="dropdown">
                        <label htmlFor='continent_name'>Continent</label>  
                        <select name='continent_name' id="continent_name" value={continent_name}  onChange={(e)=> setContinent_name(e.target.value)} required>  
                            <option value=''>Select a continent</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                        </select>                   
                    </div>
                    <div className="form-group">
                        <label htmlFor='country_name'>Country</label>  
                        <input id="country" name="country_name" value={country_name} onChange={(e)=> setCountry_name(e.target.value)}  />                      
                    </div>
                    <div className="form-group">
                        <label htmlFor='description'>Description</label>  
                        <textarea  name='description' value={description} onChange={(e)=> setDescription(e.target.value)} required />                      
                    </div>
                    <div className="form-group">
                        <label htmlFor='author' >Author</label>  
                        <input id="author" name="author" value={author} onChange={(e)=> setAuthor(e.target.value)} required/>                      
                    </div>
                    <div className="form-group">
                        <label htmlFor='picture'>Photo</label>  
                        <input id="picture" name="picture" value={picture} onChange={(e)=> setPicture(e.target.value) } />                      
                    </div>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    <button type='submit'>Submit</button>   
                </form>
            </main>

    )
}


export default NewDestination