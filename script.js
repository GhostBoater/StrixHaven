async function generateEncounter() {
  const year = parseInt(document.getElementById('year').value);
  const npcCount = parseInt(document.getElementById('npcCount').value);
  const resultDiv = document.getElementById('result');

  const response = await fetch('encounters.json');
  const data = await response.json();

  // Pick random location and monster
  const location = data.locations[Math.floor(Math.random() * data.locations.length)];
  const monster = data.monsters[Math.floor(Math.random() * data.monsters.length)];

  // Filter NPCs by year and pick random ones
  const npcsForYear = data.npcs.filter(npc => npc.year === year);
  const shuffled = npcsForYear.sort(() => 0.5 - Math.random());
  const selectedNPCs = shuffled.slice(0, npcCount);

  // Build the encounter HTML
  let html = `<h2>Encounter</h2>`;
  html += `<p><strong>Location:</strong> ${location.name} - ${location.description}</p>`;
  html += `<p><strong>Monster:</strong> ${monster.name} - ${monster.description}</p>`;
  html += `<p><strong>NPCs Present:</strong></p><ul>`;
  selectedNPCs.forEach(npc => {
    html += `<li><strong>${npc.name}</strong> (${npc.house}, Year ${npc.year}) - ${npc.traits}</li>`;
  });
  html += `</ul>`;

  resultDiv.innerHTML = html;
}
