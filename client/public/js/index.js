/* global document, fetch */

const HOST = "http://0.0.0.0:8080";
const API_HOST = "http://0.0.0.0:3000";
// Debounce duration in milliseconds
const debounceDuration = 1000;

// Input elements
const urlElement = document.querySelector("#url");
const aliasElement = document.querySelector("#alias");

// Output elements
const messageElement = document.querySelector("#message");
const linkElement = document.querySelector("#link");

let submitDebounceTimer;

function submit() {
    fetch(`${
        API_HOST
    }/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            url: urlElement.value,
            alias: aliasElement.value || undefined
        })
    }).then(
        (response) => (response.ok ? Promise.all([
            undefined,
            response.json()
        ]) : Promise.all([
            response.json()
        ]))
    ).then(
        ([ error, body ]) => {
            if (error) {
                messageElement.classList.add("error");
                messageElement.innerHTML = error.message;
                linkElement.innerHTML = "";
            } else {
                messageElement.classList.remove("error");
                messageElement.innerHTML = "Link is ready:";
                linkElement.innerHTML = `${
                    HOST
                }/${
                    body.alias
                }`;
            }
        }
    ).catch((error) => {
        messageElement.classList.add("error");
        messageElement.innerHTML = error.message;
        linkElement.innerHTML = "";
    });
}

function debounceSubmit() {
    clearTimeout(submitDebounceTimer);
    submitDebounceTimer = setTimeout(submit, debounceDuration);
}

urlElement.addEventListener("keyup", debounceSubmit, {
    capture: true
});

aliasElement.addEventListener("keyup", debounceSubmit, {
    capture: true
});

// Focus on the URL input box initially
urlElement.focus();
