import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const APIREST_URL = import.meta.env.VITE_APIREST_URL

export const UserContextProvider = props => {

      const [users, setUsers] = useState([]);
      const userId = localStorage.getItem('userId');
      console.log(userId);

      useEffect(() => {

            const getUsers = async () => {

                  try {
                        
                        const response = await axios.get(`${APIREST_URL}/users/${userId}`);

                        const { users } = response.data;

                        setUsers(users);

                  } catch (error) {
                        
                        console.error(error);

                  }

            }

            getUsers()

      }, []);

      return (

            <UserContext.Provider value={{
                  users
            }}

            >

                  {props.children}

            </UserContext.Provider>
      )

}