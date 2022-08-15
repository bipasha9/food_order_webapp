import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import {  useParams } from 'react-router-dom'
// import {showSuccessMsg, showErrMsg} from '../utlis/notification/Notification'
import './profile.css'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../utlis/loading/LoadingNew'



const initialState = {
    name: '',

    err: '',
    success: ''
}

function Profile() {
    const state = useContext(GlobalState)
    const [token] = state.token



    const [user, setUser] = useState(initialState)
    const { name, err, success } = user

    const [avatar, setAvatar] = useState(false)
    const [avatarData, setAvatarData] = useState({})
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const param = useParams()

    const [onEdit, setOnEdit] = useState(false)


    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    setLoading(true);
                    const res = await axios.get("/user/infor", {
                        headers: { Authorization: token },
                    });
                    
                    setUser(res.data)

                     setLoading(false);


                } catch (err) {
                    // alert(err.response.data.msg)
                }
            };

            getUser();
        }
    }, [token]);

    const changeAvatar = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return toast.error("Please choose an image", { autoClose: 1500 })

            if(file.size > 1024 * 1024)
                return toast.error("Size too large!", { autoClose: 1500 })

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.", { autoClose: 1500 })

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            toast.success("Upload image successfully", { autoClose: 1500 });
            
            

        } catch (err) {
            toast.success(err.response.data.msg)
        }
    }
    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            toast.success("Update successfully", { autoClose: 1500 })
        } catch (err) {
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        
    }



    return (
        <div className='profile_section'>
        <div>
            
            {loading && <Loading />}
        </div>

            <div className='profile_container'>

                <div className='profile_image'>
                    <div className='myProfile'>
                        My Profile
                    </div>
                    <div className="avatar">
                        <img src={avatar ? avatar : user.avatar} alt="" />
                        <span>
                            <i className="fa fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up1" onChange={changeAvatar} />
                        </span>
                    </div>


                    <div className='profile_name'>
                        <div className='input'>

                            <input type="text" placeholder="Name" defaultValue={user.name}
                                onChange={handleChange} name="name"
                            />
                            <input type="text" placeholder="Email" disabled={true} defaultValue={user.email}
                            />


                        </div>

                        <div className='profile_buttons'>
                            <button className='profileBtn' disabled={loading} onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                    <div className='profile_info'>
                        <Link to="/order_history">
                            <button className='orderBtn'>My Orders</button>
                        </Link>
                        <Link to="/addressprofile">
                            <button className='addressBtn'>My Addresses</button>
                        </Link>
                    </div>
                </div>

            </div>
            <div>

            </div>

        </div>
    )
}

export default Profile
