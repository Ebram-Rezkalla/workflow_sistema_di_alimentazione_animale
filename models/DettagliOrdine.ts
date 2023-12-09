class DettagliOrdine {
    idAlimento: number;
    quantità_richiesta: number;
    sequenza: number;

    constructor(idAlimento: number, quantità_richiesta: number, sequenza: number) {
        this.idAlimento = idAlimento;
        this.quantità_richiesta = quantità_richiesta;
        this.sequenza = sequenza;
    }
}

export default DettagliOrdine;