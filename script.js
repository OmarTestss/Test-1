const branches = [
  {
    name: "دار صلاح الدين الأيوبي",
    mosqueName: "ملحق بجامع صلاح الدين الأيوبي",
    neighborhood: "حي مخطط الموسى",
    lat: 18.324770,
    lng: 42.766363,
    mapLink: "https://maps.app.goo.gl/yvS8ccvSMrq8LsYF8"
  },
  {
    name: "دار أم سلمة",
    mosqueName: "جامع أم سلمة",
    neighborhood: "حي القافلة",
    lat: 18.3305,
    lng: 42.7642,
    mapLink: "https://maps.app.goo.gl/xyz123"
  }
];

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

document.getElementById("findBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      branches.forEach(branch => {
        branch.distance = getDistance(userLat, userLng, branch.lat, branch.lng);
      });

      branches.sort((a, b) => a.distance - b.distance);

      const nearest = branches[0];

      document.getElementById("result").innerHTML = `
        ✅ أقرب دار: <strong>${nearest.name}</strong><br>
        📍 الموقع: ${nearest.mosqueName}, ${nearest.neighborhood}<br>
        📏 تبعد تقريبًا: ${nearest.distance.toFixed(2)} كم<br>
        <a href="${nearest.mapLink}" target="_blank">افتح في خرائط Google</a>
      `;

      const list = document.getElementById("branchesList");
      list.innerHTML = "";
      branches.forEach(branch => {
        const li = document.createElement("li");
        li.innerHTML = `📌 ${branch.name} – ${branch.distance.toFixed(2)} كم`;
        list.appendChild(li);
      });

    }, () => {
      alert("فشل في الحصول على الموقع، تأكد من السماح للوصول إلى موقعك.");
    });
  } else {
    alert("المتصفح لا يدعم تحديد الموقع.");
  }
});