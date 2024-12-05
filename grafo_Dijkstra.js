const grafo = {
    A: { B: 4, C: 2, D: 7 },
    B: { A: 4, C: 1, E: 1 },
    C: { A: 2, B: 1, D: 3, E: 3 },
    D: { A: 7, C: 3, E: 2 },
    E: { B: 1, C: 3, D: 2 }
};

function dijkstra(grafo, inicio) {
    const distancias = {};
    const predecessores = {};
    const naoVisitados = new Set();

    for (const vertice in grafo) {
        distancias[vertice] = Infinity;
        predecessores[vertice] = null;
        naoVisitados.add(vertice);
    }
    distancias[inicio] = 0;

    while (naoVisitados.size > 0) {

        let menorDistancia = Infinity;
        let verticeAtual = null;
        for (const vertice of naoVisitados) {
            if (distancias[vertice] < menorDistancia) {
                menorDistancia = distancias[vertice];
                verticeAtual = vertice;
            }
        }

        if (verticeAtual === null) {
            break;
        }

        naoVisitados.delete(verticeAtual);

        const vizinhos = grafo[verticeAtual];
        for (const vizinho in vizinhos) {
            if (naoVisitados.has(vizinho)) {
                const novaDistancia = distancias[verticeAtual] + vizinhos[vizinho];
                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    predecessores[vizinho] = verticeAtual;
                }
            }
        }
    }

    return { distancias, predecessores };
}

function reconstruirCaminho(predecessores, inicio, fim) {
    const caminho = [];
    let atual = fim;

    while (atual !== null) {
        caminho.unshift(atual);
        atual = predecessores[atual];
    }

    if (caminho[0] === inicio) {
        return caminho;
    } else {
        return [];
    }
}

const { distancias, predecessores } = dijkstra(grafo, 'A');

console.log(distancias);

console.log('Menor tempo para chegar de A até E:', distancias['E'], 'horas');

const caminhoAE = reconstruirCaminho(predecessores, 'A', 'E');
console.log('Caminho de A até E:', caminhoAE.join(' -> '));

console.log('Menor tempo para chegar de A até D:', distancias['D'], 'horas');

const caminhoAD = reconstruirCaminho(predecessores, 'A', 'D');
console.log('Caminho de A até D:', caminhoAD.join(' -> '));
