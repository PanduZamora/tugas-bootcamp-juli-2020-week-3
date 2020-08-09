import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from './context'
import Swal from 'react-bootstrap-sweetalert';
import './login.css'

const Login = () => {
    const [status, setStatus] = useContext(Context)
    const history = useHistory();
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const [alert, setAlert] = useState(null)


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (input['username'].replace(/\s/g, '') !== "" && input['password'].replace(/\s/g, '') !== "") {
            if (input['username'] === 'sanbercode' && Number(input['password']) === 12345) {
                setStatus(true)
                handleSucces()
            } else {
                setStatus(false)
                handleError()
            }
        }
    }

    const handleError = () => {
        const getAlert = () => (<Swal
            danger
            title='Username / Password Salah, Mohon Ulangi'
            onConfirm={() => hideAlert()}
        >
        </Swal>
        )
        setAlert(getAlert())
    }

    const handleSucces = () => {
        const getAlert = () => (
            <Swal
                success
                title='Login Berhasil !'
                onConfirm={() => hideAlertSuccess()}
            >
                Selamat Datan, Apakah Kamu Member ?
            </Swal>
        )
        setAlert(getAlert())
    }


    const hideAlert = () => {
        setAlert(null);
    };

    const hideAlertSuccess = () => {
        history.push("/movies");
        setAlert(null);
    };

    return (
        <>
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header">
                            <h3>Masuk</h3>
                            <div class="d-flex justify-content-end social_icon">
                                <span><i class="fab fa-facebook-square"></i></span>
                                <span><i class="fab fa-google-plus-square"></i></span>
                                <span><i class="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit}>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" value={input.username} onChange={handleChange} name="username" placeholder="username : sanbercode" />

                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" value={input.password} onChange={handleChange} name="password" placeholder="password : 12345" />
                                </div>
                                <div class="row align-items-center remember">
                                    <input type="checkbox" />Ingat Saya
                            </div>
                                <div class="form-group">
                                    <input type="submit" value="Login" class="btn float-right login_btn" />
                                </div>
                                {alert}
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center links">
                                Belum Mempunyai Akun ?<a href="#">Daftar</a>
                            </div>
                            <div class="d-flex justify-content-center">
                                <a href="#">Luppa Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;