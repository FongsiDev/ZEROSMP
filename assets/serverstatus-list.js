const randomElement = document.querySelectorAll(".px-6")[0];
let servers = [
  {
    name: "ZERO SMP",
    ip: "zsmps1.hopto.org:26123",
  },
  { name: "ZERO SMP SURVIVAL",
    ip: "zsmps1.hopto.org:34087"
  },
  { name: "ZERO SMP PARKOUR",
    ip: "netherlands.seanodes.xyz:25633"
  },
  { name: "ZERO SMP MINIGAMES FULL",
    go: true,
    ip: "zsm9ps1.hopto.org:00002"
  }
];
let count = 0;
function handleErrors(response) {
  if (!response.ok) {
    document.getElementById("serverStatus").innerHTML = "";
    document.getElementById("serverStatusM").innerHTML = "";
    document.getElementById("serverLogoName").classList.remove("hidden");
  }
  return response;
}

(async () => {
  try {
    servers.map((e) => {
      fetch("https://api.mcsrvstat.us/2/" + e.ip)
        .then(handleErrors)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
       	if(data.online) {
          let div = document.createElement("div");
          div.id = "serverPlaynow";
          div.className = "text-sm font-thin -mb-3";
          div.innerHTML = `
    	<a href="${e.go ? "#": `minecraft://?addExternalServer=${e.name}|${e.ip}`}"> <span type="btn"
                class="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-thin uppercase text-gray-900 mr-2 shadow-lg"
                >${e.name}| ${data.version} ( Click To Play )</span
              ></a>
            </div>
            <p
              class="text-gray-100 text-base bg-green-900
              rounded py-6 px-3 sm:text-xl md:text-2xl font-mono overflow-hidden shadow-xl select-all"
              id="serverIP"
              data-clipboard-text="${e.go ? "Soon!": e.ip}"
            >
              ${e.go ? "- - - -": e.ip}<br>${data.players.online} Online
            </p><br><br>
    	`;

          randomElement.appendChild(div);
          count++
        	} else {
          let div = document.createElement("div");
          div.id = "serverPlaynow";
          div.className = "text-sm font-thin -mb-3";
          div.innerHTML = `
    	<a href="${e.go ? "#": `minecraft://?addExternalServer=${e.name}|${e.ip}`}"> <span type="btn"
                class="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-thin uppercase text-gray-900 mr-2 shadow-lg"
                >${e.name}| v0.0.0 ${e.go ? "( New Server )": ""}</span
              ></a>
            </div>
            <p
              class="text-gray-100 text-base bg-orange-800
              rounded py-6 px-3 sm:text-xl md:text-2xl font-mono overflow-hidden shadow-xl select-all"
              id="serverIP"
              data-clipboard-text="${e.go ? "Soon!": e.ip}"
            >
              ${e.go ? "- - - -": e.ip}<br>0 Online
            </p><br><br>
    	`;

          randomElement.appendChild(div);
        	}
        });
    });
  } catch (e) {
    console.log(e);
  }
})();
document.getElementById("serverStatusM").innerHTML = `<p class="font-bold select-none"><span class="text-green-600">&#11044;</span> ${count} Server Online</p>`;
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433