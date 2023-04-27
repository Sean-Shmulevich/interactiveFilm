async function fetchRandomUsers() {
    const response = await fetch("https://randomuser.me/api/?results=3");
    const data = await response.json();
    const images = [];
    for (let i = 0; i < 3; i++) {
        const pic = document.createElement("img");
        pic.setAttribute("id", `img${i}`);
        pic.src = data.results[i].picture.large;
        images[i] = pic;
        pic.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128 / 3;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(pic, 0, i*128/3/*draw the i'th third of the picture */, pic.width, (pic.height / 3), 0, 0, pic.width, (pic.height / 3));

            //append 3 canvas to the div flexbox
            document.getElementById("personImage").appendChild(canvas);
        });
    }
}
window.addEventListener('load', () => {
    fetchRandomUsers();

    document.getElementById('nextButton').addEventListener('click', () => {
        //clear the div
        document.getElementById("personImage").innerHTML = "";
        fetchRandomUsers();
    });
});
