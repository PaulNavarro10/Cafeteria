import {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Pedidos = ({ permisos }) => {

    const [pedidos, setPedidos] = useState([]);
    const [mostrarBoton, setMostrarBoton] = useState(false);

    const handMostrarBoton = () => {
        setMostrarBoton(!mostrarBoton);
    };

    //PARA OBTENER PEDIDOS
    useEffect(() => {
        fetch('http://localhost:8000/pedidos/', {
            method: 'GET', headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPedidos(data.data);
                console.log(data.data)
            })
            .catch((error) => console.log(error));
    }, []);

    //PARA ELIMINAR PEDIDOS
    const deletePedido = (id) => {
        fetch(`http://localhost:8000/pedidos/${id}/`, {
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
                // Obtener la lista actualizada de pedidos
                fetch('http://localhost:8000/pedidos/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setPedidos(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error))
    };

    //PARA ACTUALIZAR PEDIDOS
    const actualizarPedido = (id,estado) => {

        setMostrarBoton(false)

        const data = {

            estado_pedido: estado, 

        }

        
        fetch(`http://localhost:8000/pedidos/${id}/`, {
            method: 'PUT',
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
                //si existe usar toast.success, si no toast.error
                if (data.status === 'success')
                    toast.success(data.message);
                else
                    toast.error(data.message);
                // Obtener la lista actualizada de productos
                fetch('http://localhost:8000/pedidos/', {
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
                        setPedidos(data.data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="pedidos-container">

            {pedidos.map((pedido) => (<div key={pedido.id} className="pedido-item" style={{border: "2px solid black"}}>

                    <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "16px",}}>Pedido #{pedido.id}</h2>
                    <h3 style={{fontSize: "20px", marginBottom: "8px", fontWeight: "bold"}}>
                        Estado Pedido: 
                        {pedido.estado_pedido === 0 ? " Preparando" 
                        : pedido.estado_pedido === 1 ? " Listo" 
                        : pedido.estado_pedido === 2 ? " Entregado" 
                        : "Estado desconocido"}
                        </h3>
                    <p style={{fontSize: "17px", marginBottom: "4px",fontWeight: "bold"}}>Cliente: {pedido.nombre_cliente}</p>
                    <p style={{fontSize: "17px", marginBottom: "4px",fontWeight: "bold"}}>{pedido.producto}</p>
                    <p style={{fontSize: "17px", marginBottom: "4px",fontWeight: "bold"}}>Descripción: {pedido.descripcion}</p>
                    <p style={{
                        fontSize: "16px", marginBottom: "4px",fontWeight: "bold"
                    }}>Productos: {pedido.lista_productos.map((producto) => producto.cantidad + ' ' +producto.nombre).join(", ")}</p>
                    <div style={{border: "2px solid black", padding: "10px", maxWidth: "500px"}}>
                    <p style={{ fontSize: "20px", fontWeight: "bold", color: "black", marginBottom: "16px" }}>
                        Total a Pagar: ₲{pedido.total_pagar}
                    </p>
                    </div>
                    <div>

                        <br />
                        {permisos === 'Admin' && (<button className="carrito-button carrito-button-vaciar"  onClick={() => deletePedido(pedido.id)}>Eliminar pedido</button> )}
                        <br/> <br/>

                        { (permisos === 'Admin' || 'Recepcion' || 'Cocina') && (<button className="small-buttom" onClick={() => (handMostrarBoton())}>Editar</button> )}

                        <br /> <br />

                        {mostrarBoton ? (  

                                <div className="container_but">
                                <button className="btn-preparando"  onClick={() => (actualizarPedido(pedido.id,0))}>Preparando</button>
                                <button className="btn-listo"       onClick={() => (actualizarPedido(pedido.id,1))}>Pedido Listo</button>
                                <button className="btn-entregado"   onClick={() => (actualizarPedido(pedido.id,2))}>Pedido Entregado</button>
                                </div>

                        ) : null }

                    </div>
                    
                    <ToastContainer/>
                </div>

            ))}
        </div>

    );
};

export default Pedidos;
