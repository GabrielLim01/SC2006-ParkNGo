import {Checkbox} from "./Checkbox"

export function FilterList({filters, setFilters}) {

    // todo: this one is not working...
    const handleChangeType = (e) => {
        // const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        const newFilters = [...filters]
        newFilters[3] = e.target.value
        setFilters(newFilters)
    };

    const handleChangeGantry = (e) => {
        const newFilters = [...filters]
        newFilters[4] = e.target.value
        setFilters(newFilters)
    };

    const handleChangeOpenTime = (e) => {
        const newFilters = [...filters]
        newFilters[5] = e.target.value
        setFilters(newFilters)
    };

    return <div>
        <p>Filters</p>
        <div className="grid-container">

            <Checkbox title="Available" id={0} filters={filters} setFilters={setFilters}/>
            <Checkbox title="Free Parking" id={1} filters={filters} setFilters={setFilters}/>
            <Checkbox title="Night Parking" id={2} filters={filters} setFilters={setFilters}/>

            <select multiple value={filters[3]} onChange={handleChangeType}>
                <option value={1}>Surface</option>
                <option value={2}>Multi-storey</option>
                <option value={3}>Basement</option>
                <option value={4}>Surface/Multi-storey</option>
                <option value={5}>Covered</option>
                <option value={6}>Mechanised and Surface</option>
                <option value={7}>Mechanised</option>
            </select>
            
            <select value={filters[4]} onChange={handleChangeGantry}>
                <option value={0}>Gantry Height</option>
                <option value={2}>&ge; 2 m</option>
                <option value={3}>&ge; 3 m</option>
                <option value={4}>&ge; 4 m</option>
                <option value={5}>&ge; 5 m</option> 
            </select>

            <select value={filters[5]} onChange={handleChangeOpenTime}>
                <option value={0}>Open Time</option>
                <option value={1}>07:00-19:00</option>
                <option value={2}>07:00-22:30</option>
                <option value={3}>Whole Day</option>
                <option value={4}>No</option>
            </select>

        </div>
    </div>
}