import {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productoss = ({ permisos }) => {

    
    const [productos, setProductos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [carrito, setCarrito] = useState([]);
    const [total_pagar, setTotalPagar] = useState(0);

    const [mostrarFormEditar, setFormEditar] = useState(false);
    const [mostrarFormCrearProducto, setCrearProducto] = useState(false);

    const [Pnombre, setPnombre] = useState("");
    const [Pprecio, setPprecio] = useState("");
    const [Pcantidad, setPcantidad] = useState("");
    const [Pid, setPid] = useState(0);

    const [nombre_producto, setNombre_producto] = useState("");
    const [precio_producto, setPrecio_producto] = useState("");



    const actualizarProducto = (e) => {
        setFormEditar(false)
        e.preventDefault();

        const P = {
            id: Pid,
            nombre: Pnombre,
            precio: Pprecio,
            cantidad: Pcantidad,

        }
        console.log("El producto es: ", P);
        fetch(`http://localhost:8000/productos/${P.id}/`, {
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
                // Obtener la lista actualizada de productos
                fetch('http://localhost:8000/productos/', {
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
                        setProductos(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    const handCrearProducto = () => {
        setCrearProducto(!mostrarFormCrearProducto);
    };


    const deleteProduct = (id) => {
        fetch(`http://localhost:8000/productos/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                //si existo usar toast.success, si no toast.error
                if (data.status === "success")
                    toast.success(data.message);
                else
                    toast.error(data.message);
                // Obtener la lista actualizada de productos
                fetch('http://localhost:8000/productos/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`, // Muestra los productos actualizados luego de la eliminacion
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setProductos(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error))
    };

    const eliminarDelCarrito = (productoId) => {
        const nuevosProductos = carrito.filter((producto) => producto.id !== productoId);
        setCarrito(nuevosProductos);
    };

    const vaciarCarrito = () => {
        
        setCarrito([]);
      };

    const imagenesProductos = {
        "Mixto": "./src/assets/mixto.jpg",
        "Cafe con Leche": "./src/assets/cafe con leche.jpg",
        "Jugo de Frutilla": "./src/assets/frutilla.jpeg",
        "Agua 500 ml": "./src/assets/agua.jpg",
        "Bebida/ Gaseosa 500 ml": "./src/assets/coca.jpg",
        "Cafe Americano": "./src/assets/cafe americano.jpeg",
        "NotFound": "https://acortar.link/25WvEN"
    };

    const agregarAlCarrito = (producto) => {

        toast.success("Agregado al carrito")

        const index = carrito.findIndex((p) => p.id === producto.id);
        if (index === -1) {
            setCarrito([...carrito, {...producto}]);
        } else {
            const nuevosProductos = [...carrito];
            nuevosProductos[index].cantidad += 1;
            setCarrito(nuevosProductos);
        }
    };


    const actualizarCantidad = (productoId, cantidad) => {
        const nuevosProductos = productos.map((producto) => {
            if (producto.id === productoId) {
                return {...producto, cantidad: parseInt(cantidad)};
            } else {
                return producto;
            }
        });
        setProductos(nuevosProductos);
    };




    //FETCH PARA OBTENER PRODUCTOS
    useEffect(() => {
        fetch('http://localhost:8000/productos/', {
            method: 'GET', headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const productosConCantidad = data.data.map((producto) => {
                    return {...producto, cantidad: 1};
                });
                setProductos(productosConCantidad);
            })
            .catch((error) => console.log(error));
    }, []);


    // FETCH PARA CREAR PEDIDOS
    const handleSubmit = (e) => {

        setMostrarCarrito(!mostrarCarrito)
        setMostrarFormulario(false)
        vaciarCarrito()

        e.preventDefault();


        const data = {
            nombre_cliente: nombre, lista_productos: carrito, descripcion: descripcion, total_pagar: total_pagar

        };

        fetch('http://localhost:8000/pedidos/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
            }, body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success')
                    toast.success(data.message);
                else
                    toast.error(data.message);})
            .catch((err) => console.error(err));


    };

    useEffect(() => {
        const total = carrito.reduce((acumulador, producto) => {
            return acumulador + producto.precio * producto.cantidad;
        }, 0);
        setTotalPagar(total);
    }, [carrito])



    // FETCH PARA CREAR PRODUCTOS
    const handleSubmit_productos = (e) => {

        setCrearProducto(false)
        e.preventDefault();

        const data = {

            "nombre":nombre_producto,
            "precio":precio_producto,
            "cantidad":1

        };

        fetch('http://localhost:8000/productos/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
            }, body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success')
                    toast.success(data.message);
                else
                    toast.error(data.message);
                
                fetch('http://localhost:8000/productos/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setProductos(data.data);
                    })
                    .catch((error) => console.log(error));
                
                })
            .catch((err) => console.error(err));

    };



    return (
    
    <div className="productos-container">


        {productos.map((producto) => (<div key={producto.id} className="producto-item">
                <img
                    src={imagenesProductos[producto.nombre] ? imagenesProductos[producto.nombre] : imagenesProductos["NotFound"]}
                    alt={producto.nombre}/>
                <h3>{producto.nombre}</h3>
                <p>Precio: ₲{producto.precio}</p>
                {/*<p>Stock: {producto.cantidad}</p>*/}
                <label>Cantidad:</label>
                <input
                    type="number"
                    min="1"
                    value={producto.cantidad}
                    onChange={(e) => actualizarCantidad(producto.id, e.target.value)}
                    style={{
                        width: "50px", 
                        margin: "0 5px", 
                        textAlign: "center", 
                    }}
                />
                <br/>
                <div className="producto-item-buttons">

                     { (permisos === 'Admin' || 'Recepcion') && ( <button className="carrito-button carrito-button-siguiente" style={{marginRight: "2px", marginBottom: "2px"}}
                            onClick={() => agregarAlCarrito(producto)}>+ Carrito
                    </button> )}


                   {permisos === 'Admin' && ( <button className="carrito-button carrito-button-vaciar"  style={{marginRight: "2px", marginBottom: "2px"}} /////////////
                            onClick={() => deleteProduct(producto.id)}>Eliminar
                    </button> )}


                    {permisos === 'Admin' && ( <button style={{marginRight: "2px", marginBottom: "2px"}} onClick={() => {
                        setFormEditar(true), setPid(producto.id), setPnombre(producto.nombre), setPcantidad(producto.cantidad), setPprecio(producto.precio)
                    }}>Editar
                    </button> )}

                </div>
                <ToastContainer/> 
                
                
            </div>
            
            

        ))}

        
        <div >

        <div className="center-container">
            
        <button className='boton-marron-claro2' onClick={() => setMostrarCarrito(!mostrarCarrito)}>Mostrar/ocultar carrito</button>
        </div>

        <br />

        <div className="center-container2">
        {permisos === 'Admin' && (<button className='boton-crear_producto'  onClick={() => handCrearProducto()} >Crear nuevo producto</button> )}
        </div>


        </div>


        
        {mostrarCarrito ? (

        <div className="carrito-container" style={{border: "2px solid black"}}>

            <div style={{ border: '2px solid black', width: '60%', margin: '0 auto', textAlign: 'center' }}>
            <h2>Carrito de compras</h2>
            </div>
            
            <br />
    
        <ul className="carrito-lista">
            {carrito.map((producto) => (
            <li key={producto.id} className="carrito-item">
                <p>{producto.nombre}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio unitario: ₲{producto.precio}</p>

                <button className="carrito-button carrito-button-vaciar" onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
            </li>
            ))}
        </ul>

        <div className="carrito-botones">
            <button className="carrito-button carrito-button-siguiente" onClick={() => setMostrarCarrito(false)}>Ocultar carrito</button>

                {carrito.length > 0 && (
                    <button className="carrito-button carrito-button-siguiente" onClick={() => setMostrarFormulario(true)}>Siguiente</button>
                )}
   

                {carrito.length > 0 && (
                    <button className="carrito-button carrito-button-siguiente" onClick={() => vaciarCarrito()}>Vaciar Carrito</button>
                )}

        </div>

        <p style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #d9d9d9',
            borderRadius: '3px',
            color: '#000',
            cursor: 'default',
            display: 'inline-block',
            fontSize: '1.2rem',
            padding: '8px 16px',
            pointerEvents: 'none'
        }}>Total a Pagar: ₲{total_pagar}</p>
        </div>
) : null}


        {mostrarFormulario ? (


            <form className="carrito-container">

            <label>Nombre del Cliente:</label>
            <input style={{width: "300px"}}  type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

            <label>Descripción del pedido (Opcional):</label>
            <input  style={{width: "500px"}} type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>

            <button type="submit" id="boton-enviar" onClick={handleSubmit}>Enviar pedido</button>

            <br/>
            <button className="carrito-button" onClick={() => setMostrarFormulario(false)}>Atras</button>

        </form>) : null}


        {mostrarFormEditar ? (

            <form className="carrito-container">

                <label>Nombre:</label>
                <input  style={{width: "500px"}} type="text" value={Pnombre} onChange={(e) => setPnombre(e.target.value)}/>

                <label>Precio:</label>
                <input  style={{width: "500px"}} type="number" value={Pprecio} onChange={(e) => setPprecio(e.target.value)}/>

                <label>Cantidad:</label>
                <input  style={{width: "500px"}} type="number" value={Pcantidad} onChange={(e) => setPcantidad(e.target.value)}/>

                <button type="submit" id="boton-enviar" onClick={actualizarProducto}>Actualizar</button>
                <br/>
                <button className="carrito-button" onClick={() => setFormEditar(false)}>Cancelar</button>
            </form>) : null}





        {mostrarFormCrearProducto ? (

            <form className="carrito-container">

                <label>Nombre del producto:</label>
                <input  style={{width: "500px"}} type="text" value={nombre_producto} onChange={(e) => setNombre_producto(e.target.value)}/>

                <label>Precio del producto:</label>
                <input  style={{width: "500px"}} type="text" value={precio_producto} onChange={(e) => setPrecio_producto(e.target.value)}/>

                
                <button className='carrito-button carrito-button-siguiente' type="submit" id="boton-enviar" onClick = {handleSubmit_productos} >Crear producto</button>
                <br/>
                <button className="carrito-button" onClick={() => setCrearProducto(false)}>Cancelar</button>
            </form>) : null}

                </div>);
};

export default Productoss;
