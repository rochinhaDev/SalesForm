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
  });

  useEffect(() => {
    async function fetchSales() {
      const response = await axios.get(
        "https://webdev103.cyclic.app/salesform"
      );
      setSales(response.data);
    }
    fetchSales();
  }, []);
  console.log(sales);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSales([...sales, form]);
    setForm({
      cliente: "",
      valorTotalDoPedido: "",
      vendedor: "",
      dataDeVenda: "",
      status: "",
      date: "",
      value: "",
    });

    console.log(form);
  }
  return (
    <div>
      <div>
        {sales.map((sale) => (
          <div className="card flex flex-row justify-between" key={sale._id}>
            <h2>
              <p>Cliente: {sale.cliente}</p>
            </h2>
            <p>Valor Original: {sale.valorTotalDoPedido}</p>
            <p>Vendedor: {sale.vendedor}</p>
            <Link to={`/sales/${sale._id}`}>
              <button>Detalhes da venda</button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={form.cliente}
            name="cliente"
            onChange={handleChange}
            placeholder="Cliente"
          />
          <input
            type="text"
            value={form.valorTotalDoPedido}
            name="valorTotalDoPedido"
            onChange={handleChange}
            placeholder="Valor total do pedido"
          />
          <input
            type="text"
            value={form.vendedor}
            name="vendedor"
            onChange={handleChange}
            placeholder="Vendedor"
          />
          <input
            type="date"
            value={form.dataDeVenda}
            name="dataDeVenda"
            onChange={handleChange}
            placeholder="Data da Venda"
          />
          <input
            type="text"
            value={form.status}
            name="status"
            onChange={handleChange}
            placeholder="Status"
          />

          <button type="submit" onClick={handleSubmit}>
            Adicionar Venda
          </button>
        </form>
      </div>
    </div>
  );
}
