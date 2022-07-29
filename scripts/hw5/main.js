import { fetchAPI } from "./fetchAPI.js";

const getBtn = document.querySelector("output");

function output(message) {
  const output = document.querySelector("output");
  output.innerHTML = `<pre> ${JSON.stringify(message, null, 4)}</pre>`;
}

function retrieveData(target) {
  return `id=${target[1].value.trim()}&article-title=${target[2].value.trim()}&article-body=${target[3].value.trim()}&date=${target[4].value}`;
}

async function post(event) {
  const target = event.currentTarget;
  const data = retrieveData(target);
  const res = await fetchAPI.fetch("post", data);
  output(res);
}

async function get() {
  const res = await fetchAPI.fetch("get");
  output(res);
}

async function put(event) {
  const target = event.currentTarget;
  const data = retrieveData(target);
  const result = await fetchAPI.fetch("put", data);
  output(result);
}

async function myDelete(event) {
  const result = await fetchAPI.fetch("delete");
  output(result);
}
function formSubmit() {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const target = event.submitter;

    if (target.matches("#post")) post(event);
    else if (target.matches("#get")) get();
    else if (target.matches("#put")) put(event);
    else myDelete(event);
    event.target.reset();
    setDate();
  });
}

function setDate() {
  document.querySelector("#date").value = new Date().toDateString();
}

function init() {
  formSubmit();
  setDate();
}

window.addEventListener("DOMContentLoaded", init);
