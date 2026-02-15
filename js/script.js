const formulations = {
    pondeuse: [
        { name: "Maïs", ratio: 0.45, price: 100 },
        { name: "Soja", ratio: 0.15, price: 200 },
        { name: "Son de Riz/Blé", ratio: 0.10, price: 150 },
        { name: "Coton", ratio: 0.10, price: 300 },
        { name: "Poisson", ratio: 0.05, price: 800 },
        { name: "Concentré", ratio: 0.05, price: 1200 },
        { name: "Calcium", ratio: 0.07, price: 200 },
        { name: "Huile Rouge", ratio: 0.03, price: 1100 }
    ],
    chair: [
        { name: "Maïs", ratio: 0.50, price: 100 },
        { name: "Soja", ratio: 0.25, price: 200 },
        { name: "Son", ratio: 0.08, price: 150 },
        { name: "Poisson", ratio: 0.05, price: 800 },
        { name: "Concentré", ratio: 0.05, price: 1200 },
        { name: "Huile Rouge", ratio: 0.07, price: 1100 }
    ],
    // Vous pouvez rajouter les autres types ici...
};

function calculer() {
    const type = document.getElementById('typeElevage').value;
    const totalQty = parseFloat(document.getElementById('totalQty').value) || 0;
    const tbody = document.getElementById('result-table');
    const ings = formulations[type] || formulations.pondeuse;
    
    tbody.innerHTML = "";
    let totalCost = 0;

    ings.forEach((ing) => {
        const weight = (totalQty * ing.ratio).toFixed(2);
        const cost = Math.round(weight * ing.price);
        totalCost += cost;

        tbody.innerHTML += `
            <tr>
                <td>${ing.name}</td>
                <td class="qty-val">${weight}</td>
                <td>${ing.price}</td>
                <td>${cost.toLocaleString()}</td>
                <td><button onclick="alert('Indispensable pour : ${ing.name}')">?</button></td>
            </tr>`;
    });

    document.getElementById('totalCostDisplay').innerText = totalCost.toLocaleString();
}

function genererTextePartage() {
    const type = document.getElementById('typeElevage').options[document.getElementById('typeElevage').selectedIndex].text;
    const total = document.getElementById('totalQty').value;
    const cout = document.getElementById('totalCostDisplay').innerText;
    
    let texte = `*ECOPONTE BÉNIN - FICHE DE MÉLANGE*\n`;
    texte += `Type: ${type}\nQuantité: ${total} kg\n`;
    texte += `Coût estimé: ${cout} FCFA\n\nContact: 01 95002396`;
    return encodeURIComponent(texte);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('typeElevage').addEventListener('change', calculer);
    document.getElementById('totalQty').addEventListener('input', calculer);
    
    document.getElementById('btnWhatsapp').addEventListener('click', () => {
        window.open(`https://wa.me/?text=${genererTextePartage()}`, '_blank');
    });

    document.getElementById('btnEmail').addEventListener('click', () => {
        const texte = decodeURIComponent(genererTextePartage());
        window.location.href = `mailto:?subject=Fiche EcoPonte&body=${encodeURIComponent(texte)}`;
    });

    document.getElementById('btnSms').addEventListener('click', () => {
        const texte = decodeURIComponent(genererTextePartage());
        window.location.href = `sms:?body=${encodeURIComponent(texte)}`;
    });

    calculer();
});