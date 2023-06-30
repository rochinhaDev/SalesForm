import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function SaleDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [sale, setSale] = useState(null);
  const [delivery, setDelivery] = useState({
    value: "",
    date: "",
  });
  //Esse objeto será adicionado dentromda array de ebntregas
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
      <button onClick={handleDelete} className="border-2 ">
        Deletar Venda
      </button>
    </div>
  );
}
