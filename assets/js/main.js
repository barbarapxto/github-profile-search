const URL_REQUEST = "https://api.github.com";

const containerAlertEl = document.querySelector(".container__alert");
const inputEl = document.querySelector(".container__input");
const buttonEl = document.querySelector(".container__button");
const imageEl = document.querySelector(".container__image");
const titleEl = document.querySelector(".container__title");
const bioEl = document.querySelector(".container__bio");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const repositoriesEl = document.querySelector("#repositories");
const profileEl = document.querySelector(".container__profile");

const searchProfile = () => {
    axios
        .get(`${URL_REQUEST}/users/${inputEl.value}`)
        .then((response) => {
            setProfileVisibility(true);
            clearAlert();

            const data = response.data;
            imageEl.src = data.avatar_url;
            titleEl.innerHTML = data.name;
            titleEl.onclick = () => {
                window.open(data.html_url);
            };

            bioEl.innerHTML = data.bio;
            followersEl.innerHTML = data.followers;
            followingEl.innerHTML = data.following;
            repositoriesEl.innerHTML = data.public_repos;
        })
        .catch((error) => {
            const alertError = document.createElement("p");
            alertError.classList.add("alert-error");
            alertError.innerText = "O perfil pesquisado não foi encontrado.";

            setProfileVisibility(false);
            clearAlert();
            containerAlertEl.appendChild(alertError);
        });
};

const clearAlert = () => {
    containerAlertEl.textContent = "";
};

const setProfileVisibility = (show) => {

    if (show) {
        profileEl.classList.remove("container__profile--hidden");
        return;
    }

    profileEl.classList.add("container__profile--hidden");
};

buttonEl.addEventListener("click", searchProfile);
