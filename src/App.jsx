import Header from "./components/Header";
import Button from "./components/Button";
import { useState, useEffect } from 'react';
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  //aqui podemos definir la logica
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pagoMensual, setPagoMensual] = useState(0);

  //Manejamos el valor del total aqui
  useEffect( () => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  //Manejamos el valor del pago mensual en este useEffect
  useEffect( () => {
    setPagoMensual(total / meses)
  }, [total]);


  //functions
  const handleChangeRange = (e) => {
    setCantidad(Number(e.target.value));
  }

  const handleClickDecrement = e => {
    const valor = cantidad - 100;
    if(valor < MIN){
      alert('Cantidad no valida');
      return
    }

    setCantidad(valor);
  }

  const handleClickIncrement = e => {
    const valor = cantidad + 100;
    if(valor > MAX){
      alert('Cantidad no valida');
      return
    }

    setCantidad(valor);
  }

  const handleChangeMeses = e => {setMeses(Number(e.target.value))}


  //en el return va lo que se mostrara
  return (
    <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
      <Header />  

      <div className="flex justify-between my-6">
        <Button 
          operador = '-'
          fn={handleClickDecrement}
        />

        <Button 
          operador = '+'
          fn={handleClickIncrement}
        />
      </div>

      <input 
        type="range" 
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}        
        onChange={handleChangeRange}
      />
      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'> { formatearDinero(cantidad)} </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={handleChangeMeses}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-4 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600">de pagos</span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pagoMensual)} Mensuales</p>
      </div>
    
    </div>
  )

}

export default App;
