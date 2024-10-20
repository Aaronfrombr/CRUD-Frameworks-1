import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({
    cliente: '',
    servico: '',
    status: 'pendente',
  });
  const [pedidoEditando, setPedidoEditando] = useState(null);

  const adicionarPedido = () => {
    if (pedidoEditando) {
      const pedidosAtualizados = pedidos.map(pedido =>
        pedido.id === pedidoEditando ? { ...novoPedido, id: pedidoEditando } : pedido
      );
      setPedidos(pedidosAtualizados);
      setPedidoEditando(null);
    } else {
      setPedidos([...pedidos, { ...novoPedido, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setNovoPedido({ cliente: '', servico: '', status: 'pendente' });
  };

  const iniciarEdicao = (pedido) => {
    setNovoPedido({ cliente: pedido.cliente, servico: pedido.servico, status: pedido.status });
    setPedidoEditando(pedido.id);
  };

  const deletarPedido = (id) => {
    const pedidosRestantes = pedidos.filter(pedido => pedido.id !== id);
    setPedidos(pedidosRestantes);
    if (pedidoEditando === id) {
      setPedidoEditando(null);
      setNovoPedido({ cliente: '', servico: '', status: 'pendente' });
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Pedidos de Lavanderia</h1>

      <div>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={novoPedido.cliente}
          onChange={(e) => setNovoPedido({ ...novoPedido, cliente: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo de Serviço (lavagem, secagem, etc.)"
          value={novoPedido.servico}
          onChange={(e) => setNovoPedido({ ...novoPedido, servico: e.target.value })}
        />
        <select
          value={novoPedido.status}
          onChange={(e) => setNovoPedido({ ...novoPedido, status: e.target.value })}
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluído">Concluído</option>
        </select>
        <button onClick={adicionarPedido}>
          {pedidoEditando ? 'Salvar Alterações' : 'Adicionar Pedido'}
        </button>
      </div>

      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            <strong>Cliente:</strong> {pedido.cliente}, <strong>Serviço:</strong> {pedido.servico}, <strong>Status:</strong> {pedido.status}
            <button onClick={() => iniciarEdicao(pedido)}>Editar</button>
            <button onClick={() => deletarPedido(pedido.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
