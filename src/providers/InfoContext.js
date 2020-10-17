import React, {useState, createContext} from 'react'

export const InfoContext = () => createContext();

export const Provider = (props) => {
    const [info, setInfo] = useState("");

    return (
        <InfoContext.Provider value={"test"}>
            {props.children}
        </InfoContext.Provider>
    );
}
