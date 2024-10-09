import { useState } from "react";


export function CarparkItem({ id, address, availLots }) {
  // todo: no progress in this
  return <li>
    <label>
      {address}
      {availLots}
      Available lots
      
      {/* <button onClick={e=>deleteList(id)} className="btn btn-danger">Delete</button> */}
    </label>
  </li>
}