import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../mainpages/utlis/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../mainpages/utlis/validation/Validation'
import { useHistory } from 'react-router-dom';



const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
   
    const [user, setUser] = useState(initialState)
    const history = useHistory()

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })
            alert("Register Success")
            setUser({...user, err: '', success: res.data.msg})
           
            history.push('/login')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login-page">
       
             {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={handleChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={handleChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={handleChangeInput} />

                <input type="cf_password" name="cf_password" required autoComplete="on"
                placeholder="Confirm password" value={user.cf_password} onChange={handleChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link className="Linkbtn " to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register