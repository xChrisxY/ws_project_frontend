import image from "../img/user-icon.png"

const Contact = ({user}) => {

      return (

            <div className="font-bold p-5 bg-gray-700 my-2 mx-3 hover:cursor-pointer hover:bg-gray-800 flex rounded-md">

                  <img src={image} alt="user-icon" className="w-10"/>
                  <h1 className="pl-8">{user}</h1> 

            </div>
      )

}

export default Contact;