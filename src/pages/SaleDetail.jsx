import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center mb-4">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido</h2>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center mb-4">
        <p className="mb-2">Cliente: {sale.cliente}</p>
        <p className="mb-2">Valor Original: {sale.valorTotalDoPedido}</p>
        <p className="mb-2">Vendedor: {sale.vendedor}</p>
        <p className="mb-2">Data da Venda: {sale.dataDeVenda}</p>
        <p className="mb-2">Status: {sale.status}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center mb-4">
        {sale.entregas.map((entrega) => (
          <div key={entrega.value} className="mr-4">
            <p>Valor: {entrega.value}</p>
            <p>Data: {entrega.date}</p>
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
            className="border-2 px-4 py-2 mr-2"
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
            <button type="submit" className="border-2 px-4 py-2 mr-2">
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
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Deletar Venda
        </button>
        <TrashIcon className="bg-noneh-6 w-6 text-blue-500" />
      </div>
    </div>
  );
}
