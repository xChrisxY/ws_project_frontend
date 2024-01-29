import { useEffect, useState, useContext } from "react";
import Input from "./Input";
import image from "../img/user-icon.png"
import { UserContext } from "../context/UserContext";

const Messages = () => {

      const { chatId, users } = useContext(UserContext);
      const [contact, setContact] = useState({});

      useEffect(() => {

            const contact = users.filter(contact => contact.id === chatId);
            setContact(contact[0]);

      }, [chatId]);

      return (

            <div className="flex flex-col min-h-screen bg-gray-800">

                  {chatId ?

                        <div className="flex-grow flex flex-col">

                              <div className="flex-grow">

                                    <div className="flex items-center bg-sky-950 p-3 rounded-md m-5">

                                          <img src={image} alt="user-icon" className="w-20" />

                                          {contact && (

                                                <h1 className="font-mono text-2xl px-10">{contact.username}</h1>
                                                
                                          )}                                          

                                    </div>

                              </div>

                              <div className="flex-none">

                                    <Input id={chatId} />

                              </div>

                        </div>

                        :

                        <div className="flex justify-center items-center font-bold text-2xl h-screen">

                              <h1>Envía y recibe mensajes, es fácil y gratis :)</h1>

                        </div>

                  }

            </div>

      );

};

export default Messages;