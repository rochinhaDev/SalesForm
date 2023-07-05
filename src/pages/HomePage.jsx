import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
          <div
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4 mx-4"
            key={sale._id}
          >
            <div>
              <h2 className="text-lg font-bold mb-2">
                Cliente: {sale.cliente}
              </h2>
              <p>Valor Original: {sale.valorTotalDoPedido}</p>
              <p>Vendedor: {sale.vendedor}</p>
            </div>
            <Link to={`/sales/${sale._id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600">
                Detalhes da venda
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        {!showForm && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Adicionar Venda
            </button>
          </div>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col border-2 p-4">
            <input
              type="text"
              value={form.cliente}
              name="cliente"
              onChange={handleChange}
              placeholder="Cliente"
              className="border-2 mb-2 p-2"
            />
            <input
              type="number"
              value={form.valorTotalDoPedido}
              name="valorTotalDoPedido"
              onChange={handleChange}
              placeholder="Valor total do pedido"
              className="border-2 mb-2 p-2"
            />
            <input
              type="text"
              value={form.vendedor}
              name="vendedor"
              onChange={handleChange}
              placeholder="Vendedor"
              className="border-2 mb-2 p-2"
            />
            <input
              type="date"
              value={form.dataDeVenda}
              name="dataDeVenda"
              onChange={handleChange}
              placeholder="Data da Venda"
              className="border-2 mb-2 p-2"
            />
            <input
              type="text"
              value={form.status}
              name="status"
              onChange={handleChange}
              placeholder="Status"
              className="border-2 mb-2 p-2"
            />
            <button
              type="submit"
              className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Adicionar Venda
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
