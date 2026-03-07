let allFilterBtn = document.getElementById("all-filter-btn");
let openFilterBtn = document.getElementById("open-filter-btn");
let closedFilterBtn = document.getElementById("closed-filter-btn");

let totalIssues = document.getElementById("total-issue");

let allCards = document.getElementById("all-cards");


const issueCards = async () => {
    loadingCards();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allCards.innerHTML = '';
    data.data.forEach(issue => {
        const card = document.createElement("div");
        // console.log(issue);
        card.innerHTML = `
        
        <div  class="cards bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}">

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

            <p class="text-[#64748B] text-sm line-clamp-2"">
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
        let cards = document.querySelectorAll(".cards");
        totalIssues.innerText = cards.length;


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

                <p class="text-[#64748B]">Opened by Fahim Ahmed</p>
                <p class="text-[#64748B]">22/02/2026</p>
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
                <h3 class="font-semibold text-[#1F2937  ]">${issue.assignee}</h3>
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

    })
};

issueCards();

function loadingCards(count = 6) {
    allCards.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const loading = document.createElement("div");
        loading.innerHTML = `<span class="loading loading-spinner loading-xl"></span>`;
        allCards.appendChild(loading);
    }
}

allFilterBtn.addEventListener("click", async () => {
    loadingCards();
    await issueCards();
});

