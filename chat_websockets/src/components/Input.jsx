import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast, { Toaster} from "react-hot-toast"
import Message from "./Message";
import Swal from "sweetalert2";

const Input = ({id}) => {

      const { username, userId, messages, setMessages, notificacion, setNotificacion, users } = useContext(UserContext);

      const [InputMessage, setInputMessage] = useState("");
      const [websocket, setWebsocket] = useState(null);
      const [mensajes, setMensajes] = useState([]);

      const obtenerFecha = () => {

            const fechaActual = new Date();
            const año = fechaActual.getFullYear();
            let mes = fechaActual.getMonth() + 1
            const dia = fechaActual.getDate();

            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            for (let index = 1; index <= meses.length; index++) {

                  if (index === mes) {
                        mes = meses[index - 1];
                  }

            }

            return `${dia} - ${mes} - ${año}`;

      }

      const obtenerHora = () => {

            const fechaActual = new Date();
            const hora = fechaActual.getHours()
            const min = fechaActual.getMinutes()

            return `${hora}:${min}`;
      }


      useEffect(() => {

            const socket = new WebSocket('ws://localhost:3000');

            socket.onopen = event => {

                  console.log('Cliente conectado: ' + event);
                  // mandaremos el userId al backend para que notifique a todos que se a conectado
                  socket.send(JSON.stringify({ type : 'userConnected', id : userId}));

            }

            socket.onmessage = message => {

                  const data = JSON.parse(message.data);
                  // validaremos si el mensaje es para otros
                  if ((userId === data.recipientId && id === data.authorId) || (id === data.recipientId && userId === data.authorId)){

                        setMessages(prevMessages => [...prevMessages, data]);

                  }

            }

            socket.onclose = event => {

                  console.log('Cliente desconectado ' + event);
                  //socket.send(JSON.stringify({ type : 'UserDisconnected', id : userId}));

            }

            setWebsocket(socket);

            return () => {

                  socket.close();

            }

      }, [id, userId, setMessages]);

      const sendMessage = () => {

            if (InputMessage.trim() !== '') {

                  const mensaje = {
                        authorId : userId,
                        recipientId : id,
                        message: InputMessage,
                        usuario: username,
                        date: obtenerFecha(),
                        hour: obtenerHora()
                  }

                  console.log(mensaje)

                  websocket.send(JSON.stringify(mensaje));
                  setInputMessage('');
                  
            }

      };

      useEffect(() => {

            if (notificacion) {

                  if (userId === notificacion.recipientId) {

                        console.log('Hemos recibido un mensaje');

                        const mensajero = users.filter(user => user.id === parseInt(notificacion.authorId));

                        Swal.fire(`${mensajero[0].username}`, `${notificacion.message}`, 'info');

                        //return toast(`Has recibido una nueva notificación de ${notificacion.authorId} ==> ${notificacion.message}`);
      
                  }

            }

      }, [notificacion, setNotificacion]);

      return (

            <div>

                  <Toaster />

                  <div className="py-3 px-8">

                        {messages.map((messages, index) => {

                              const { message, hour, authorId } = messages;

                              // validar si soy yo el autor del mensaje
                              let position = 'start'
                              let color = 'bg-gray-300'
                              if (userId !== authorId) {

                                    position = 'end'
                                    color = 'bg-blue-300'
                              }

                              return (

                                    <div key={index} className={`flex justify-${position}`}>

                                          <Message message={message} hora={hour} bgColor={color}/>

                                    </div>
                              )

                        })}

                  </div>

                  <div className='flex py-5 px-5'>

                        <input
                              type="text"
                              value={InputMessage}
                              onChange={e => setInputMessage(e.target.value)}
                              className='text-black w-full px-4 outline-none rounded-md' />

                        <button
                              onClick={sendMessage}
                              className='bg-blue-600 hover:bg-blue-700 hover:cursor-pointer px-4 py-3 rounded-md font-mono mx-4'
                        >
                              Enviar
                        </button>

                  </div>
            </div>

      );

};

export default Input;