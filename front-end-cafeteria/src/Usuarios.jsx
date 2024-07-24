import {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Usuarios = ({ permisos }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [grupos, setGrupos] = useState([]);


    const [mostrarEditar_Usuario, setFormEditar_Usuario] = useState(false);
    const [mostrarCrear_Usuario, setFormCrear_Usuario] = useState(false);


    const [nombre_usuario, setNombre_usuario] = useState("");
    const [apellido_usuario, setApellido_Usuario] = useState("");
    const [username_usuario, setUsername_Usuario] = useState("");
    const [email_usuario, setEmail_Usuario] = useState("");
    const [password_usuario, setPassword_Usuario] = useState("");


    const [grupoSeleccionado, setGrupoSeleccionado] = useState(0);

    const [Pid, setPid] = useState(0);



    const handleSelectChange = (event) => {
        const seleccion = event.target.value;
        setGrupoSeleccionado(seleccion);
      };

    const handCrearUsuario = () => {
        setFormCrear_Usuario(!mostrarCrear_Usuario);
    };
    

    //PARA OBTENER LOS GRUPOS
    useEffect(() => {

        fetch('http://localhost:8000/grupos/', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setGrupos(data.data);
            });

    }, []);


    //PARA OBTENER LOS USUARIOS
    useEffect(() => {
        fetch('http://localhost:8000/usuarios/', {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((userData) => {

                setUsuarios(userData.data);

                
                console.log("El nombre es =>", userData.data.username);
            })
    }, []);


    //PARA ACTUALIZAR USUARIOS
    const actualizarUsuario = (e) => {

        setFormEditar_Usuario(false)

   

        const P = {
            
            id: Pid,
            username: username_usuario,
            first_name: nombre_usuario,
            password: password_usuario,
            last_name: apellido_usuario,
            email: email_usuario,
            is_staff: true,
            is_active: true,
            is_superuser: false,

        }
        console.log("El usuario es: ", P);
        fetch(`http://localhost:8000/usuarios/${P.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    window.localStorage.getItem('accessToken')
                )}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(P),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                //si existe usar toast.success, si no toast.error
                if (data.status === 'success')
                    toast.success(data.message);
                else
                    toast.error(data.message);
                // Obtener la lista actualizada de usuarios
                fetch('http://localhost:8000/usuarios/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            window.localStorage.getItem('accessToken')
                        )}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setUsuarios(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));

            
    };


    //PARA CREAR USUARIOS
    const crearUsuario = (e) => {

        setFormCrear_Usuario(false)
        e.preventDefault();

        const P = {
            
            "username": username_usuario,
            "password": password_usuario,
            "first_name": nombre_usuario,
            "last_name": apellido_usuario,
            "email": email_usuario,

            "is_staff": true,
            "is_active": true,
            "is_superuser": false,

        }

        fetch(`http://localhost:8000/usuarios/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    window.localStorage.getItem('accessToken')
                )}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(P),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.status === 'success')
                    toast.success(data.message);
                else
                    toast.error(data.message);

                fetch('http://localhost:8000/usuarios/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            window.localStorage.getItem('accessToken')
                        )}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setUsuarios(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };


    //PARA ELIMINAR USUARIOS
    const deleteUser = (id) => {

   
        fetch(`http://localhost:8000/usuarios/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })  
            .then((data) => {
                console.log(data);
                //si existo usar toast.success, si no toast.error
                if (data.status === 204)
                    toast.success("El usuario ha sido eliminado exitosamente");
                else
                    toast.error(data.message);
                // Obtener la lista actualizada de productos
                fetch('http://localhost:8000/usuarios/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`, // Muestra los productos actualizados luego de la eliminacion
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setUsuarios(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error.message))
    };


    //PARA ASIGNAR PERMISOS A USUARIOS
    const actualizarPermiso = (id_user,id_grup) => {

          console.log("EL VALOR DEL ID ES:", id_grup)

        
        const data = {

            user_id: id_user,
            group_id: id_grup

        }

        fetch(`http://localhost:8000/grouptouser/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    window.localStorage.getItem('accessToken')
                )}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

            })
            .catch((error) => console.log(error));
    };


    return (
                <div className="pedidos-container" >

                    {usuarios.map((usuario) => (<div key={usuario.id} className="pedido-item" style={{border: "2px solid black"}}>

                    <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "16px",}}>ID Usuario: {usuario.id}</h2>
                    <h3 style={{fontSize: "20px", marginBottom: "8px",fontWeight: "bold"}}>Username: {usuario.username}</h3>
                    <p style={{fontSize: "16px", marginBottom: "4px",fontWeight: "bold"}}>Nombre del usuario: {usuario.first_name}</p>

                    <p style={{fontSize: "16px", marginBottom: "4px",fontWeight: "bold"}}>Apellido del usuario: {usuario.last_name}</p>
                
                    <p style={{fontSize: "16px", marginBottom: "4px",fontWeight: "bold"}}>Email del usuario: {usuario.email}</p>

 
                
                    <div>

                        <br />

                        <button className="carrito-button carrito-button-vaciar"  onClick={() => deleteUser(usuario.id)}>Eliminar usuario</button>
                        <br/> <br/>
                        
                        <button style={{marginRight: "2px", marginBottom: "2px"}} onClick={() => {
                                setFormEditar_Usuario(true), setPid(usuario.id),setUsername_Usuario(usuario.username), setNombre_usuario(usuario.first_name),setApellido_Usuario(usuario.last_name), setEmail_Usuario(usuario.email)
                            }}>Editar Usuario
                            </button>
            

                    </div>

                    <ToastContainer/>
                </div>

                     ))}

                    <div >

                            <div className="center-container2">
                            <button className='boton-crear_producto'  onClick={() => handCrearUsuario()} >Crear nuevo Usuario</button>
                            </div>

                    </div>


            {mostrarEditar_Usuario ? (

            <form className="carrito-container" style={{border: "2px solid black"}}>


                <label>Username del  usuario:</label>
                <input  style={{width: "500px"}} type="text" value={username_usuario} onChange={(e) => setUsername_Usuario(e.target.value)}/>

                <label>Password del usuario:</label>
                <input  style={{width: "500px"}} type="text" value={password_usuario} onChange={(e) => setPassword_Usuario(e.target.value)}/>

                <label>Nombre del usuario:</label>
                <input  style={{width: "500px"}} type="text" value={nombre_usuario} onChange={(e) => setNombre_usuario(e.target.value)}/>

                <label>Apellido del usuario:</label>
                <input  style={{width: "500px"}} type="text" value={apellido_usuario} onChange={(e) => setApellido_Usuario(e.target.value)}/>

                <label>Email del usuario:</label>
                <input  style={{width: "500px"}} type="text" value={email_usuario} onChange={(e) => setEmail_Usuario(e.target.value)}/>

                <br />


                <div >
                    <label>Seleccione un grupo: </label>
                    <select id="rol" name="rol" value={grupoSeleccionado} onChange={handleSelectChange} style={{fontSize: "16px", padding: "10px"}}>
                        <option value="">Ningún grupo</option>
                        {grupos.map(grupo => (
                        <option key={grupo.id} value={grupo.id}>{grupo.name}</option>

                        ))}
                    </select>

                </div>

  
                <br />
                

                <button className='carrito-button carrito-button-siguiente' onClick={() => {actualizarPermiso(Pid, grupoSeleccionado), actualizarUsuario()}}>Actualizar Usuario</button>


                <br/>
                <button className="carrito-button" onClick={() => mostrarEditar_Usuario(false)}>Cancelar</button>
            </form>) : null}



            {mostrarCrear_Usuario ? (

            <form className="carrito-container">

                <label>Username del  usuario:</label>
                <input  style={{width: "500px"}} type="text" value={username_usuario} onChange={(e) => setUsername_Usuario(e.target.value)}/>

                <label>Password del  usuario:</label>
                <input  style={{width: "500px"}} type="text" value={password_usuario} onChange={(e) => setPassword_Usuario(e.target.value)}/>

                <label>Nombre del usuario</label>
                <input  style={{width: "500px"}} type="text" value={nombre_usuario} onChange={(e) => setNombre_usuario(e.target.value)}/>

                <label>Apellido del usuario</label>
                <input  style={{width: "500px"}} type="text" value={apellido_usuario} onChange={(e) => setApellido_Usuario(e.target.value)}/>

                <label>Email del usuario:</label>
                <input  style={{width: "500px"}} type="text" value={email_usuario} onChange={(e) => setEmail_Usuario(e.target.value)}/>

                <br />

                <button className='carrito-button carrito-button-siguiente' type="submit" id="boton-enviar" onClick={crearUsuario}>Crear Usuario </button>
                <br/>
                <button className="carrito-button" onClick={() => mostrarCrear_Usuario(false)}>Cancelar</button>
            </form>) : null}

                </div>




    );




};

export default Usuarios;
