import image from "../img/user-icon.png"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"

const Contact = ({ user, id, abrirChat }) => {

      const { usuariosConectados } = useContext(UserContext);
      const [enLinea, setEnLinea] = useState(false);

      useEffect(() => {

            console.log('si')

            if (usuariosConectados.includes(id)) {

                  setEnLinea(true);

            } else {

                  setEnLinea(false);
            }

      }, [usuariosConectados]);

      return (

            <div
                  className="font-bold p-5 bg-gray-700 my-2 mx-3 hover:cursor-pointer hover:bg-gray-800 flex rounded-md"
                  onClick={e => { abrirChat(id) }}
            >

                  <img src={image} alt="user-icon" className="w-10" />
                  <h1 className="pl-8">{user}</h1>

                  {enLinea && (

                        <div className="bg-green-600 text-green-600 mx-2 p-1 rounded-full my-1 h-0 justify-end">-</div>

                  )}


            </div>
      )

}

export default Contact;