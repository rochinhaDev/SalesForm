import { useState, useEffect } from "react";
import axios from "axios";

const OrderTrackingForm = () => {
  const [orders, setOrders] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [totalFaturado, setTotalFaturado] = useState(0);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  useEffect(() => {
    if (selectedVendor !== "") {
      fetchOrders(selectedVendor);
    }
  }, [selectedVendor]);

  const fetchOrders = async (vendor) => {
    try {
      const response = await axios.get(
        `https://webdev103.cyclic.app/questions/${vendor}/notasfiscais`
      );
      const data = response.data;
      setOrders(data);
      calculateTotalFaturado(data);
    } catch (error) {
      console.log("Erro ao buscar as notas fiscais:", error);
    }
  };

  const renderOrders = () => {
    return orders.map((order) => (
      <tr key={order.numeroNotaFiscal}>
        <td>{order.numeroNotaFiscal}</td>
        <td>{order.codigoCliente}</td>
        <td>{order.statusNotaFiscal}</td>
        <td>{order.valorFaturado}</td>
        <td>{order.nomeVendedor}</td>
        <td>{order.dataFaturamento}</td>
        <td>{order.estadoCliente}</td>
      </tr>
    ));
  };

  const calculateTotalFaturado = (ordersData) => {
    let total = 0;
    ordersData.forEach((order) => {
      total += order.valorFaturado;
    });
    setTotalFaturado(total);
  };

  return (
    <div>
      <h2>Formulário de Acompanhamento de Pedidos Faturados</h2>
      <label htmlFor="vendor">Vendedor:</label>
      <select id="vendor" value={selectedVendor} onChange={handleVendorChange}>
        <option value="">Selecione o vendedor</option>
        <option value="1">Vendedor 1</option>
        <option value="2">Vendedor 2</option>
      </select>

      {orders.length > 0 && (
        <div>
          <h3>Notas Fiscais Faturadas</h3>
          <table>
            <thead>
              <tr>
                <th>Número da Nota Fiscal</th>
                <th>Código do Cliente</th>
                <th>Status da Nota Fiscal</th>
                <th>Valor Faturado</th>
                <th>Nome do Vendedor</th>
                <th>Data do Faturamento</th>
                <th>Estado do Cliente</th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>

          <p>Total Faturado: {totalFaturado}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingForm;
