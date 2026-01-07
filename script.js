// Intraoperative Infusion Rate Navigator - Sync v3.8
function executeInfusionCalc() {
    const weight = parseFloat(document.getElementById('weight').value);
    const npo = parseFloat(document.getElementById('npo').value);
    const evapRate = parseFloat(document.getElementById('surgery').value);

    if (isNaN(weight) || isNaN(npo)) {
        alert('DATA ERROR: Please provide valid patient parameters.');
        return;
    }

    // Strict Adult Validations with specific app range wording
    if (weight < 40 || weight > 160) {
        alert('CRITICAL ERROR: Weight (' + weight + ' kg) is outside the range defined for this application (40-160 kg). Calculation halted.');
        return;
    }

    if (npo > 12) {
        alert('CRITICAL ERROR: Fasting duration (' + npo + ' hours) exceeds the range defined for this application (max 12h). Calculation halted.');
        return;
    }

    let maintenance = weight + 40;
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

    const display = document.getElementById('data-display');
    let output = `
        <div class="output-card"><span>BASAL RATE</span><strong>${maintenance.toFixed(0)} ml/h</strong></div>
        <div class="output-card"><span>NPO DEFICIT</span><strong>${deficit.toFixed(0)} ml</strong></div>
        <div class="output-card span-full"><span>EVAPORATIVE LOSS RATE</span><strong>${evapLoss.toFixed(0)} ml/h</strong></div>
    `;

    schedules.forEach((val, i) => {
        output += `<div class="output-card"><span>HOUR ${i + 1}</span><strong>${val.toFixed(0)} ml/h</strong></div>`;
    });

    display.innerHTML = output;
}

function resetCalculator() {
    document.getElementById('weight').value = '';
    document.getElementById('npo').value = '';
    document.getElementById('surgery').selectedIndex = 1;
    document.getElementById('data-display').innerHTML = '';
}
