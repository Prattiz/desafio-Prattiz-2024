class RecintosZoo {

  // __DATABASE__ -->

  constructor() {

    this.recintos = [
      { numero: 1, bioma: [ "savana" ], tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
      { numero: 2, bioma: [ "floresta" ], tamanho: 5, animais: [] },
      { numero: 3, bioma: [ "savana", "rio" ], tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
      { numero: 4, bioma: [ "rio" ], tamanho: 8, animais: [] },
      { numero: 5, bioma: [ "savana" ], tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: [ "savana" ], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: [ "savana" ], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: [ "rio" ], carnivoro: true },
      MACACO: { tamanho: 1, biomas: [ "savana", "floresta" ], carnivoro: false, toleraOutrasEspecies: true  },
      GAZELA: { tamanho: 2, biomas: [ "savana" ], carnivoro: false, toleraOutrasEspecies: true  },
      HIPOPOTAMO: { tamanho: 4, biomas: [ "savana", "rio" ], carnivoro: false, toleraOutrasEspecies: true }
    };
    
  }

  analisaRecintos(animal, quantidade) {

    // Tratamento de Erros -->
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    
    let recintosViaveis = [];

    // Especie selecionada -->

    const especieInfo = this.animais[animal];
    const tamanhoNecessario = especieInfo.tamanho * quantidade;
    

    for (const recinto of this.recintos) {
      
      let espacoOcupado = 0;
      let temCarnivoro = false;
      let outraEspecie = false;

      for (const a of recinto.animais) {

        espacoOcupado += a.tamanho * a.quantidade;
        if (this.animais[a.especie].carnivoro) temCarnivoro = true;
        if (a.especie !== animal) outraEspecie = true;

      }

      // Verifica se o recinto pode misturar carnívoros
      if (temCarnivoro && especieInfo.carnivoro) continue; 
      if (temCarnivoro && !especieInfo.carnivoro) continue; // Carnívoros não podem ser misturados com herbívoros

      // Verifica se o bioma é adequado
      if (!recinto.bioma.some(b => especieInfo.biomas.includes(b))) continue;

      // Verifica se o animal tolera outras espécies
      if (!especieInfo.toleraOutrasEspecies && outraEspecie) continue;

      // Calcula o espaço restante corretamente
      const espacoRestante = recinto.tamanho - espacoOcupado;

      // Verifica se há espaço suficiente para o novo animal
      if (espacoRestante >= tamanhoNecessario) {

        recintosViaveis.push(
          { numero: recinto.numero, espacoRestante: espacoRestante - tamanhoNecessario, total: recinto.tamanho }
        );

      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    // Formata a lista de recintos viáveis
    recintosViaveis = recintosViaveis.map(recinto => {
      return `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoRestante} total: ${recinto.total})`;
    });

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo};