import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Contact from './Contact';

const Chat = () => {

      const { users } = useContext(UserContext);

      return (

            <div className='bg-gray-800 w-1/4'>

                  <h1 className='font-mono text-3xl text-center pt-6 border-b-2 pb-5 m-2'>CHATS</h1>
                  {users.map(user => {

                        const { id, username } = user;

                        return (

                              <Contact user={username} key={id}/>

                        )

                  })}

            </div>

      );

};

export default Chat;
