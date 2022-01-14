function handleErrors(response) {
    if (!response.ok) {
        document.getElementById("serverStatus").innerHTML = "";
        document.getElementById("serverStatusM").innerHTML = "";
        document.getElementById("serverLogoName").classList.remove("hidden");
    }
    return response;
}
fetch("https://api.mcsrvstat.us/2/zsmps1.hopto.org:26123")
    .then(handleErrors)
    .then(response => {
        return response.json();
    })
.then(data => {
    if (data.online == true) {
        document.getElementById("serverVer").innerHTML = `Minecraft ${data.version} Server`;
        document.getElementById("serverStatus").innerHTML = `<p class="font-bold select-none"><span class="text-green-600">&#11044;</span>&emsp;We're online!&ensp;&middot;&ensp;${data.players.online} playing</p>`;
        document.getElementById("serverStatusM").innerHTML = `<p class="font-bold select-none"><span class="text-green-600">&#11044;</span>&emsp;Online, ${data.players.online} playing</p>`;
    }
    else {
        document.getElementById("serverPlaynow").innerHTML = `<span class="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-thin uppercase text-gray-900 mr-2 shadow-lg">Saat ini Offline</span>`;
        document.getElementById("serverIP").classList.remove("bg-green-900");
        document.getElementById("serverIP").classList.add("bg-orange-800");
        document.getElementById("serverStatus").innerHTML = `<p class="font-bold select-none"><span class="text-red-600">&#11044;</span>&emsp;Maaf! Kami sedang offline...</p>`;
        document.getElementById("serverStatusM").innerHTML = `<p class="font-bold select-none"><span class="text-red-600">&#11044;</span>&emsp;Offline</p>`;
    }
});
