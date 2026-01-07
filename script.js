function runCalculation() {
    const weight = parseFloat(document.getElementById('weight').value);
    const npo = parseFloat(document.getElementById('npo').value);
    const evapRate = parseFloat(document.getElementById('surgery').value);

    if (isNaN(weight) || isNaN(npo)) {
        alert('ERROR: Ingrese valores de peso y ayuno.');
        return;
    }

    let maintenance;
    if (weight > 40) {
        maintenance = weight + 40;
    } else {
        if (weight <= 10) maintenance = weight * 4;
        else if (weight <= 20) maintenance = 40 + (weight - 10) * 2;
        else maintenance = 60 + (weight - 20) * 1;
    }

    const deficit = maintenance * npo;
    const evapLoss = weight * evapRate;

    const schedules = [
        maintenance + (deficit * 0.5) + evapLoss,
        maintenance + (deficit * 0.25) + evapLoss,
        maintenance + (deficit * 0.25) + evapLoss,
        maintenance + evapLoss,
        maintenance + evapLoss,
        maintenance + evapLoss
    ];

    const display = document.getElementById('output-grid');
    let content = `
        <div class="result-card"><span>MANTENIMIENTO BASE</span><strong>${maintenance.toFixed(0)} ml/h</strong></div>
        <div class="result-card"><span>DÉFICIT TOTAL</span><strong>${deficit.toFixed(0)} ml</strong></div>
        <div class="result-card full"><span>PÉRDIDAS EVAPORATIVAS</span><strong>${evapLoss.toFixed(0)} ml/h</strong></div>
    `;

    schedules.forEach((val, i) => {
        content += `<div class="result-card"><span>HORA ${i + 1}</span><strong>${val.toFixed(0)} ml</strong></div>`;
    });

    display.innerHTML = content;
}
