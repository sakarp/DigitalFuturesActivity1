let loadedUp = false;

window.addEventListener('load', function () {

    fetch('/')
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    });
    loadedUp = true;
});