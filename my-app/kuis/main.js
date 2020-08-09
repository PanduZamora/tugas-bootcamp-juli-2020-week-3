import React from "react"
import { Provider } from './context'
import Navbar from './navbar'
import Routes from './router'


const Main = () => {
    return (
        <Provider>
            <Navbar />
            <Routes />
        </Provider>
    )
}

export default Main;