const allFilterBtn = document.getElementById("all-filter-btn");
const openFilterBtn = document.getElementById("open-filter-btn");
const closedFilterBtn = document.getElementById("closed-filter-btn");

const pageLoader = document.getElementById("page-loader");

const searchElement = document.getElementById("search");

const newIssue = document.getElementById("new-issue");

let totalIssues = document.getElementById("total-issue");

let allCards = document.getElementById("all-cards");

let currentFilter = "all";

function toggleButton(type) {
    if (type === "open") {
        openFilterBtn.classList.add("bg-[#4A00FF]", "text-white");
        openFilterBtn.classList.remove("bg-white", "text-[#64748B]");

        allFilterBtn.classList.add("bg-white", "text-[#64748B]");
        allFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");

        closedFilterBtn.classList.add("bg-white", "text-[#64748B]");
        closedFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");
    }
    else if (type === "closed") {
        closedFilterBtn.classList.add("bg-[#4A00FF]", "text-white");
        closedFilterBtn.classList.remove("bg-white", "text-[#64748B]");


        allFilterBtn.classList.add("bg-white", "text-[#64748B]");
        allFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");

        openFilterBtn.classList.add("bg-white", "text-[#64748B]");
        openFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");
    }

    else if (type === "all") {
        closedFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");
        closedFilterBtn.classList.add("bg-white", "text-[#64748B]");


        allFilterBtn.classList.remove("bg-white", "text-[#64748B]");
        allFilterBtn.classList.add("bg-[#4A00FF]", "text-white");

        openFilterBtn.classList.add("bg-white", "text-[#64748B]");
        openFilterBtn.classList.remove("bg-[#4A00FF]", "text-white");
    }
}

allFilterBtn.addEventListener("click", () => {
    currentFilter = "all";
    toggleButton("all");
    issueCards();
});

function showLoader() {
    pageLoader.classList.remove("hidden");
}

function hideLoader() {
    pageLoader.classList.add("hidden");
}

openFilterBtn.addEventListener("click", () => {
    currentFilter = "open";
    toggleButton("open");
    issueCards();

});

closedFilterBtn.addEventListener("click", () => {
    currentFilter = "closed";
    toggleButton("closed");
    issueCards();
});



// search Function
searchElement.addEventListener("input", async (e) => {

    const value = e.target.value;

    if (value === "") {
        issueCards();
        return;
    }

    showLoader();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`);
    const data = await res.json();

    hideLoader();

    allCards.innerHTML = "";
    let count = 0;

    data.data.forEach(issue => {

        if (currentFilter === "open" && issue.status !== "open") return;
        if (currentFilter === "closed" && issue.status !== "closed") return;

        const card = document.createElement("div");

        card.innerHTML = `
        <div  class="cards bg-white rounded-lg shadow-md p-6 cursor-pointer flex flex-col gap-4 border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}">

        <div class="flex justify-between items-center">

            <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" class="w-6" alt="">

                    ${issue.priority === "high"
                ? `<span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                : issue.priority === "medium"
                    ? `<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                    : `<span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`
            }

        </div>

        <div class="space-y-2">
            <h2 class="text-lg font-semibold">
                ${issue.title}
            </h2>

            <p class="text-[#64748B] text-sm line-clamp-2">
                ${issue.description}
            </p>
        </div>

        <div class="flex gap-2 border-b border-gray-500  pb-4">
            ${issue.labels.map(label => label === "bug" ? `
                <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : label === "help wanted" ? `
                <span class="bg-yellow-100 border border-yellow-600 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : `
                <span class="bg-green-100 border border-green-500 text-green-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            `
            ).join("")}
        </div>

        <div class="text-sm text-[#64748B] space-y-1">
            <p>${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div>

    </div>

        `;

        allCards.appendChild(card);

        count++;
    });

    totalIssues.innerText = count;

});



// cards function

const issueCards = async () => {
    showLoader();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    hideLoader();

    let count = 0;
    allCards.innerHTML = '';
    data.data.forEach(issue => {


        if (currentFilter === "open" && issue.status !== "open") return;
        if (currentFilter === "closed" && issue.status !== "closed") return;

        const card = document.createElement("div");
        // console.log(issue);
        card.innerHTML = `
        
        <div  class="cards bg-white rounded-lg shadow-md p-6 cursor-pointer flex flex-col gap-4 border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}">

        <div class="flex justify-between items-center">

            <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" class="w-6" alt="">

                    ${issue.priority === "high"
                ? `<span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                : issue.priority === "medium"
                    ? `<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                    : `<span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`
            }

        </div>

        <div class="space-y-2">
            <h2 class="text-lg font-semibold">
                ${issue.title}
            </h2>

            <p class="text-[#64748B] text-sm line-clamp-2">
                ${issue.description}
            </p>
        </div>

        <div class="flex gap-2 border-b border-gray-500  pb-4">
            ${issue.labels.map(label => label === "bug" ? `
                <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : label === "help wanted" ? `
                <span class="bg-yellow-100 border border-yellow-600 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : `
                <span class="bg-green-100 border border-green-500 text-green-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            `
            ).join("")}
        </div>

        <div class="text-sm text-[#64748B] space-y-1">
            <p>${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div>

    </div>

        `

        allCards.appendChild(card);

        // modal

        card.addEventListener("click", (e) => {
            e.preventDefault();

            // create modal
            const modal = document.createElement("dialog");
            modal.id = "my_modal_1";
            modal.classList.add("modal");
            modal.innerHTML = `
       <!-- Open the modal using ID.showModal() method -->


  <div class="modal-box">
    <section class="space-y-6 p-8 bg-white rounded-xl shadow-md container mx-auto mt-10">
       
        <div class="flex flex-col gap-4">
            <div>
                 <h1 class="text-2xl font-bold">${issue.title}  </h1>
            </div>
            <div class="flex gap-3.5">
                ${issue.status === 'open' ? `<span class="bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm">
                    ${issue.status}
                </span>` : `<span class="bg-purple-100 text-purple-500 px-3 py-1 rounded-full text-sm">
                    ${issue.status}
                </span>`}

                <p class="text-[#64748B]">${issue.author}</p>
                <p class="text-[#64748B]">${issue.updatedAt}</p>
            </div>
        </div>

        <div class="flex gap-3.5">
           ${issue.labels.map(label => label === "bug" ? `
                <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : label === "help wanted" ? `
                <span class="bg-yellow-100 border border-yellow-600 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            ` : `
                <span class="bg-green-100 border border-green-500 text-green-500 px-3 py-1 rounded-full text-sm">
                    ${label}
                </span>
            `
            ).join("")}
        </div>

        <div>
            <p class="text-[#64748B]">${issue.description}</p>
        </div>

        <div class="grid grid-cols-2 items-center bg-[#F8FAFC] p-6 rounded-lg">
            <div class="space-y-3">
                <p class="text-[#64748B]">Assignee:</p>
                <h3 class="font-semibold text-[#1F2937  ]">${issue.assignee ? issue.assignee : "Not Found"}</h3>
            </div>

            <div class="space-y-3">
                <p class="text-[#64748B]">Priority:</p>
                ${issue.priority === "high"
                    ? `<span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                    : issue.priority === "medium"
                        ? `<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`

                        : `<span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                    ${issue.priority}
                                </span>`
                }
            </div>
        </div>
    </section>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
            
    `;

            document.body.appendChild(modal);


            modal.showModal();


        });



        count++;

    })

    totalIssues.innerText = count;

};

issueCards();

