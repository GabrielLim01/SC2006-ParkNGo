import Link from 'next/link';

export function CarparkItem({id, data, carparkInfo}) {
  // todo: get carpark address and availLots from its id
  
  // if id is invalid, this will fail
  // const myCarpark = carparkInfo.filter(item => item.car_park_no===id)[0]
  // const availLots = data.items.carpark_data

  
  return <>
    {/* {typeof data.items} */}
    <Link href={"view?id="+id}> 
      {carparkInfo.map((myCarpark) => (
        <>
        {myCarpark.car_park_no === id && (
          <div className="card">
            <h1><b>{myCarpark.car_park_no}</b></h1>
            <h2>{myCarpark.address}</h2>

            {data.items[0].carpark_data.map((carpark) => (
            <>
              {carpark.carpark_number === id && (
                <tr>
                  <td>Availability: </td>
                  <td>{carpark.carpark_info[0].lots_available}</td>
                </tr>
              )}
            </>
            ))}
          </div>
        )}
        </>
        
      ))}
    </Link>
  </>
}