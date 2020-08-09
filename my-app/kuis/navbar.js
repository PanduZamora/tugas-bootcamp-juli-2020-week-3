import React, { useContext, useState } from 'react'
import logo from './logo.png'
import { Link, useHistory } from 'react-router-dom'
import { Context } from './context'
import Swal from 'react-bootstrap-sweetalert';

const Navbar = () => {
    const [status, setStatus] = useContext(Context)
    const [alert, setAlert] = useState(null)
    const history = useHistory()

    const handleLogout = () => {
        const getAlert = () => (
            <Swal
                warning
                showCancel
                confirmBtnText="Iya, Keluar"
                confirmBtnBsStyle="bahaya"
                title="Keluar ?"
                onConfirm={() => eraseStatus()}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
            </Swal>
        )
        setAlert(getAlert())
    }

    const eraseStatus = () => {
        setStatus(false)
        hideAlert()
        history.push('/')
    }
    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <>
            <header>
                <img id="logo" alt="" logo src={logo} width="200px" />
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home </Link>
                        </li>
                        <li>
                            <Link to="/about">Tentang </Link>
                        </li>
                        {status ?
                            <>
                                <li>
                                    <Link to="/movies">List Film Editor</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} type="button" class="btn btn-danger">Keluar</button>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/login"><button type="button" class="btn btn-primary">Masuk</button></Link>
                            </li>
                        }
                    </ul>
                </nav>
            </header>
            {alert}
        </>
    )
}
export default Navbar;