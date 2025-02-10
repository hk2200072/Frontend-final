import './NavBar.css'

const NavBar = ({navigate, isAdmin, isLoggedIn}) => {
    const handleLogout = () => {
        fetch('http://localhost:555/user/logout', {
            method: 'POST',
            credentials: 'include'
        }); 
    };

    return(
        <nav>
            <div className="logo" onClick={() => navigate('home')}>
                Event Booking
            </div>
            <div>
                <ul>
                    {!isLoggedIn ? (
                        <>
                            <li onClick={() => navigate('login')}>Login</li>
                            <li onClick={() => navigate('register')}>Register</li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => navigate('events')}>Events</li>
                            {isAdmin && (
                                <li onClick={() => navigate('add-event')}>Add Event</li>
                            )}
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar