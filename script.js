// Crop Data
const crops = [
    {
        id: 'rice',
        name: 'Rice',
        scientificName: 'Oryza sativa',
        description: 'A staple grain that requires high water levels and warm temperatures. Thrives in flooded conditions.',
        seasons: ['Kharif'],
        soilTypes: ['Alluvial', 'Clayey'],
        rainfallRange: [1000, 2500],
        tempRange: [20, 35],
        nutrients: { N: 'High', P: 'Medium', K: 'Medium' },
        duration: '120-150 days',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800'
    },
    {
        id: 'wheat',
        name: 'Wheat',
        scientificName: 'Triticum aestivum',
        description: 'Cool climate crop grown during winter, requires moderate moisture and well-drained soil.',
        seasons: ['Rabi'],
        soilTypes: ['Alluvial', 'Loamy'],
        rainfallRange: [500, 1000],
        tempRange: [10, 25],
        nutrients: { N: 'Medium', P: 'High', K: 'Medium' },
        duration: '110-130 days',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800'
    },
    {
        id: 'maize',
        name: 'Maize (Corn)',
        scientificName: 'Zea mays',
        description: 'Versatile crop used for food, fodder, and industry. Prefers sunny days and moderate rain.',
        seasons: ['Kharif', 'Zaid'],
        soilTypes: ['Alluvial', 'Red', 'Loamy'],
        rainfallRange: [600, 1200],
        tempRange: [18, 27],
        nutrients: { N: 'High', P: 'Medium', K: 'Low' },
        duration: '90-110 days',
        image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=800'
    },
    {
        id: 'cotton',
        name: 'Cotton',
        scientificName: 'Gossypium',
        description: 'White gold of agriculture. Requires long frost-free periods and moderate rainfall.',
        seasons: ['Kharif'],
        soilTypes: ['Black', 'Alluvial'],
        rainfallRange: [500, 1000],
        tempRange: [21, 30],
        nutrients: { N: 'Medium', P: 'Medium', K: 'High' },
        duration: '160-180 days',
        image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=800'
    },
    {
        id: 'sugarcane',
        name: 'Sugarcane',
        scientificName: 'Saccharum officinarum',
        description: 'A long-duration cash crop that needs abundant water and hot, humid conditions.',
        seasons: ['Kharif', 'Rabi'],
        soilTypes: ['Alluvial', 'Black', 'Red'],
        rainfallRange: [1500, 2500],
        tempRange: [20, 32],
        nutrients: { N: 'High', P: 'High', K: 'High' },
        duration: '300-360 days',
        image: 'https://images.unsplash.com/photo-1590240974526-77893f49ebcb?q=80&w=800'
    },
    {
        id: 'millet',
        name: 'Millet',
        scientificName: 'Pennisetum glaucum',
        description: 'Incredibly hardy crop that survives in poor soil and extreme heat with very little water.',
        seasons: ['Kharif', 'Zaid'],
        soilTypes: ['Red', 'Laterite', 'Loamy'],
        rainfallRange: [300, 600],
        tempRange: [25, 40],
        nutrients: { N: 'Low', P: 'Low', K: 'Medium' },
        duration: '70-90 days',
        image: 'https://images.unsplash.com/photo-1593121925328-369ec8459c08?q=80&w=800'
    }
];

// Logic
function getRecommendations(data) {
    return crops.map(crop => {
        let score = 0;
        const matchedFactors = [];

        // Check season
        if (crop.seasons.includes(data.season)) {
            score += 30;
            matchedFactors.push('Ideal Season');
        }

        // Check soil type
        if (crop.soilTypes.includes(data.soilType)) {
            score += 30;
            matchedFactors.push('Perfect Soil');
        }

        // Check rainfall
        const [minRain, maxRain] = crop.rainfallRange;
        if (data.rainfall >= minRain && data.rainfall <= maxRain) {
            score += 20;
            matchedFactors.push('Optimal Moisture');
        } else if (data.rainfall >= minRain * 0.7 && data.rainfall <= maxRain * 1.3) {
            score += 10;
            matchedFactors.push('Adequate Moisture');
        }

        // Check temperature
        const [minTemp, maxTemp] = crop.tempRange;
        if (data.temperature >= minTemp && data.temperature <= maxTemp) {
            score += 20;
            matchedFactors.push('Favorable Climate');
        }

        return {
            crop,
            score,
            matchedFactors
        };
    })
        .filter(res => res.score > 40)
        .sort((a, b) => b.score - a.score);
}

// DOM Elements
const advisorForm = document.getElementById('advisor-form');
const resultsArea = document.getElementById('results-area');
const resultsGrid = document.getElementById('results-grid');
const resetBtn = document.getElementById('reset-btn');

// Interaction
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

advisorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        season: document.getElementById('season').value,
        soilType: document.getElementById('soilType').value,
        rainfall: parseFloat(document.getElementById('rainfall').value),
        temperature: parseFloat(document.getElementById('temperature').value)
    };

    const results = getRecommendations(formData);
    renderResults(results);

    resultsArea.classList.remove('hidden');
    resultsArea.scrollIntoView({ behavior: 'smooth' });
});

resetBtn.addEventListener('click', () => {
    advisorForm.reset();
    resultsArea.classList.add('hidden');
    scrollToSection('advisor-section');
});

function renderResults(results) {
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="glass" style="grid-column: 1/-1; padding: 60px; text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h3>No perfect matches found</h3>
                <p>Try adjusting your field parameters or exploring hybrid varieties.</p>
            </div>
        `;
        return;
    }

    resultsGrid.innerHTML = results.map((res, index) => `
        <div class="crop-card glass fade-in-up" style="animation-delay: ${index * 0.1}s">
            <div class="crop-image">
                <img src="${res.crop.image}" alt="${res.crop.name}">
                <div class="match-badge">${res.score}% Match</div>
            </div>
            <div class="crop-info">
                <div class="crop-title">
                    <div class="crop-name">
                        <h3>${res.crop.name}</h3>
                        <div class="scientific">${res.crop.scientificName}</div>
                    </div>
                </div>
                <p class="crop-desc">${res.crop.description}</p>
                <div class="crop-meta">
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span><strong>Duration:</strong> ${res.crop.duration}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        <div class="nutrients">
                            <span class="nutrient-tag">N: ${res.crop.nutrients.N}</span>
                            <span class="nutrient-tag">P: ${res.crop.nutrients.P}</span>
                            <span class="nutrient-tag">K: ${res.crop.nutrients.K}</span>
                        </div>
                    </div>
                </div>
                <div class="factor-tags">
                    ${res.matchedFactors.map(f => `<span class="factor-tag">${f}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Add CSS for fade-in-up
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
`;
document.head.appendChild(style);
