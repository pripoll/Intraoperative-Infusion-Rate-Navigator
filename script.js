function calculateFluids() {
    const weight = parseFloat(document.getElementById('weight').value);
    const npo = parseFloat(document.getElementById('npo').value);
    const evapRate = parseFloat(document.getElementById('surgery').value);
    const bloodLoss = parseFloat(document.getElementById('bloodLoss').value);
    const fluidRatio = parseFloat(document.getElementById('fluidType').value);

    if (isNaN(weight) || isNaN(npo)) { 
        alert('Por favor, ingrese peso y horas de ayuno.'); 
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
    const bloodReplacement = bloodLoss * fluidRatio;

    const hour1 = maintenance + (deficit * 0.5) + evapLoss + bloodReplacement;
    const hour2 = maintenance + (deficit * 0.25) + evapLoss + bloodReplacement;
    const hour3 = maintenance + (deficit * 0.25) + evapLoss + bloodReplacement;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="result-item">Mantenimiento Basal: ${maintenance.toFixed(1)} ml/hr</div>
        <div class="result-item">Déficit Total (NPO): ${deficit.toFixed(1)} ml</div>
        <div class="result-item">Pérdida por Evaporación: ${evapLoss.toFixed(1)} ml/hr</div>
        <div class="result-item">Reposición Sangre: ${bloodReplacement.toFixed(1)} ml</div>
        <div style="margin-top:20px; color:#fff">TOTAL REPOSICIÓN SUGERIDA:</div>
        <div class="result-item">Primera Hora: ${hour1.toFixed(1)} ml/hr</div>
        <div class="result-item">Segunda Hora: ${hour2.toFixed(1)} ml/hr</div>
        <div class="result-item">Tercera Hora: ${hour3.toFixed(1)} ml/hr</div>
    `;
}
