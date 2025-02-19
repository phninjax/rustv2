
const doParticles = true;

const tellUsersWhenServerIsOffline = true;

const serverOfflineText = "Server isn't online!";

const ipCopiedText = "IP copied!";


if (doParticles) {
    (async () => {
        await loadSlim(tsParticles);
        await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 100,
            particles: {
                number: {
                    value: 100,
                    density: { enable: true },
                },
                color: {
                    value: ["#ffffff", "#d4f4fc", "#dfebed"],
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                },
                size: {
                    value: { min: 0.7, max: 2 },
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    random: false,
                },
            }
          },
        });
      })();
}

const ipSpanElement = document.getElementById('ip');
const originalIPText = ipSpanElement.innerHTML;

ipSpanElement.addEventListener("click", () => {
    let tempTextarea = document.createElement("textarea");
    tempTextarea.style.position = "absolute";
    tempTextarea.style.left = "-99999px";
    tempTextarea.style.top = "0";
    document.body.appendChild(tempTextarea);
    tempTextarea.textContent = originalIPText;
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);

    ipSpanElement.innerHTML = `<span class='extrapad'>${ipCopiedText}</span>`;
    setTimeout(() => {
        ipSpanElement.innerHTML = originalIPText;
    }, 800);
});

const playercountBannerElement = document.getElementById('playercount');
const playercountSpanElement = document.getElementById('sip');

const initialisePlayercountFetcher = () => {
    const ip = playercountSpanElement.getAttribute("data-ip");
    const port = playercountSpanElement.getAttribute("data-port") || "25565";

    if (ip == "" || ip == null) return console.error("Error fetching player count - is the IP set correctly in the HTML?");
    
    updatePlayercount(ip, port);

    setInterval(() => updatePlayercount(ip, port), 60000);
};

const updatePlayercount = (ip, port) => {
    fetch(`https://api.bybilly.uk/api/players/${ip}/${port}`)
    .then(res => res.json())
    .then(data => {
        if (data.hasOwnProperty('online')) {
            playercountSpanElement.innerHTML = data.online;
            playercountSpanElement.style.display = 'inline';
        } else {
            if (tellUsersWhenServerIsOffline) {
                playercountBannerElement.innerHTML = serverOfflineText;
            } else {
                playercountSpanElement.style.display = 'none';
            }
        }
    })
    .catch(err => {

        console.error(`Error fetching playercount: ${err}`);
        playercountSpanElement.style.display = 'none';
    });
};

initialisePlayercountFetcher();
