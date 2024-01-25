import art from './art.png'

const Header = () => {
    return (

        <>

            <div className="jumbotron text-center" style={{ background: "#FDDA0D", height: "400px", display: "flex" }}>
                <img src={art} alt="art" style={{ maxWidth: '22%', height: '100%', marginRight:"40px" }} />
                <div className="sub" style={{display:"flex", alignItems:"flex-start", flexDirection:"column"  }}>
                    <h5 className="display-2" style={{ alignItems: "center" }}>Moviebooking.com</h5>
                    <p  style={{fontWeight:"bold", fontSize:"30px"}}>Book movies, watch trailer, browse theatres and more ! ! !</p>
                </div>

            </div>
        </>
    )

}
export default Header;