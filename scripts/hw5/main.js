import { fetchAPI } from "./fetchAPI.js";
import { myXML } from "./XML.js";

let SERVER = undefined;
/**
 * Sets server connection method by using fetchAPI or XML
 * @param {Boolean} option true - fetchAPI, false - XML
 */
function setServerConnectionMethod(option = true) {
  let message = "";
  if (option) {
    SERVER = fetchAPI;
    message = "Response by using FetchAPI";
  } else {
    SERVER = myXML;
    message = "Response by using XML";
  }
  document.querySelector("#response-legend").innerText = message;
}

/**
 * Populates output tag using response message
 * @param {JSON} message response message
 */
function output(message) {
  const output = document.querySelector("output");
  output.innerHTML = `<pre> ${JSON.stringify(message, null, 4)}</pre>`;
}

/**
 * Retrieves/sets up the request body
 * @param {List of HTMLElement} target
 * @returns message body of a request
 */
function retrieveData(target) {
  return `id=${target[1].value.trim()}&article-title=${target[2].value.trim()}&article-body=${target[3].value.trim()}&date=${
    target[4].value
  }`;
}

// POST
async function post(event) {
  const target = event.currentTarget;
  const data = retrieveData(target);
  await SERVER.request("post", data, output);
}

// GET
async function get() {
  await SERVER.request("get", null, output);
}

// PUT
async function put(event) {
  const target = event.currentTarget;
  const data = retrieveData(target);
  await SERVER.request("put", data, output);
}

// DELETE
async function myDelete(event) {
  await SERVER.request("delete", null, output);
}

/**
 * Keeps user option
 * @param {string} value
 */
function setOption(value) {
  document.querySelector(`input[value="${value}"]`).checked = true;
}

/**
 * Set current date
 */
function setDate() {
  document.querySelector("#date").value = new Date().toDateString();
}

/**
 * Form submission Handler
 */
function formSubmit() {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const target = event.submitter;
    const requestType = document.querySelector(
      '[name="requestType"]:checked'
    ).value;

    setServerConnectionMethod(requestType === "FetchAPI");

    if (target.matches("#post")) post(event);
    else if (target.matches("#get")) get();
    else if (target.matches("#put")) put(event);
    else myDelete(event);

    event.target.reset();
    setOption(requestType);
    setDate();
  });
}

function init() {
  formSubmit();
  setDate();
}

window.addEventListener("DOMContentLoaded", init);
