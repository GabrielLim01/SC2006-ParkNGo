import { CarparkItem } from "./CarparkItem"

export function CarparkList({carparkList, deleteList}){
	return (<ol className="list">
        {carparkList.length===0 && "No carpark in the list"}
        {carparkList.map(item => {
            return <CarparkItem
                id={item.id}
                address={item.address}
                availLots={item.availLots}
                deleteList={deleteList}
            />
        })}
    </ol>)
    
}