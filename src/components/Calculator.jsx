import { useState, useEffect } from "react";

export default function Calculator() {
  const [nomeFii, setNomeFii] = useState("");
  const [historico, setHistorico] = useState([]);
  const [preco, setPreco] = useState("");
  const [dividendo, setDividendo] = useState("");
  const [cotas, setCotas] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("historicoFII");
    if (dados) {
      setHistorico(JSON.parse(dados));
    }
  }, []);

  function limparHistorico() {
    localStorage.removeItem("historicoFII");
    setHistorico([]);
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarInputMoeda = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = Number(apenasNumeros) / 100;

    return formatarMoeda(numero);
  };

  const converterMoedaParaNumero = (valor) => {
    return Number(valor.replace(/\D/g, "")) / 100 || 0;
  };

  function salvarHistorico() {
    if (!nomeFii || numeroMagico === 0) return;

    const novoItem = {
      nome: nomeFii.toUpperCase(),
      numeroMagico,
    };

    const novoHistorico = [novoItem, ...historico];

    setHistorico(novoHistorico);
    localStorage.setItem("historicoFII", JSON.stringify(novoHistorico));
  }

  const precoNum = converterMoedaParaNumero(preco);
  const dividendoNum = converterMoedaParaNumero(dividendo);
  const cotasNum = Number(cotas) || 0;

  const total = precoNum * cotasNum;
  const renda = cotasNum * dividendoNum;
  const dy = precoNum > 0 ? (dividendoNum / precoNum) * 100 : 0;

  const numeroMagico =
    dividendoNum > 0 ? Math.ceil(precoNum / dividendoNum) : 0;

  const investimentoMagico = numeroMagico * precoNum;

  return (
    <div className="layout">
      <div className="dashboard">

        <div className="calculadora-header">
          <h3>Calculadora</h3>
          <span></span>
        </div>

        {/* INPUT NOME FII */}
        <div className="inputs">
          <div className="input-group">
            <label>Nome do FII</label>
            <input
              type="text"
              placeholder="Ex: MXRF11"
              value={nomeFii}
              onChange={(e) => setNomeFii(e.target.value)}
            />
          </div>
        </div>

        {/* INPUTS */}
        <div className="inputs">
          <div className="input-group">
            <label>Preço da cota</label>
            <input
              type="text"
              placeholder="Ex: R$ 9,76"
              value={preco}
              onChange={(e) => setPreco(formatarInputMoeda(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Dividendo mensal por cota</label>
            <input
              type="text"
              placeholder="Ex: R$ 0,10"
              value={dividendo}
              onChange={(e) => setDividendo(formatarInputMoeda(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Quantidade de cotas</label>
            <input
              type="number"
              placeholder="Ex: 100"
              value={cotas}
              onChange={(e) => setCotas(e.target.value)}
            />
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="grid">
          <div className="card">
            <span>Total Investido</span>
            <strong>{formatarMoeda(total)}</strong>
          </div>

          <div className="card">
            <span>Renda Mensal</span>
            <strong>{formatarMoeda(renda)}</strong>
          </div>

          <div className="card">
            <span>DY Mensal</span>
            <strong>{dy.toFixed(2).replace(".", ",")}%</strong>
          </div>
        </div>

        {/* EXPLICAÇÃO */}
        <p className="explicacao">
          {cotasNum} cotas × {formatarMoeda(dividendoNum)} ={" "}
          <strong>{formatarMoeda(renda)}</strong>/mês
        </p>

        {/* NÚMERO MÁGICO */}
        <div className="magic">
          <p className="magic-question">
            Quantas cotas você precisa ter pra que o dividendo mensal compre 1 nova cota?
          </p>
          <h3>Número mágico</h3>
          <p className="magic-value">{numeroMagico} cotas</p>
          <span>Investimento: {formatarMoeda(investimentoMagico)}</span>

          <button className="btn" onClick={salvarHistorico}>
            Salvar no histórico
          </button>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="historico">
        <div className="historico-header">
          <h3>Histórico</h3>
          <button className="btn-clear" onClick={limparHistorico}>
            Limpar
          </button>
        </div>

        {historico.length === 0 && <p>Nenhum dado salvo</p>}

        {historico.map((item, index) => (
          <div key={index} className="historico-item">
            <span>{item.nome}</span>
            <strong>{item.numeroMagico} cotas</strong>
          </div>
        ))}
      </div>
    </div>
  );
}