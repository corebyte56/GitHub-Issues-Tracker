let allFilterBtn = document.getElementById("all-filter-btn");
let openFilterBtn = document.getElementById("open-filter-btn");
let closedFilterBtn = document.getElementById("closed-filter-btn");

let totalIssues = document.getElementById("total-issue");

let allCards = document.getElementById("all-cards");


const issueCards = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allCards.innerHTML = '';
    data.data.forEach(issue => {
        const card = document.createElement("div");
        // console.log(issue);
        card.innerHTML = `
        
        <div class="cards bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 border-t-4 border-green-500">

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

    })
};

issueCards();