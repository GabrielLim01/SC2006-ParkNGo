import Link from 'next/link';

export function CarparkItem({id, data, carparkInfo}) {
  
  return <>
    {/* {typeof data.items} */}
    <Link href={"view?id="+id} className="h-full"> 
      {carparkInfo.map((myCarpark) => (
        <>
        {myCarpark.car_park_no === id && (
          <div className="card p-4 bg-lighterBlue">
            <div className="text-md font-sans-serif-3 font-bold"><b>{myCarpark.address}</b></div>
            <h2 className='text-md font-sans-serif-3'>{myCarpark.car_park_no}</h2>

            {data.items[0].carpark_data.map((carpark) => (
            <>
              {carpark.carpark_number === id && (
                <tr>
                  <td className='text-[2rem]/8 font-sans-serif-3 font-bold'>{carpark.carpark_info[0].lots_available}</td>
                </tr>
              )}
            </>
            ))}
            <p className='text-md font-sans-serif-3'>Available lots</p>
          </div>
        )}
        </>
        
      ))}
    </Link>
  </>
}