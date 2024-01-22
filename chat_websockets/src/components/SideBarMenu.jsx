import Chat from "./Chat";

const Layout = ({children}) => {

      return (

            <div className="flex h-screen">

                  <Chat />

                  <main className="flex-1 p-4 overflow-x-hidden">
                        {children}
                  </main>

            </div>
      )

}

export default Layout;