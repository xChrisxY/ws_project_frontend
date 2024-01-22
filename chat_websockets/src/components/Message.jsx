const Message = ({ usuario, message, hora }) => {

  return (

    <div className="bg-gray-300 text-black p-4 mb-4 rounded-md shadow-m">

      <p className="text-gray-500 text-xs mb-1">{hora}</p>
      <p className="font-semibold mb-1">{usuario}</p>
      <p>{message}</p>

    </div>

  );

};

export default Message;
