import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







function Login() {

   
    const [user, setUser] = useState({
        email: '', password: ''
    })
    // const [state, setState] = useState({
    //     phone: '',
    //     hash: '',
    //     otp: ''
    // });
    const [passwordShown, setPasswordShown] = useState(false);

   

    // const handleChange = (input) => (e) => {
    //     setState({ ...state, [input]: e.target.value });
    // };

    // const hashHandleChange = (hash) => {
    //     setState({ ...state, hash: hash })
    // }

    // const { phone, hash, otp } = state;
    // const value = { phone, hash, otp };

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }
   
    const [ error, setError ] = useState({
		error: '',
		success: ''
	});
    // const Continue = (e) => {
    //     axios
    //         .post('/user/sendOTP', {
    //             phone: `${value.phone}`
    //         })
    //         .then(function (res) {
    //             console.log(res.data.otp);
    //             const hash = res.data.hash;
    //             console.log(hash);
    //             hashHandleChange(hash);
    //         });
    //         toast.success('OTP sent successfully');
           

    //     e.preventDefault();
      
        
    // };
    // const confirmOtp = async e => {
    //     e.preventDefault();
    //     try{
    //         await axios.post('user/verifyOTP', {
    //             phone: `${value.phone}`,
    //             hash: `${value.hash}`,
    //             otp: `${value.otp}`,
              
    //         })
    //         localStorage.setItem('firstLogin', true)


    //         toast.success('Login Successful', { autoClose: 1500 })
    //         window.location.href = "/";
    //     }
    //     catch(err){
    //         toast.error('Invalid OTP', { autoClose: 1500 })
    //     }
    // }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)


            toast.success('Login Successful', { autoClose: 1500 })
            window.location.href = "/";
        } catch (err) {
            toast.error(err.response.data.msg, { autoClose: 1500 })
        }
    }
    const responseGoogle = async (response) => {
        // console.log(response)
        // console.log(response.profileObj)

        try {
            const res = await axios.post('/user/google_Login', { tokenId: response.tokenId })

            setUser({ ...user, error: '', success: res.data.msg })
            localStorage.setItem('firstLogin', true)
            toast.success('Login Successful', { autoClose: 1500 })
            window.location.href = "/";
        }
        catch (err) {
            err.response.data.msg &&
                toast.error(err.response.data.msg, { autoClose: 1500 })
        }

    }
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
      };
    // const responseFacebook = async (response) => {
    //     try {
    //         const {accessToken, userID} = response
    //         const res = await axios.post('/user/facebook_login', {accessToken, userID})

    //         setUser({...user, error:'', success: res.data.msg})
    //         localStorage.setItem('firstLogin', true)

    //         window.location.href = "/";


    //     } catch (err) {
    //         err.response.data.msg && 
    //         alert(err.response.data.msg)
    //     }
    // }






    return (
        <div className="login-page">


            {/* <ToastContainer /> */}
            <form onSubmit={loginSubmit}>

                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput} 
                    type={passwordShown ? "text" : "password"}/>
              
                <div className="row">
                    <button type="submit">Login</button>
                    <i className={`fa ${passwordShown ? "fa-eye" : "fa-eye-slash"} password-icon`} onClick={togglePassword}></i>



                    {/* <div className="button1">
                <Link  to="/register"><button type="button">
                    Register 
                </button></Link>
                </div> */}

                </div>

            </form>
            <div className="hr">Or Login With</div>


           
            <p>New User? <Link className='Linkbtn1' to="/register">Register Here</Link></p>




        </div>

    )
}

export default Login