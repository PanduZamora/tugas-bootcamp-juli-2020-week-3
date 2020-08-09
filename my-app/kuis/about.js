import React from 'react'

const About = (props) => {
    return (
        <>
            <div style={{ padding: "75px", border: "1px solid #ccc", marginTop: "100px", width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                <h1 style={{ textAlign: "center" }}>Data Peserta Sanbercode Bootcamp Reactjs</h1>
                <ol>
                    <li><strong style={{ width: "100px" }}>Nama:</strong> Pandu Zamora</li>
                    <li><strong style={{ width: "100px" }}>Email:</strong> contact.panduzamora@gmail.com</li>
                    <li><strong style={{ width: "100px" }}>Sistem Operasi yang digunakan:</strong> Windows 10 </li>
                    <li><strong style={{ width: "100px" }}>Akun Github:</strong> https://github.com/PanduZamora</li>
                    <li><strong style={{ width: "100px" }}>Akun Telegram:</strong> @Pandu Zamora</li>
                    <li><strong style={{ width: "100px" }}>Website :</strong> http://panduzamora.monster</li>
                </ol>
            </div>
        </>
    )
}

export default About;
