import { useState, useEffect } from "react";
import Message from "./Message";

const Input = () => {

      const [InputMessage, setInputMessage] = useState("");
      const [websocket, setWebsocket] = useState(null);
      const [messages, setMessages] = useState([]);

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

            }

            socket.onmessage = message => {

                  const mensaje = JSON.parse(message.data);
                  console.log('Mensaje recibido: ' + mensaje.mensaje);
                  setMessages(prevMessages => [...prevMessages, mensaje]);

            }

            socket.onclose = event => {

                  console.log('Cliente desconectado ' + event);

            }

            setWebsocket(socket);

            return () => {

                  socket.close();

            }

      }, []);

      const sendMessage = () => {

            if (InputMessage.trim() !== '') {

                  const mensaje = {
                        usuario: 'Chris',
                        mensaje: InputMessage,
                        fecha: obtenerFecha(),
                        hora: obtenerHora()
                  }

                  websocket.send(JSON.stringify(mensaje));
                  setInputMessage('');
            }

      };

      return (

            <div>

                  <div className="py-2 px-">

                        {messages.map((message, index) => {

                              const { usuario, mensaje, hora } = message;

                              return (

                                    <div key={index}>

                                          <Message usuario={usuario} message={mensaje} hora={hora} />

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