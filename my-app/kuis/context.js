import React, { useState, createContext } from "react";

export const Context = createContext();

export const Provider = props => {
    const [status, setStatus] = useState(false)
    const [movies, setMovies] = useState(null)

    return (
        <Context.Provider value={[status, setStatus, movies, setMovies]}>
            {props.children}
        </Context.Provider>
    );
};