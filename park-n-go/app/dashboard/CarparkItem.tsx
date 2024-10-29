import Link from 'next/link';

export function CarparkItem({id, data, carparkInfo}) {
  
  return <>
    {/* {typeof data.items} */}
    <Link href={"view?id="+id} className="h-full"> 
      {carparkInfo.map((myCarpark) => (
        <>
        {myCarpark.car_park_no === id && (
          <div className="card">
            <div className="text-xl"><b>{myCarpark.car_park_no}</b></div>
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