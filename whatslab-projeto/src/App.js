import React, { useState } from "react";
import coracao from "./img/coracao.png";

// Função para gerar cores aleatórias por usuário
const cores = [
  "bg-red-500", "bg-green-500", "bg-blue-500",
  "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-orange-500"
];

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [coresUsuarios, setCoresUsuarios] = useState({});

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => {
    setModalAberto(false);
    setNovoUsuario("");
  };

  const adicionarUsuario = () => {
    if (novoUsuario.trim() === "") return;
    setUsuarios([...usuarios, novoUsuario.trim()]);
    
    // Atribui cor aleatória ao usuário
    if (!coresUsuarios[novoUsuario.trim()]) {
      const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
      setCoresUsuarios({...coresUsuarios, [novoUsuario.trim()]: corAleatoria});
    }

    setNovoUsuario("");
    setModalAberto(false);
  };

  const enviarMensagem = () => {
    if (!usuarioSelecionado || mensagem.trim() === "") return;
    const agora = new Date();
    const hora = agora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setMensagens([
      ...mensagens,
      { usuario: usuarioSelecionado, texto: mensagem.trim(), hora }
    ]);
    setMensagem("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <img src={coracao} alt="Logo" className="w-8 h-8"/>
            <div>
              <h1 className="font-bold text-lg">Whatslab</h1>
              <span className="text-sm text-gray-500">MVP Inicial</span>
            </div>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            onClick={abrirModal}
          >
            + Adicionar Usuário
          </button>
        </div>

        {/* Área de mensagens */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {mensagens.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className={`w-8 h-8 ${coresUsuarios[msg.usuario]} text-white flex items-center justify-center rounded-full font-bold`}>
                {msg.usuario.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold">{msg.usuario}</div>
                <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                  {msg.texto}
                </div>
                <div className="text-xs text-gray-400 text-right">{msg.hora}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Campo de envio */}
        <div className="flex border-t px-4 py-3 items-center gap-2">
          <select
            className="border rounded px-2 py-1"
            value={usuarioSelecionado}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
          >
            <option value="">Selecione usuário</option>
            {usuarios.map((u, i) => (
              <option key={i} value={u}>{u}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Digite sua mensagem aqui..."
            className="flex-1 border rounded px-2 py-1"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />
          <button
            className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
            onClick={enviarMensagem}
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Adicionar Usuário</h2>
            <input
              type="text"
              placeholder="Digite o nome do usuário"
              className="w-full border rounded px-3 py-2 mb-4"
              value={novoUsuario}
              onChange={(e) => setNovoUsuario(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={fecharModal}
              >
                Fechar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={adicionarUsuario}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
