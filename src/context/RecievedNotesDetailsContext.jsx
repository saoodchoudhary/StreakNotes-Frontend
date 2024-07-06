// const { createContext, useState } = require("react");

import { createContext, useState } from "react";


const RecievedNotesDetailsContext = createContext();

const RecievedNotesDetailsProvider = ({ children }) => {
    const [recievedNotesDetails, setRecievedNotesDetails] = useState({});

    return (
        <RecievedNotesDetailsContext.Provider value={{recievedNotesDetails , setRecievedNotesDetails}}>
            {children}
        </RecievedNotesDetailsContext.Provider>
    )
}


export { RecievedNotesDetailsContext, RecievedNotesDetailsProvider }


