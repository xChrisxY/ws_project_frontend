import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"
import { Link } from "react-router-dom";

const Register = action => {

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [autenticado, setAutenticado] = useState(false)
      const APIREST_URL = import.meta.env.VITE_APIREST_URL

      const sendData = async e => {

            e.preventDefault();

            const credenciales = {

                  username,
                  password

            }

            try {

                  const response = await axios.post(`${APIREST_URL}/create`, credenciales)
                  const { userId, message, token } = response.data;

                  setTimeout(() => {

                        Swal.fire('Success', message, 'success')

                  }, 2000);

                  localStorage.setItem('token', token);
                  localStorage.setItem('userId', userId);
                  setAutenticado(true)

            } catch (error) {

                  Swal.fire('Error', error.response?.data.message || 'Something went wrong!', 'error');

            }

            setPassword("");
            setUsername("");

      }

      if (autenticado) {

            return <Navigate to="/messages" />

      }

      return (

            <div className="bg-gradient-to-r from-blue-500 to-red-900 flex justify-center items-center h-screen">

                  <form className="grid grid-cols-1 bg-gray-800 py-10 px-8 text-gray-400 font-bold shadow-2xl">

                        {action.action === 'register' ? <h1 className="text-2xl py-8 text-center">REGISTRATE</h1> : <h1 className="text-2xl py-8 text-center">INICIA SESIÓN</h1>}

                        <h2 className="text-xl">Username</h2>
                        <input
                              type="text"
                              className="bg-gray-800 text-red-700 outline-none text-xl py-3 border-b-2 border-blue-500 mb-5"
                              onChange={e => { setUsername(e.target.value) }}
                        />
                        <h2 className="text-xl">Password</h2>
                        <input
                              type="password"
                              className="bg-gray-800 text-red-700 outline-none text-xl py-3  border-b-2 border-blue-500 mb-10"
                              onChange={e => { setPassword(e.target.value) }}
                        />

                        {
                              action.action === 'register'
                                    ?
                                    <button
                                          className="bg-gray-500 text-black py-3 mb-5 hover:bg-gray-600"
                                          onClick={sendData}
                                    >
                                          REGISTRATE</button>
                                    :
                                    <button
                                          className="bg-gray-500 text-black py-3 mb-5 hover:bg-gray-600"
                                          onClick={sendData}
                                    >
                                          LOGIN</button>
                        }

                        {
                              action.action === 'login'
                              &&                               
                              <Link to="/register"><h3 className="hover:cursor-pointer hover:text-red-600">¿Aún no tienes cuenta?</h3></Link>
                        }
                        
                  </form>

            </div>
      )

}

export default Register;