import {useState, useEffect} from 'react';
import Productos from './Productos';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({onLogout, userId}) => {

    const[permisos,setPermisos] = useState("")

    const [user, setUser] = useState();
    const [user_name, setUser_name] = useState(""); //Guardamos el nombre del usuario.
    const [showPedidos, setShowPedidos] = useState(false);
    const [showProductos, setShowProductos] = useState(false);

    const [showUsuarios, setShowUsuarios] = useState(false);



    //PARA OBTENER USUARIOS
    useEffect(() => {
        fetch('http://localhost:8000/usuarios/' + userId, {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((userData) => {
                setUser(userData);

                setUser_name(userData.data.username);
                console.log("El nombre es =>", userData.data.username);
            })
    }, []);


    //PARA OBTENER PERMISOS DEL USUARIO
    useEffect(() => {
        fetch('http://localhost:8000/usuarios/grupos/' + userId, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.localStorage.getItem('accessToken')
            )}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((userData) => {

            const permisos = userData.data[0].name;
           
            setPermisos(permisos); // Almacenar el valor en el módulo separado
          });
      }, []);

    console.log("El grupo del usuario es =>", permisos);

    const logoutHandler = () => {
        onLogout();
    };

    const togglePedidos = () => {

        setShowPedidos(!showPedidos);
    };

    const toggleUsuarios = () => {

        setShowUsuarios(!showUsuarios);
    };

    const toggleProductos = () => {
        setShowProductos(!showProductos);
    };

    const ocultarProductos = () => {

        setShowProductos(false);
    };

    const ocultarPedidos = () => {

        setShowPedidos(false);
    };

    return (
        <> 


                {user && (
                    <>
                    <div style={{backgroundColor: '#D2B48C', padding: '1px',border: "2px solid black"}}>
                        <h1 style={{color: '#FFF'}}>Bienvenido {user_name}!</h1>
                        <button className="logout-button" onClick={logoutHandler}>Logout</button>
                    </div>
                        <br />

                    <img src="./src/assets/fondito.png" alt="" style={{ width: '50%', height: 'auto' }} />

                    <div className="button-container">

                    { (permisos === 'Admin' || permisos === 'Recepcion') && (<button className="boton boton-marron-claro" onClick={() => {toggleProductos();ocultarPedidos(),setShowUsuarios(false);}}>Productos</button> )}
                    { (permisos === 'Admin')  && (<button className="boton boton-marron-obscuro" onClick={() => {toggleUsuarios(),ocultarProductos(),ocultarPedidos();}}>Usuarios</button> )}
                    { (permisos === 'Admin' || 'Recepcion' || 'Cocina')  && ( <button className="boton boton-marron-claro" onClick={() => {togglePedidos();ocultarProductos(),setShowUsuarios(false);}}>Mostrar Pedidos / Ocultar Pedidos</button> )}
    
                    </div>
                    <style>{`

                    .logout-button {
                        background-color: #8B4513;
                        border: none;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 22px;
                        padding: 8px 16px;
                        position: absolute;
                        top: 80px;
                        right: 220px;
                        cursor: pointer;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
                        transition: all 0.2s ease-in-out;
                    }

                    .users-button {
                        background-color: #8B4513;
                        border: none;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 35px;
                        padding: 8px 16px;
                        position: absolute;
                        top: 670px;
                        left: 190px;
                        cursor: pointer;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
                        transition: all 0.2s ease-in-out;
                    }
                        .button-container {
                        display: flex;
                        justify-content: space-between;
                        margin: 20px 0;
                        }
            
                        .boton {
                        flex-basis: calc(33.33% - 10px);
                        background-color: #8B4513;
                        border: none;
                        border-radius: 4px;
                        color: #FFF;
                        font-size: 30px;
                        padding: 8px 16px;
                        cursor: pointer;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
                        transition: all 0.2s ease-in-out;
                        }
            
                        .boton-marron-claro {
                        background-color: #D2B48C;
                        cursor: pointer;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
                        transition: all 0.2s ease-in-out;
                        }
            
                        .boton-marron-obscuro {
                        background-color: #A0522D;
                        cursor: pointer;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
                        transition: all 0.2s ease-in-out;
                        }
            
                        @media (max-width: 768px) {
                        .button-container {
                            flex-wrap: wrap;
                        }
            
                        .boton {
                            margin-right: 5px;
                            margin-bottom: 5px;
                            flex-basis: calc(50% - 5px);
                        }
                        }
                    `}</style>
                    <div className="container">
                        {showProductos && <Productos permisos={permisos}/>}
                    </div>
                    <div className="container">
                        {showPedidos && <Pedidos permisos={permisos}/>}
                    </div>

                    <div className="container">
                        {showUsuarios && <Usuarios permisos={permisos}/>}
                    </div>
                    <style >{`
                        .container {
                        margin-right: 10px;
                        margin-left: 10px;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        }
                        @media (max-width: 768px) {
                        .container {
                            margin-right: 5px;
                            margin-left: 5px;
                            margin-top: 5px;
                            margin-bottom: 5px;
                        }
                        }
                    `}</style>
                    </>
                )}
                
        </>
      );
      

      
};

export default Home;
