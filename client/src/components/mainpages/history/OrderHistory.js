// import React, {useContext} from 'react'
// import {GlobalState} from '../../../GlobalState'
// import UserAPI from '../../../api/UserAPI'
// import {Link} from 'react-router-dom'


// function OrderHistory() {
//     const state = useContext(GlobalState)
//     const [history, setHistory] = state.userAPI.history
//     const [isAdmin] = state.userAPI.isAdmin
//     const [token] = state.token
//     const userState = UserAPI(token);
//     const [order]= userState.order ;
    

    

//     return (
//         <div className="history-page">
//             <h2>History</h2>

//             <h4>You have {history.length} ordered</h4>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Date of Order</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         order.map(items => (
//                             <tr key={items._id}>
//                                 <td>{items.order_id}</td>
//                                 <td>11-12-2020</td>
//                                 <td>{items.status}</td>
//                                 <td><Link to={`/history/${items._id}`}>View</Link></td>
                              
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default OrderHistory