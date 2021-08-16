export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "";
}

export function onLoad() {
  console.log("Up and running 🏃‍♂️");

  setTheme();

  const popOutButton = document.getElementById("pop-out");

  if (popOutButton) {
    popOutButton.addEventListener("click", () => {
      const bodyRect = document.querySelector("body").getBoundingClientRect();

      chrome.windows.create({
        url: window.location.href,
        type: "popup",
        width: Math.round(bodyRect.width ? bodyRect.width : 360),
        height: Math.round(bodyRect.height ? bodyRect.height + 30 : 400),
      });
    });
  }
}

export function setTheme() {
  chrome.storage.sync.get("theme", (result) => {
    document.body.dataset.theme = result.theme;
  });
}

/**
 * If stringified number, returns number. Else returns string.
 * @param {*} stringOrNumber
 * @returns
 */
export function getBestValue(stringOrNumber) {
  const parsed = parseInt(stringOrNumber);

  return Number.isNaN(parsed) ? stringOrNumber : parsed;
}
