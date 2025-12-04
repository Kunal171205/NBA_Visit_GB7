let storeList = [];

// Load data from backend
async function loadStores() {
  const res = await fetch("/stores/all");
  storeList = await res.json();

  generateList(storeList);
  renderMarkers();
}

// CATEGORY COLORS
const categoryColors = {
  Automobile: "#00aaff",
  Engineering: "#ff9500",
  Electronics: "#13d16b",
  Energy: "#ffd000",
  Default: "#ffffff"
};

// Dark map
const myMap = L.map("map").setView([18.5204, 73.8567], 10);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  { maxZoom: 20 }
).addTo(myMap);

let shopsLayer;

// Render markers (circle markers)
function renderMarkers() {
  if (shopsLayer) myMap.removeLayer(shopsLayer);

  shopsLayer = L.geoJSON(storeList, {
    pointToLayer: (feature, latlng) => {
      const category = feature.properties.category;
      const color = categoryColors[category] || categoryColors.Default;

      return L.circleMarker(latlng, {
        radius: 10,
        color: color,
        weight: 3,
        fillColor: color,
        fillOpacity: 0.8,
      });
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(makePopup(feature));
    }
  }).addTo(myMap);
}

// Popup UI
function makePopup(s) {
  return `
    <h2 style="color:#00d4ff;">${s.properties.name}</h2>
    <p><b>📍 Address:</b> ${s.properties.address}</p>
    <p><b>🏭 Sector:</b> ${s.properties.sector}</p>
    <p><b>📞 Contact:</b> ${s.properties.phone}</p>
    <p><b>🌐 Website:</b> 
      <a href="${s.properties.website}" target="_blank" style="color:#00d4ff;">
        Visit Site
      </a>
    </p>
  `;
}

// Sidebar list
function generateList(stores) {
  const ul = document.querySelector(".list");
  ul.innerHTML = "";

  stores.forEach((s) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${s.properties.name}</strong><br>${s.properties.address}`;
    li.onclick = () => flyTo(s);
    ul.appendChild(li);
  });
}

// Fly to marker
function flyTo(s) {
  const [lng, lat] = s.geometry.coordinates;
  myMap.flyTo([lat, lng], 15, { duration: 1.5 });
}

// Search
document.getElementById("searchInput").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();

  const results = storeList.filter(
    (s) =>
      s.properties.name.toLowerCase().includes(q) ||
      s.properties.sector.toLowerCase().includes(q) ||
      s.properties.category.toLowerCase().includes(q)
  );

  generateList(results);
});

loadStores();
