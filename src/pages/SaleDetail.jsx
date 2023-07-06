import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function SaleDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [sale, setSale] = useState(null);
  const [form, setForm] = useState({
    value: "",
    date: "",
  });
  // Esse objeto será adicionado dentro da array de entregas
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [totalEntregas, setTotalEntregas] = useState(0);
  useEffect(() => {
    async function fetchSale() {
      const response = await axios.get(
        `https://webdev103.cyclic.app/salesform/${params.id}`
      );
      setSale(response.data);
    }
    fetchSale();
  }, [params.id, reload]);
  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
    console.log(date);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "date") {
      const formattedDate = formatDate(value);
      setForm({ ...form, [name]: formattedDate });
    } else {
      setForm({ ...form, [name]: value });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const newValue = parseInt(form.value);
    const originalValue = parseInt(sale.valorTotalDoPedido);
    if (newValue > originalValue) {
      toast.error(
        "O valor total da entrega não pode ser maior que o valor total do pedido"
      );
      return;
    }
    try {
      const response = await axios.put(
        `https://webdev103.cyclic.app/salesform/${params.id}`,
        { entregas: [...sale.entregas, { value: form.value, date: form.date }] }
      );
      setReload(!reload);
      setForm({
        value: "",
        date: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete() {
    const response = await axios.delete(
      `https://webdev103.cyclic.app/salesform/${params.id}`
    );
    console.log(response);
    navigate("/");
  }
  if (!sale) {
    return <div>Carregando...</div>;
  }
  const somaValores = sale.entregas.reduce((acumulador, entrega) => {
    return acumulador + parseInt(entrega.value);
  }, 0);
  const valorOriginal = parseInt(sale.valorTotalDoPedido);
  const addDelivery = somaValores < valorOriginal;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center m-16 border">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido</h2>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-start mb-4 w-2/4 border-t-8 border-blue-500">
        <p className="mb-2">Cliente: {sale.cliente}</p>
        <p className="mb-2">Valor Original: {sale.valorTotalDoPedido}</p>
        <p className="mb-2">Vendedor: {sale.vendedor}</p>
        <p className="mb-2">Data da Venda: {formatDate(sale.dataDeVenda)}</p>
        <p className="mb-2">Status: {sale.status}</p>
        <div className="border-4 w-full"></div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-start mb-4 w-2/4 border-t-8 border-blue-500">
        {sale.entregas.map((entrega) => (
          <div key={entrega._id} className="flex flex-col w-full">
            <div className="flex justify-between">
              <p>
                Valor: <span className="font-thin">R${entrega.value},00</span>
              </p>
              <p className="font-bold">
                Data: <span className="font-thin">{entrega.date}</span>
              </p>
            </div>

            <div className="border-4 w-full"></div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Total entregue: {somaValores}</h2>
      </div>
      <div>
        {!showForm && addDelivery && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600"
          >
            Adicionar entrega
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="value"
              value={form.value}
              onChange={handleChange}
              placeholder="Valor da entrega"
              className="border-2 mb-2 p-2"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Data da entrega"
              className="border-2 mb-2 p-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Adicionar entrega
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border-2 px-4 py-2"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col justify-between items-center">
        <button
          onClick={handleDelete}
          className=" flex px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Deletar Venda
          <TrashIcon className="bg-noneh-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
