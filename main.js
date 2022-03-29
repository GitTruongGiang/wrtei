const day = new Date();
document.querySelector("#testDay").innerText = day;

let page = 1;
let limit = 20;
let inputSearch = "";
let url = "";
//https://frcz3.sse.codesandbox.io/
const getAllJobs = async (queryString, page, limit) => {
  try {
    url = `https://frcz3.sse.codesandbox.io/jobs?_page=${page}&_limit=${limit}${
      queryString ? `&q=${queryString}` : ""
    }`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
getAllJobs().then((code) => console.log(code));

async function onSearch() {
  try {
    const inputSearch = document.querySelector("#search").value;
    let data = await getAllJobs(inputSearch, page, limit);
    renderJob(data);
  } catch (error) {
    console.log(error);
  }
}

async function renderJob(data) {
  try {
    const jobs = document.querySelector("#jobs");
    jobs.innerHTML = "";
    data.forEach((element) => {
      const titles = element.title;
      const h3Jobs = document.createElement("h3");
      h3Jobs.innerText = `${titles}`;
      jobs.appendChild(h3Jobs);
    });
  } catch (error) {
    console.log(error);
  }
}

const nextJobs = document.querySelector("#next");
nextJobs.addEventListener("click", onNext);

async function onNext() {
  if (url) {
    page += 1;
    let data = await getAllJobs(inputSearch, page, limit);
    renderJob(data);
  }
}

const prevJobs = document.querySelector("#prev");
prevJobs.addEventListener("click", onPrev);

async function onPrev() {
  if (page > 1) {
    page -= 1;
    let data = await getAllJobs(inputSearch, page, limit);
    renderJob(data);
  }
}
