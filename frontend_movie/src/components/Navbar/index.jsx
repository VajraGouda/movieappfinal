import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import LogoutButton from "./LogoutButoon";


const Navbar = () => {
    const navigate = useNavigate();


    const handleProfilePage = () => {

        const isLoggedIn = localStorage.getItem('access_token');
        if (isLoggedIn) {

            navigate(`/profile`);
        } else {

            navigate('/login');
        }
    };

    

    return (
        <div style={{ background: "white",}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/"><img src={logo} alt="logo" style={{ maxWidth: '5%%', height: 'auto', width: "50px" }} /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>



                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/movie">Movies <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <button onClick={handleProfilePage} className="btn btn-primary" style={{
                                background: "none",
                                color:"black",
                                border: "none",
                                marginTop:"2px"                                
                            }}>
                                Dashboard
                            </button>
                        </li>


                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    {localStorage.getItem('access_token') ? (
                            <LogoutButton />
                        ) : (
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <Link
                                    className="navbar-brand"
                                    to="/login"
                                    style={{ padding: '0px', margin: '0px', height: '2px' }}
                                >
                                    Login
                                </Link>
                            </button>
                        )}
                
                    </form>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;