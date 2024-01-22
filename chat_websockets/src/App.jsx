import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/SideBarMenu";
import Messages from "./components/Messages";
import Register from "./components/Register";
import './App.css'

const App = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Register action={'login'}/>} />
        <Route path="/register" element={<Register action={'register'}/>} />

        <Route path="/*" element={

          <Layout>

            <Routes>

              <Route path="messages" element={<Messages />} />

            </Routes>

          </Layout>
        }

        />

      </Routes>

    </BrowserRouter>

  )

}

export default App;

