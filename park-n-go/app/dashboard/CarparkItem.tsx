export function CarparkItem(props) {
  return <>
    <a href={"view?id="+props.id}> 
      <div className="card">
        <h2>{props.address}</h2>
        <p>{props.availLots} available lots</p>
      </div>
    </a>
  </>
}