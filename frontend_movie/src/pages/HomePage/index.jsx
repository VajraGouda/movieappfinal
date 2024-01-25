import FilterMovies from "../../components/FilterMovies"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"

const HomePage = () => {
    return (
        <div className="div">
            <Navbar />
            <Header />
            <FilterMovies />
        </div>
    )
}

export default HomePage;
