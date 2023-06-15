import Header from "./components/Header/Header.jsx";
import Weather from "./components/MainContent/MainContent.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./styles/app.scss"

export default function App() {
  return (
    <>
      <Header />
      <Weather />
      <Footer />
    </>
  )
}

