import {useState} from 'react'

export function Checkbox({ title, id, filters, setFilters }){

    // todo: implement handleChange to modify value of filters[id]
    const [isChecked, setIsChecked] = useState(false)

    const handleChange = ()=>{
        setIsChecked(!isChecked)

    }

    return <div>
        <label style={{ color: isChecked ? 'green' : 'black' }}>
            <input type="checkbox"
                // checked={filters[id]}
                checked={isChecked}
                onChange={handleChange}
            />
            {title}
        </label>
        <p></p>
    </div>
    
}