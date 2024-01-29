const Message = ({ message, hora, bgColor }) => {

  return (

    <div className={`${bgColor} text-black p-4 mb-4 rounded-md shadow-md max-w-sm`}>

      <p className="text-gray-500 text-xs mb-1">{hora}</p>
      <p>{message}</p>

    </div>

  );

};

export default Message;
