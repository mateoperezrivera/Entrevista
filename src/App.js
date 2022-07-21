import './App.css';
import categorias from './ventas.js'
import {useState} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer} from "recharts";

function App() {
    let user="User Name"
    const[categoria,setcategoria] = useState(0)
    const[producto,setproducto] = useState(0)
    const[marca,setmarca] = useState(0)
    const[graphData,setGraphData]=useState(categorias[categoria].productos[producto].marcas[marca].datosventas)

    const handlerCategorias=function (e){
      const opcion=e.target.value
        setcategoria(opcion)
        setproducto(0)
        setmarca(0)
        handlerGraphData(categorias[opcion].productos[0].marcas[0].datosventas)

    }


    const handlerProductos=function (e){
        const opcion=e.target.value
        setproducto(opcion)
        setmarca(0)
        handlerGraphData(categorias[categoria].productos[opcion].marcas[0].datosventas)

    }

    const handlerMarcas=function (e){
        const opcion=e.target.value
        setmarca(opcion)
        handlerGraphData(categorias[categoria].productos[producto].marcas[opcion].datosventas)

    }
    const handlerGraphData=function (e) {
        setGraphData(e)

    }


    return (
    <div className="App">
      <nav className="NavBar">
          <span style={{display:"inline-block",width:20+'%'}}>Menu</span>
          <span style={{display:"inline-block",width:50+'%'}}>{user}</span>
          <span style={{display:"inline-block",width:30+'%'}}>Sales report</span>
      </nav>
        <div className="SelectTitle">
            <div align={"center"} style={{display:"inline-block",width: 30 + '%'}}>
            <span >Categoria:</span>
            <select name="categorias" id="selCategorias" value={categoria} onChange={handlerCategorias}>
                {
                    categorias.map((item,i)=>(
                        <option key={"categoria"+i} value={i}>{item.nombre}</option>
                    ))
                }
            </select>
            </div>
            <div align={"center"} style={{display:"inline-block",width: 40 + '%'}}>
            <span >Producto:</span>
            <select name="productos" id="selProductos" value={producto} onChange={handlerProductos}>
                {
                        categorias[categoria].productos.map((item,i)=>(
                            <option key={"producto"+i} value={i}>{item.nombre}</option>

                        ))
                }
            </select>
            </div>
                <div align={"center"} style={{display:"inline-block",width: 30 + '%'}}>
            <span>Marca:</span>
            <select name="marcas" id="selMarcas" value={marca}  onChange={handlerMarcas} >
                {
                        categorias[categoria].productos[producto].marcas.map((item,i)=>(
                            <option key={"marca"+i} value={i}>{item.nombre}</option>

                        ))
                }
            </select>
                </div>
            <p  style={{fontSize:1.2+'vw', fontWeight:"bold"}} align={"center"}>Sales By Month for:</p>
        </div>
        <ResponsiveContainer  width={'100%'} aspect={2.5}>
        <BarChart  data={graphData}>
            <CartesianGrid strokeDasharray="100 1" />
            <XAxis dataKey="mes">
                <Label  value="Meses" dy={10}></Label>
            </XAxis>
            <YAxis type="number" domain={[0,700]} ticks={[0,100,200,300,400,500,600,700]}>
                <Label angle={-90} value="Ventas" dx={-20}></Label>
            </YAxis>
            <Tooltip></Tooltip>
            <Legend></Legend>
            <Bar label={false} dataKey="ventas" fill="#88b3e7"  />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default App;
