import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const APIREST_URL = import.meta.env.VITE_APIREST_URL

export const UserContextProvider = props => {

      const [users, setUsers] = useState([]);
      const [chatId, setChatId] = useState(null);
      const [username, setUsername] = useState("");
      const [userId, setUserId] = useState(null);
      const [token, setToken] = useState(null);
      // mensajes de chat
      const [messages, setMessages] = useState([]);

      // visualizar los usuarios conectados
      const [usuariosConectados, setUsuariosConectados] = useState([]);

      // notificar al usuario receptor
      const [notificacion, setNotificacion] = useState(null);


      useEffect(() => {

            const getUsers = async () => {

                  try {

                        const response = await axios.get(`${APIREST_URL}/users/${userId}`);

                        if (response.data.success) {

                              const { users } = response.data;

                              setUsers(users);
                        }

                  } catch (error) {

                        console.error(error);

                  }

            }

            if (userId) {

                  getUsers();

            }

      }, [userId]);

      useEffect(() => {

            const getUsername = async () => {

                  try {

                        const response = await axios.get(`${APIREST_URL}/user/${userId}`);

                        if (response.data.success) {

                              const user = response.data;

                              setUsername(user.user.username);
                        }

                  } catch (error) {

                        console.error(error.message);

                  }

            }

            if (userId) {

                  getUsername();

            }

      }, [users]);

      // Aquí proveo quién está conectado y quién no!!

      useEffect(() => {

            setInterval(async () => {

                  try {

                        console.log('llamando a la base de datos');

                        const response = await axios.get(`${APIREST_URL}/api/users/check-connections`)

                        if (response.data.success) {

                              setUsuariosConectados(response.data.usuariosConectados);

                        }

                  } catch (error) {

                        console.error('No puede ser!!')
                  }

            }, 5000);

      }, [username]);

      // Aquí mando la notificación a mi receptor

      useEffect(() => {

            const obtenerNotificacion = async () => {

                  console.log('obteniendo notificación');

                  try {

                        const response = await axios.get(`${APIREST_URL}/api/messages/notification`); 

                        if (response.status === 200 && response.data.success) {

                              console.log('Hay una nueva notificación');

                              console.log(response.data);

                              setNotificacion(response.data.notificacion);

                        } else {

                              console.log('No hay notificaciones')
                        }

                  } catch (error) {

                        console.error(error);

                  } 

            }

            obtenerNotificacion()

      }, []);

      return (

            <UserContext.Provider value={{
                  users,
                  chatId,
                  setChatId,
                  username,
                  setUserId,
                  setToken,
                  userId,
                  messages,
                  setMessages,
                  usuariosConectados,
                  notificacion
            }}
            >

                  {props.children}

            </UserContext.Provider>
      )

}