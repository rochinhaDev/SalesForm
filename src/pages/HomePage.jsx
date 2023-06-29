import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SaleDetail from "./SaleDetail";

export default function HomePage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const response = await axios.get(
        "https://webdev103.cyclic.app/salesform"
      );
      setSales(response.data);
    }
    fetchSales();
  }, []);

  return (
    <div>
      {sales.map((sale) => (
        <div className="card flex flex-row justify-between" key={sale.id}>
          <h2>
            <p>Cliente: {sale.cliente}</p>
          </h2>
          <p>Valor Original: {sale.valorTotalDoPedido}</p>
          <p>Vendedor: {sale.vendedor}</p>
          <Link to={`/sales/${sale.id}`}>
            <button>Detalhes da venda</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
