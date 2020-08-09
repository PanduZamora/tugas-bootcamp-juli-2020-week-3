import React from 'react'
import Axios from 'axios'
import { Context } from './context'

import './style.css'

class Home extends React.Component {
    static contextType = Context

    componentDidMount = () => {
        if (this.context[2] == null) {
            Axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    let data = res.data.map(el => {
                        return {
                            id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating
                        }
                    })
                    data.sort((a, b) => Number(b.rating) - Number(a.rating))
                    this.context[3](data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.context[3](this.context[2].sort((a, b) => Number(b.rating) - Number(a.rating)))
        }
    }

    componentWillUnmount() {
        if (this.context[2]) {
            this.context[3](this.context[2].sort((a, b) => Number(b.rating) - Number(a.rating)))
        }
    }

    render() {
        return (
            <>
                <section>
                    <h1>Movie List</h1>
                    <div id="article-list">
                        {this.context[2] !== null && this.context[2].map((el) => {
                            return (
                                <div class="border border-white" style={{ marginBottom: "15px", marginLeft: "10px" }}>
                                    <div style={{ marginLeft: "7px", color: "white" }}>
                                        <h2>{el.title}</h2>
                                        <p><strong>Rating: {el.rating}</strong></p>
                                        <p><strong>Durasi: {Math.round(el.duration / 60)} jam</strong></p>
                                        <p><strong>Genre: {el.genre}</strong></p>
                                        <p><strong>Tahun Release: {el.year}</strong></p>
                                        <p>{el.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <footer>
                    <h5>copyright &copy; 2020 by Sanbercode</h5>
                </footer>
            </>
        );
    }
}

export default Home;