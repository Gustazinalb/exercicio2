import { readFile, writeFile } from "fs/promises";

type ItemEstoque = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
};

type RelatorioAuditoria = {
    valorTotalEstoque: number;
    produtosCriticos: ItemEstoque[];
};

readFile("./estoque.json", "utf-8")
    .then((dados: string) => {

        const estoque: ItemEstoque[] = JSON.parse(dados);

        const valorTotalEstoque: number = estoque.reduce(
            (total: number, produto: ItemEstoque) => {
                return total + produto.preco * produto.quantidade;
            },
            0
        );

        const produtosCriticos: ItemEstoque[] = estoque.filter(
            (produto: ItemEstoque) => produto.quantidade < 5
        );

        const relatorio: RelatorioAuditoria = {
            valorTotalEstoque: valorTotalEstoque,
            produtosCriticos: produtosCriticos
        };

        return writeFile(
            "./auditoria.json",
            JSON.stringify(relatorio, null, 4),
            "utf-8"
        );
    })
    .then(() => {
        console.log("Auditoria realizada com sucesso!");
    })
    .catch((erro: unknown) => {
        console.error("Erro durante a auditoria:");
        console.error(erro);
    });