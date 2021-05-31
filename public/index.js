const fetchApi = async (image, width = "", height = "") => {
    let response = undefined,
        rtnObj = {
            ready: false,
            error: undefined,
            address: ""
        };

    debugger;
    response = await fetch(
        `http://localhost:3000/api?image=${image}&width=${width}&height=${height}`
    );

    if (response.ok) {
        rtnObj.ready = true;
        rtnObj.address = response.url;
        debugger;
    } else {
        const text = await response.text();
        rtnObj.error = text;
        debugger;
    }

    return rtnObj;
};

const simulateDelay = async (str, callback) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(500);
};

document.getElementById("btngn").addEventListener("click", async (e) => {
    const selected = document.querySelector('input[name="image"]:checked'),
        errHTMLElement = document.querySelector(".error"),
        divLink = document.querySelector("#link"),
        widthElem = document.querySelector("#width"),
        heightElem = document.querySelector("#height");

    if (selected) {
        const getImage = selected.value;

        divLink.innerText = "Loading...";
        const response = await fetchApi(
            getImage,
            widthElem.value,
            heightElem.value
        );

        await simulateDelay();

        if (!response.ready) {
            divLink.innerText = "";
            errHTMLElement.innerHTML = response.error;
            return;
        }

        divLink.innerText = "";

        const address = response.address;

        const link = document.createElement("a");
        var linkText = document.createTextNode(address);
        link.appendChild(linkText);
        link.href = address;

        divLink.appendChild(link);

        // const width = "",
        //     height = "";
        // const response = await fetch(
        //     `http://localhost:3000/api?image=${getImage}&width=${width}&height=${height}`
        // );

        // if (response.ok) {
        //     const val = await response.blob(); // TODO: change to recieve image file

        //     const data = URL.createObjectURL(val);
        //     return Promise.resolve(data);
        // }
    }
});
