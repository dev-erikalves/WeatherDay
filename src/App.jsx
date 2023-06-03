import SearchInput from "./components/SearchInput/Search.jsx";
import  TemperatureContainer  from "./components/TemperatureContainer/Temperature.jsx";
import Details from "./components/Details/Details.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./styles/app.scss"

export default function App() {
  return (
    <>
      <SearchInput />
      <TemperatureContainer />
      <Details />
      <Footer />
    
    </>
  )
}

