import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SaleDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [sale, setSale] = useState(null);
  const [form, setForm] = useState({
    value: "",
    date: "",
  });
  //Esse objeto será adicionado dentro da array de entregas
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
        "O valor total da entrega, não pode ser maior que o valor total do pedido"
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
  console.log(sale);
  const valorOriginal = parseInt(sale.valorTotalDoPedido);
  const addDelivery = somaValores < valorOriginal;
  return (
    <div
      key={sale.cliente}
      className="flex flex-col justify-center align-center"
    >
      <h2>Detalhes do Pedido</h2>
      <p>Cliente: {sale.cliente}</p>
      <p>Valor Original: {sale.valorTotalDoPedido}</p>
      <p>Vendedor: {sale.vendedor}</p>
      <p>Data da Venda: {sale.dataDeVenda}</p>
      <p>Status: {sale.status}</p>
      <div key={sale.entregas} className="flex">
        {sale.entregas.map((entrega) => (
          <div key={entrega.value}>
            <p>Valor:{entrega.value}</p>
            <p>Data:{entrega.date}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Total entregue:{somaValores}</h2>
      </div>
      <div>
        {!showForm && addDelivery && (
          <button onClick={() => setShowForm(true)} className="border-2">
            Adicionar entrega
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col border-2">
            <input
              type="text"
              name="value"
              value={form.value}
              onChange={handleChange}
              className="card"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="card"
            />
            <button type="submit" className="border-2 ">
              Adicionar entrega
            </button>
            <button onClick={() => setShowForm(false)} className="border-2">
              Cancelar
            </button>
          </form>
        )}
      </div>

      <button onClick={handleDelete} className="border-2 ">
        Deletar Venda
      </button>
    </div>
  );
}
