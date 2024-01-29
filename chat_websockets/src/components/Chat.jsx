import { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Contact from './Contact';
import axios from 'axios';

const Chat = () => {

      const { users, setChatId, username, userId, setMessages } = useContext(UserContext);
      const [cerrarSesionState, setCerrarSesionState] = useState(false);
      const APIREST_URL = import.meta.env.VITE_APIREST_URL

      const cerrarSesion = async e => {

            //localStorage.removeItem('token');
            //localStorage.removeItem('userId');
            //localStorage.removeItem('chatId');


            // Aquí el cliente se está desconectando
            try {

                  const response = await axios.delete(`${APIREST_URL}/api/users/check-connections/${userId}`)

                  if (response.data.success) {

                        console.log('Se ha eliminado el cliente de la lista de conectados');

                  }


            } catch (error) {

                  console.error('Ha ocurrido un error');

            }

            setCerrarSesionState(true)
            setChatId(null);



      }

      const abrirChat = async id => {

            //localStorage.setItem('chatId', id);
            setChatId(id);
            console.log('cambiando de chat');
            console.log(userId)

            // Aquí haremos la petición a la base de datos

            try {

                  const response = await axios.get(`${APIREST_URL}/api/messages/${userId}/${id}`);

                  if (response.data.success) {

                        const { messages } = response.data;
                        setMessages(messages);

                  } else {

                        setMessages([]);

                  }

            } catch (error) {

                  console.error('Ha ocurrido un error')

            }

      }

      if (cerrarSesionState)

            return <Navigate to="/" />
      //setChatId("");

      return (

            <div className='bg-gray-800 w-1/4'>

                  <div className='flex  border-b-2 justify-between font-bold'>

                        {username && (
                              <h1 className='font-mono text-3xl text-center pt-6 pb-5 m-2'>Hola! {username}</h1>
                        )}

                        <button onClick={cerrarSesion}>

                              <h1 className='bg-red-800 px-3 py-2 my-6 rounded-md mx-3 hover:bg-red-900'>SALIR</h1>

                        </button>

                  </div>

                  <div>

                        {users.map(user => {

                              const { id, username } = user;

                              return (

                                    <Contact user={username} id={id} abrirChat={abrirChat} key={id} />

                              )

                        })}
                  </div>

            </div>

      );

};

export default Chat;
