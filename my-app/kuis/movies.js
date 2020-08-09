import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'react-bootstrap-sweetalert';
import { Context } from './context'

const Movies = () => {
    const [status, setStatus, movies, setMovies] = useContext(Context)
    const [input, setInput] = useState({
        judul: "",
        deskripsi: "",
        tahun: 0,
        durasi: 0,
        genre: "",
        skors: 0
    })
    const [statusForm, setStatusForm] = useState("create")
    const [selectId, setSelectedId] = useState(0)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (movies === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    setMovies(res.data.map(el => {
                        return {
                            id: el.id, judul: el.judul, deskripsi: el.deskripsi, tahun: el.tahun, durasi: el.durasi,
                            genre: el.genre, skors: el.skors
                        }
                    }))
                })
        }
    })


    const handleAlertDelete = (event) => {
        let x = event.target.value
        const getAlert = () => (
            <Swal
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                judul="Delete This Movie?"
                onConfirm={() => handleDelete(x)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
                You will not be able to recover this data!
            </Swal>
        )
        setAlert(getAlert())
    }

    const handleDelete = (event) => {
        let id = Number(event)
        let NewMovie = movies.filter(el => el.id !== id)

        axios.delete(` http://backendexample.sanbercloud.com/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovies([...NewMovie])
                handleSuccess('Success Delete Data Movie')
            })

    }

    const handleEdit = (event) => {
        let id = Number(event.target.value)
        let movie = movies.find(x => x.id === id)

        setInput({ judul: movie.judul, deskripsi: movie.deskripsi, tahun: movie.tahun, durasi: movie.durasi, genre: movie.genre, skors: movie.skors })
        setSelectedId(id)
        setStatusForm("edit")
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const hideAlert = () => {
        setAlert(null);
    };

    const handleError = (props) => {
        const getAlert = () => (<Swal
            danger
            judul='Error Validation'
            onConfirm={() => hideAlert()}
        >
            {props}
        </Swal>
        )
        setAlert(getAlert())
    }

    const handleSuccess = (props) => {
        const getAlert = () => (<Swal
            success
            judul='Good Job !'
            onConfirm={() => hideAlert()}
        >
            {props}
        </Swal>
        )
        setAlert(getAlert())
    }

    const handleValidation = () => {
        let error = ''

        //validation judul
        if (input['judul'].replace(/\s/g, '') === "" || typeof input['judul'] !== "string") {
            error += `judul : Error data type or can't be empty\n`
        }

        //validation deskripsi
        if (input['deskripsi'].replace(/\s/g, '') === "") {
            error += `deskripsi : Error cant be empty \n`
        }

        //validation tahun
        input['tahun'] = Number(input['tahun'])
        if (input['tahun'] === 0 || typeof input['tahun'] !== "number") {
            error += `tahun : Error data type or can't be empty \n`
        }

        //validation durasi 
        input['durasi'] = Number(input['durasi'])
        if (input['durasi'] === 0 || typeof input['durasi'] !== "number") {
            error += `durasi : Error data type or can't be empty \n`
        }

        //validation genre  
        if (input['genre'].replace(/\s/g, '') === "" || typeof input['genre'] !== "string") {
            error += `Genre : Error data type or can't be empty \n`
        }

        //validation skors
        input['skors'] = Number(input['skors'])
        if (input['skors'] === 0 || typeof input['skors'] !== "number" || input['skors'] < 0 || input['skors'] > 10) {
            error += `skors : Error data type (1-10) or can't be empty \n`
        }

        return error
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let error = handleValidation()
        if (!error) {
            let alert = ''
            if (statusForm === "create") {
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, input)
                    .then(res => {
                        setMovies([...movies, {
                            id: res.data.id, judul: res.data.judul, deskripsi: res.data.deskripsi, tahun: res.data.tahun, durasi: res.data.durasi,
                            genre: res.data.genre, skors: res.data.skors
                        }])
                    })
                alert = 'Success Create Data Movie'
            } else if (statusForm === "edit") {
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectId}`, input)
                    .then(res => {
                        let movie = movies.find(el => el.id === selectId)
                        movie['id'] = selectId
                        movie['judul'] = input.judul
                        movie['deskripsi'] = input.deskripsi
                        movie['tahun'] = input.tahun
                        movie['durasi'] = input.durasi
                        movie['genre'] = input.genre
                        movie['skors'] = input.skors
                        setMovies([...movies])
                    })
                alert = "Success Update Data Movie"
            }

            setStatusForm("create")
            setSelectedId(0)
            setInput({
                judul: "",
                deskripsi: "",
                tahun: 0,
                durasi: 0,
                genre: "",
                skors: 0
            })
            handleSuccess(alert)
        } else {
            handleError(error)
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: '75px', marginBottom: '25px' }}>List Movie</h1>
            <table class="table table-striped" style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <thead class="thead-dark">
                    <tr>
                        <th> No </th>
                        <th> Judul </th>
                        <th> Deskripsi </th>
                        <th> Tahun </th>
                        <th> Durasi </th>
                        <th> Genre </th>
                        <th> Skors </th>
                        <th> Action </th>
                    </tr>
                </thead>
                {movies !== null && movies.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.judul}</td>
                            <td>{el.deskripsi}</td>
                            <td>{el.tahun}</td>
                            <td>{el.durasi}</td>
                            <td>{el.genre}</td>
                            <td>{el.skors}</td>
                            <td style={{ display: "block", margin: "auto" }}>
                                <button type="button" class="btn btn-warning" onClick={handleEdit} value={el.id}>Edit</button>
							&nbsp;
							<button type="button" class="btn btn-danger" onClick={handleAlertDelete} value={el.id}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </table>
            <form onSubmit={handleSubmit} style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <h1 style={{ textAlign: "center", marginTop: '25px', marginBottom: '25px' }}>Form Film</h1>
                <div class="row">
                    <div class="col-md-4">
                        <label> Judul : </label>
                        <input class="form-control" type="text" name='judul' value={input.judul} onChange={handleChange} placeholder="Judul" />
                    </div>
                    <div className="col-md-4">
                        <label> Deskripsi : </label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='deskripsi' value={input.deskripsi} onChange={handleChange} placeholder="Deskripsi" ></textarea>
                    </div>
                    <div className="col-md-4">
                        <label> Tahun : </label>
                        <input class="form-control" type="number" name='tahun' value={input.tahun} onChange={handleChange} placeholder="Tahun : 2002" />
                    </div>
                </div>
                <div class="row" style={{ marginTop: "25px" }}>
                    <div className="col-md-4">
                        <label> Durasi : </label>
                        <input class="form-control" type="number" name='durasi' value={input.durasi} onChange={handleChange} placeholder="Durasi ( Jam - Menit )" />
                    </div>
                    <div className="col-md-4">
                        <label> Genre : </label>
                        <input class="form-control" type="text" name='genre' value={input.genre} onChange={handleChange} placeholder="Drama, Horror, Sci-fi, Romansa" />
                    </div>
                    <div className="col-md-4">
                        <label> Skors : </label>
                        <input class="form-control" type="number" name='skors' value={input.skors} onChange={handleChange} placeholder="skors * 1 - 10" />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary float-right" style={{ marginTop: "25px" }}> submit </button>
                {alert}
            </form>
        </>
    );
}

export default Movies;