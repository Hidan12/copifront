import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";


const StandarLayouts = ()=>{
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export {StandarLayouts}