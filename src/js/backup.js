import { onLoad } from "./shared.js";

onLoad();

const secret = "Luke 8:17";

function generateJSONBlob(data) {
  return new Blob([JSON.stringify(data, null, 2)], { type: "octet/stream" });
}

function downloadFile() {
  chrome.storage.sync.get(
    ["classes", "studentsByClassId", "theme", "v"],
    (result) => {
      const blob = generateJSONBlob({
        classes: result.classes,
        secret,
        studentsByClassId: result.studentsByClassId,
        theme: result.theme,
        v: result.v,
      });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url,
        filename: "popsicle-sticks-data.json",
      });
    }
  );
}

document.forms["download-data"].onsubmit = downloadFile;

function saveUploadedData(event) {
  try {
    const result = JSON.parse(event.target.result);
    if (result.secret !== secret)
      throw new Error("That file did not originate from this extension");

    const dataToSet = {};
    if (result.hasOwnProperty("classes")) dataToSet.classes = result.classes;
    if (result.hasOwnProperty("studentsByClassId"))
      dataToSet.studentsByClassId = result.studentsByClassId;
    if (result.hasOwnProperty("theme")) dataToSet.theme = result.theme;
    if (result.hasOwnProperty("v")) dataToSet.v = result.v;

    chrome.storage.sync.set(dataToSet, function () {
      document.location = "home.html?back=true";
    });
  } catch (error) {
    handleUploadError(error);
  }
}

const uploadForm = document.forms["upload-data"];

function uploadFile(event) {
  event.preventDefault();
  const file = new FormData(event.target).get("file");

  if (file.size > 0) {
    const reader = new FileReader();
    reader.onload = saveUploadedData;
    reader.readAsBinaryString(file);
  }
}

function handleUploadError(error) {
  const message = error.message.includes("Unexpected token")
    ? "That data wasn't formatted correctly"
    : error.message;

  const el = document.createElement("p");
  el.classList.add("error-message");
  el.textContent = `Uh oh! ${message}.`;

  uploadForm.reset();
  uploadForm.classList.add("--error");
  uploadForm.appendChild(el);

  setTimeout(() => {
    uploadForm.classList.remove("--error");
    uploadForm.removeChild(el);
  }, 5000);
}

uploadForm.onsubmit = uploadFile;
