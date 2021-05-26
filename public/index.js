const fetchApi = async (image, width = "", height = "") => {
    const response = await fetch(
        `http://localhost:3000/api?image=${image}&width=${width}&height=${height}`
    );

    if (response.ok) {
        const val = await response.text(); // TODO: change to recieve image file
        return Promise.resolve(val);
    }
    // TODO: add error handling [ if !response.ok ]
};

document.getElementById("btngn").addEventListener("click", async (e) => {
    const selected = document.querySelector('input[name="image"]:checked');
    if (selected) {
        const getImage = selected.value;
        // const response = await fetchApi(getImage);
        // console.log(response);

        const width = "",
            height = "";
        const response = await fetch(
            `http://localhost:3000/api?image=${getImage}&width=${width}&height=${height}`
        );

        if (response.ok) {
            const val = await response.blob(); // TODO: change to recieve image file

            const data = URL.createObjectURL(val);
            return Promise.resolve(data);
        }
    }
});
