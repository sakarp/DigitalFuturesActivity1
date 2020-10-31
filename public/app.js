let loadedUp = false;
let currentActivity;
window.addEventListener('load', function () {

    fetch('/activity1')
    .then(resp => resp.json())
    .then(data => {
        currentActivity = data;
    });
    loadedUp = true;
});

