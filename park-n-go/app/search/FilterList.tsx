import {Checkbox} from "./Checkbox"
import {useState} from "react"


export function FilterList() {

    // todo: actually filter the carparks entries
    const [filters, setFilters] = useState([0,0,0,0,0,0])


    return <div>
        <p>Filters</p>

        <Checkbox title="Available" id={0} filters={filters} setFilters={setFilters}/>
        <Checkbox title="Free Parking" id={1} filters={filters} setFilters={setFilters}/>
        <Checkbox title="Night Parking" id={2} filters={filters} setFilters={setFilters}/>
        <Checkbox title="Type" id={3} filters={filters} setFilters={setFilters}/>
        
        <p> <select>
            <option value="">Gantry Height</option>
            <option value="2">&ge; 2 m</option>
            <option value="3">&ge; 3 m</option>
            <option value="4">&ge; 4 m</option>
            <option value="5">&ge; 5 m</option> 
        </select> </p>

        <select>
            <option value="">Open Time</option>
            <option value="1">Whole Day</option>
            <option value="2">07:00-19:00</option>
            <option value="3">07:00-22:30</option>
            <option value="4">No</option>
        </select>

    </div>

}