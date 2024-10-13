export function CarparkItem(props) {
  // todo: get carpark address and availLots from its id
  return <>
    <a href={"view?id="+props.id}> 
      <div className="card">
        <h2>{props.address}</h2>
        <p>{props.availLots} available lots</p>
      </div>
    </a>
  </>
}