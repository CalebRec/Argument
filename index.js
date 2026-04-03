// --- Mock data for now (you can later replace with real API calls) ---

const rooms = [
  {
    id: 1,
    name: "Lounge",
    description: "A low-key lounge to chill with your friends. Great for private parties!",
    tags: ["hangout"],
    owner: "Argon2018",
  },
  {
    id: 2,
    name: "LaserTag",
    description: "Teams battle each other and waves of robots.",
    tags: ["pvp"],
    owner: "Argon2018",
  },
  {
    id: 3,
    name: "Paintball",
    description: "Red and Blue teams splat each other in capture the flag and team battle.",
    tags: ["pvp", "],
    owner: "Argon2018",
  },
];


const events = [
  {
    id: 1,
    title: "Argon Opens Soon!",
    room: "Lounge",
    host: "Argon2018",
    time: "April 5, 2026",
  },
  {
    id: 2,
    title: "Event 1",
    room: "Lounge",
    host: "Argon2018",
    time: "N/A",
  },
];

const activity = [
  "This website has been created by @calebplaylist.",
  "Collaborations: Jacklanter, tryxx",
  "Argon [2018] has just been boosted to Level 2!",
  "Huge shoutout to Kerian for being the one responsible for the build.",
];

// --- DOM helpers ---

function createRoomCard(room) {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.tags = room.tags.join(",");
  div.innerHTML = `
    <h2>${room.name}</h2>
    <p>${room.description}</p>
    <p class="meta"><span class="tag">Owner: ${room.owner}</span></p>
    <p>
      ${room.tags
        .map((t) => `<span class="tag">${t.toUpperCase()}</span>`)
        .join(" ")}
    </p>
  `;
  return div;
}

function createClubCard(club) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h2>${club.name}</h2>
    <p>${club.description}</p>
    <p class="meta"><span class="tag">${club.members} members</span></p>
  `;
  return div;
}

function createEventCard(event) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h2>${event.title}</h2>
    <p>${event.room}</p>
    <div class="event-meta">
      <span>Host: ${event.host}</span>
      <span>Time: ${event.time}</span>
    </div>
  `;
  return div;
}

// --- Render functions ---

function renderRooms(filterTag = "all") {
  const container = document.getElementById("rooms-list");
  container.innerHTML = "";
  rooms
    .filter((room) =>
      filterTag === "all" ? true : room.tags.includes(filterTag)
    )
    .forEach((room) => container.appendChild(createRoomCard(room)));
}

function renderClubs() {
  const container = document.getElementById("clubs-list");
  container.innerHTML = "";
  clubs.forEach((club) => container.appendChild(createClubCard(club)));
}

function renderEvents() {
  const eventsList = document.getElementById("events-list");
  const homeEvents = document.getElementById("home-events");
  eventsList.innerHTML = "";
  homeEvents.innerHTML = "";

  events.forEach((event) => {
    eventsList.appendChild(createEventCard(event));

    const li = document.createElement("li");
    li.textContent = `${event.title} — ${event.time}`;
    homeEvents.appendChild(li);
  });
}

function renderFeaturedRooms() {
  const container = document.getElementById("featured-rooms");
  container.innerHTML = "";
  rooms.slice(0, 3).forEach((room) => {
    const li = document.createElement("li");
    li.textContent = room.name;
    container.appendChild(li);
  });
}

function renderActivity() {
  const container = document.getElementById("activity-feed");
  container.innerHTML = "";
  activity.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

// --- Filters ---

function setupRoomFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tag = btn.dataset.tag;
      renderRooms(tag);
    });
  });
}

// --- Init ---

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderRooms();
  renderClubs();
  renderEvents();
  renderFeaturedRooms();
  renderActivity();
  setupRoomFilters();
});
