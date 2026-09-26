// ALL VARIABLES AND DOC SELECTIONS

let addNote = document.querySelector("#add-note")
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm")

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
    "input[placeholder='https://example.com/photo.jpg']"
);

const fullNameInput = form.querySelector(
    "input[placeholder='Enter full name']"
);

const homeTownInput = form.querySelector(
    "input[placeholder='Enter home town']"
);

const purposeInput = form.querySelector(
    "input[placeholder='e.g., Quick appointment note']"
);

const categoryRadios = form.querySelectorAll("input[name='Category']");

const submitButton = form.querySelector(".submit-btn");

// LOCAL STORAGE

function saveToLocalStorage(obj) {

    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));           
    }
}

// OPEN / CLOSE FORM
addNote.addEventListener("click", function () {
    formContainer.style.display = "flex";
});

closeForm.addEventListener("click", function () {
    formContainer.style.display = "none";
});

// FORM SUBMISSION
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();

    // From logic
    let  selected = false;
    categoryRadios.forEach(function (cat) {
        if (cat.checked) {
            selected = cat.value;
        }
    });

    if (imageUrl === "") {
        alert("Please enter an Image URL.");
        return;
    }

    if (fullName === "") {
        alert("Please enter your Full Name.");
        return;
    }

    if (homeTown === "") {
        alert("Please enter your Home Town.");
        return;
    }

    if (purpose === "") {
        alert("Please enter the Purpose.");
        return;
    }

    if (!selected) {
        alert("Please select a category");
        return;
    }

    // Data Save in LocalStorage
    saveToLocalStorage ({
        imageUrl,
        fullName,
        purpose,
        homeTown,
        selected,
    });

    form.reset();
    formContainer.style.display = "none";
    showCards();
});

// DISPLAY CARDS
function showCards () {
    stack.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem("tasks"));

    allTasks.forEach(function(task) {

        // CARD CONTAINER
        const card = document.createElement("div");
        card.classList.add("card");

        // Avatar image
        const avatar = document.createElement("img");
        avatar.src = task.imageUrl;
        avatar.alt = "profile";
        avatar.classList.add("avatar");
        card.appendChild(avatar);

        // Card info wrapper
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");
        card.appendChild(cardInfo);

        // Profile Name
        const name = document.createElement("h3");
        name.textContent = task.fullName;
        cardInfo.appendChild(name);

        // Home Town
        const hometownInfo = document.createElement("div");
        hometownInfo.classList.add("info-row");

        const hometownLabel = document.createElement("span");
        hometownLabel.classList.add("label");
        hometownLabel.textContent = "Home town";
        const hometownValue = document.createElement("span");
        hometownValue.classList.add("value");
        hometownValue.textContent = task.homeTown;

        hometownInfo.appendChild(hometownLabel);
        hometownInfo.appendChild(hometownValue);
        cardInfo.appendChild(hometownInfo);

        // Purpose
        const purposeInfo = document.createElement("div");
        purposeInfo.classList.add("info-row");

        const purposeLabel = document.createElement("span");
        purposeLabel.classList.add("label");
        purposeLabel.textContent = "Purpose";
        const purposeValue = document.createElement("span");
        purposeValue.classList.add("value");
        purposeValue.textContent = task.purpose;

        purposeInfo.appendChild(purposeLabel);
        purposeInfo.appendChild(purposeValue);
        cardInfo.appendChild(purposeInfo);

        // Buttons container 
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("card-actions");

        const callBtn = document.createElement("button");
        callBtn.classList.add("call-btn");
        callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

        const msgBtn = document.createElement("button");
        msgBtn.classList.add("msg-btn");
        msgBtn.innerHTML = '<i class="ri-message-2-line"></i> Message';

        // Add Card To DOM
        buttonsDiv.appendChild(callBtn);
        buttonsDiv.appendChild(msgBtn);

        card.appendChild(buttonsDiv);

        document.querySelector(".stack").appendChild(card); 
    });

    updateStack();
}

// INITIAL CARD LOAD
showCards();

// UPDATE CARD STACK
function updateStack() {
    const cards = document.querySelectorAll(".stack .card");

    cards.forEach(function (card, i) {
        if (i < 3) {
            card.style.zIndex = 3 - i;
            card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
            card.style.opacity = `${1 - i * 0.02}`;
        } else {
            card.style.opacity = "0";
        }
    });
}

// MOVE CARD UP
upBtn.addEventListener("click", function () {
    let lastChild =  stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild);
        updateStack();
    }
});

// MOVE CARD DOWN
downBtn.addEventListener("click", function () {
    const firstChild = stack.firstElementChild;
    if (firstChild) {
        stack.appendChild(firstChild);
        updateStack();
    }
})