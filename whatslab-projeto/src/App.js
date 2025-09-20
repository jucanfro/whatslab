import React, { useState } from "react";
import coracao from "./img/coracao.png";

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
  const [erro, setErro] = useState("");

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => {
    setModalAberto(false);
    setNovoUsuario("");
  };

  const adicionarUsuario = () => {
    if (novoUsuario.trim() === "") return;
    setUsuarios([...usuarios, novoUsuario.trim()]);

    if (!coresUsuarios[novoUsuario.trim()]) {
      const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
      setCoresUsuarios({ ...coresUsuarios, [novoUsuario.trim()]: corAleatoria });
    }

    setNovoUsuario("");
    setModalAberto(false);
  };

  const enviarMensagem = () => {
    if (!usuarioSelecionado) {
      setErro("Selecione um usuário antes de enviar.");
      return;
    }
    if (mensagem.trim() === "") {
      setErro("Digite uma mensagem antes de enviar.");
      return;
    }

    const agora = new Date();
    const hora = agora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMensagens([
      ...mensagens,
      { usuario: usuarioSelecionado, texto: mensagem.trim(), hora }
    ]);
    setMensagem("");
    setErro("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-md sm:max-w-2xl bg-white shadow-lg rounded-lg flex flex-col h-[90vh]">

        {/* cabeçalho */}
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b">
          <div className="flex items-center gap-2">
            <img src={coracao} alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <h1 className="font-bold text-base sm:text-lg">Whatslab</h1>
              <span className="text-xs sm:text-sm text-gray-500">MVP Inicial</span>
            </div>
          </div>
          <button
            className="bg-green-500 text-white text-xs sm:text-sm px-2 sm:px-4 py-1 rounded hover:bg-green-600"
            onClick={abrirModal}
          >
            + Usuário
          </button>
        </div>

        {/* mensagens */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">
          {mensagens.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 ${coresUsuarios[msg.usuario]} text-white flex items-center justify-center rounded-full font-bold text-xs sm:text-sm`}>
                {msg.usuario.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold">{msg.usuario}</div>
                <div className=" p-2 sm:p-3 rounded-lg max-w-[70%] sm:max-w-xs text-sm sm:text-base">
                  {msg.texto}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 text-right">{msg.hora}</div>
              </div>
            </div>
          ))}
        </div>

        {/* área de envio */}
        <div className="flex flex-col border-t px-3 sm:px-4 py-2 sm:py-3 gap-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={usuarioSelecionado}
              onChange={(e) => setUsuarioSelecionado(e.target.value)}
            >
              <option value="">Selecione usuário</option>
              {usuarios.map((u, i) => (
                <option key={i} value={u}>{u}</option>
              ))}
            </select>
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                placeholder="Mensagem..."
                className="flex-1 border rounded px-2 py-1 text-sm"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
              />
              <button
                className="bg-purple-500 text-white text-sm px-3 sm:px-4 py-1 rounded hover:bg-purple-600"
                onClick={enviarMensagem}
              >
                Enviar
              </button>
            </div>
          </div>

          {erro && <div className="text-red-500 text-xs sm:text-sm">{erro}</div>}
        </div>
      </div>

      {/* modal */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-base sm:text-lg font-bold mb-3">Adicionar Usuário</h2>
            <input
              type="text"
              placeholder="Digite o nome do usuário"
              className="w-full border rounded px-3 py-2 mb-3 text-sm"
              value={novoUsuario}
              onChange={(e) => setNovoUsuario(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 text-sm px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-400"
                onClick={fecharModal}
              >
                Fechar
              </button>
              <button
                className="bg-green-500 text-white text-sm px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-green-600"
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
