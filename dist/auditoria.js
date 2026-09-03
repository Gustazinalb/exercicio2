"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
(0, promises_1.readFile)("./estoque.json", "utf-8")
    .then((dados) => {
    const estoque = JSON.parse(dados);
    const valorTotalEstoque = estoque.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);
    const produtosCriticos = estoque.filter((produto) => produto.quantidade < 5);
    const relatorio = {
        valorTotalEstoque: valorTotalEstoque,
        produtosCriticos: produtosCriticos
    };
    return (0, promises_1.writeFile)("./auditoria.json", JSON.stringify(relatorio, null, 4), "utf-8");
})
    .then(() => {
    console.log("Auditoria realizada com sucesso!");
})
    .catch((erro) => {
    console.error("Erro durante a auditoria:");
    console.error(erro);
});
