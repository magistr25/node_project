const mortgage = (S, p, n) => {
    p = p / 12 / 100; // Преобразование годовой процентной ставки в месячную и десятичный формат

    return ((S * p) / (1 - Math.pow(1 + p, -n))).toFixed(2);
}

console.log(mortgage(5_000_000, 10, 96));

