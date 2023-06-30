import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SaleDetail() {
  const params = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    async function fetchSale() {
      const response = await axios.get(
        `https://webdev103.cyclic.app/salesform/${params.id}`
      );
      setSale(response.data);
    }
    fetchSale();
  }, [params.id]);

  const handleAddDelivery = () => {};

  if (!sale) {
    return <div>Carregando...</div>;
  }
  console.log(sale);
  return (
    <div key={sale.cliente} className="flex">
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

      <button onClick={handleAddDelivery} className="border-2 ">
        Adicionar entrega
      </button>
    </div>
  );
}
