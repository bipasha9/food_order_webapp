import  {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import WorkerItem from '../utlis/productItem/WorkerItem'
import Loading from '../utlis/loading/Loading';
// import Slideshow from './slideshow';
import axios from 'axios'
import Filters1 from './Filters1';
import LoadMore from './LoadMore'
// import Category from './Category';
// import Catwork from './Catwork';



function Workers() {
    const state = useContext(GlobalState)
    const [workers, setWorkers] = state.workersAPI.workers
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.workersAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    // const [catworkTypeWorker, setcatworkTypeWorker] = useState([])

    const handleCheck = (id) =>{
        workers.forEach(worker => {
            if(worker._id === id) worker.checked = !worker.checked
        })
        setWorkers([...workers])
    }

    const deleteWorker = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteWorker = axios.delete(`/api/workers/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteWorker
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        workers.forEach(worker => {
            worker.checked = !isCheck
        })
        setWorkers([...workers])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        workers.forEach(worker => {
            if(worker.checked) deleteWorker(worker._id, worker.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div> 
    return (
       
        
        <>
        
        <Filters1 />
       
        {/* <Catwork setcatworkTypeWorker={
            setcatworkTypeWorker
        }/> */}
        
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="workers">
            {
                // catworkTypeWorker.length >0 ?(
                //     catworkTypeWorker.map(worker => {
                //         return <WorkerItem key={worker._id} worker={worker}
                //         isAdmin={isAdmin} deleteWorker={deleteWorker} handleCheck={handleCheck} />
                //     })  
                // ):(
                    (
                    workers.map(worker => {
                        return <WorkerItem key={worker._id} worker={worker}
                        isAdmin={isAdmin} deleteWorker={deleteWorker} handleCheck={handleCheck} />
                    })
                ) 
            } 
            <a
                    href="https://wa.me/917086195013"
                    className="whatsapp_float"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fa fa-whatsapp whatsapp-icon"></i>
                </a>
                <a href="tel:+919101313393"
                className="phone_float"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <i className="fa fa-phone phone-icon"></i>
                </a>
        </div>

        
        {workers.length === 0 && <Loading />}
        </>
    )
}

export default Workers