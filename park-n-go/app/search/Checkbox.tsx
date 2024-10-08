import {useState} from 'react'

export function Checkbox({ title, id, filters, setFilters }){

    const handleChange = ()=>{
        // setIsChecked(!isChecked)
        const newFilters = filters.map((val,i) =>{
            return i===id ? !val : val
        });
        setFilters(newFilters)
    }

    return <div>
        <label style={{ color: filters[id] ? 'green' : 'black' }}>
            <input type="checkbox"
                checked={filters[id]}
                onChange={handleChange}
            />
            {title}
        </label>
        <p></p>
    </div>
    
}