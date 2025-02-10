import { useState, useEffect } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';
import RegistrationForm from './Registrationform'
import AddEventForm from './AddEventForm'
import EventsList from './EventsList'

const Main = ()=>{
    let [page,setPage]=useState('home');
    let [isAdmin, setIsAdmin] = useState(false);
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('http://localhost:555/checkadmin', {
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                setIsLoggedIn(true);
                return res.json();
            }
            throw new Error('Not logged in');
        })
        .then(data => {
            setIsAdmin(data.isAdmin);
        })
        .catch(() => {
            setIsLoggedIn(false);
            setIsAdmin(false);
        });
    }, [page]);

    let currentPage;
    if(page==='home')
        currentPage=<Home/>
    else if(page==='login')
        currentPage=<LoginForm navigate={setPage}/>
    else if (page==='register')    
        currentPage=<RegistrationForm navigate={setPage}/>
    else if(page==='add-event' && isAdmin)
        currentPage=<AddEventForm/>
    else if(page==='events')
        currentPage=<EventsList/>
    
    return(
        <div>
        <NavBar navigate={setPage} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>
        {currentPage}
        </div>
    );
}
export default Main;