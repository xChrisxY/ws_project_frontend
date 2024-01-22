import { useState } from "react";
import Input from "./Input";
import image from "../img/user-icon.png"

const Messages = () => {

      return (

            <div className="flex flex-col min-h-screen bg-gray-800">

                  <div className="flex-grow">
                        
                        <div className="flex items-center bg-sky-950 p-3 rounded-md m-5">
                              <img src={image} alt="user-icon" className="w-20"/>
                              <h1 className="font-mono text-2xl px-10">Contacto</h1>

                        </div>

                  </div>

                  <div className="flex-none">
                        <Input />
                  </div>

            </div>

      );


};

export default Messages;