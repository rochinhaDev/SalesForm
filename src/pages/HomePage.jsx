import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SaleDetail from "./SaleDetail";

export default function HomePage() {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    cliente: "",
    valorTotalDoPedido: "",
    vendedor: "",
    dataDeVenda: "",
    status: "",
    entregas: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchSales() {
      const response = await axios.get(
        "https://webdev103.cyclic.app/salesform"
      );
      setSales(response.data);
    }
    fetchSales();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://webdev103.cyclic.app/salesform",
        form
      );
      console.log(response.data);
      setForm({
        cliente: "",
        valorTotalDoPedido: "",
        vendedor: "",
        dataDeVenda: "",
        status: "",
        entregas: [],
      });
      setShowForm(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 bg-no-repeat">
      <div>
        {sales.map((sale) => (
          <div className="card flex flex-row justify-between" key={sale._id}>
            <h2>
              <p className="border-2">Cliente: {sale.cliente}</p>
            </h2>
            <p className="border-2">
              Valor Original: {sale.valorTotalDoPedido}
            </p>
            <p className="border-2">Vendedor: {sale.vendedor}</p>
            <Link to={`/sales/${sale._id}`}>
              <button className="text-lg border-2 hover:underline ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Detalhes da venda
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="border-2">
            Adicionar Venda
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col border-2">
            <input
              type="text"
              value={form.cliente}
              name="cliente"
              onChange={handleChange}
              placeholder="Cliente"
              className="border-2"
            />
            <input
              type="number"
              value={form.valorTotalDoPedido}
              name="valorTotalDoPedido"
              onChange={handleChange}
              placeholder="Valor total do pedido"
              className="border-2"
            />
            <input
              type="text"
              value={form.vendedor}
              name="vendedor"
              onChange={handleChange}
              placeholder="Vendedor"
              className="border-2"
            />
            <input
              type="date"
              value={form.dataDeVenda}
              name="dataDeVenda"
              onChange={handleChange}
              placeholder="Data da Venda"
              className="border-2"
            />
            <input
              type="text"
              value={form.status}
              name="status"
              onChange={handleChange}
              placeholder="Status"
              className="border-2"
            />

            <button type="submit" className="border-2">
              Adicionar Venda
            </button>
            <button onClick={() => setShowForm(false)} className="border-2">
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
