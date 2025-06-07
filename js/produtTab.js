// Function to parse URL query parameters
function getQueryParams(url) {
  const params = {};
  const queryString = url.split("?")[1];
  if (queryString) {
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = value;
    });
  }
  return params;
}

// Mapping of seq_title to product seq numbers for Cycloidal Gear Drive
const categoryProducts = {
  5: ["26", "27", "28", "29", "53", "54"],
  6: [
    "238",
    "20",
    "11",
    "21",
    "47",
    "150",
    "12",
    "152",
    "19",
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "150",
  ],
  8: ["57", "58", "59", "60", "61", "62", "95", "161", "153", "154"],
  9: ["290", "291"],
  10: ["216", "217", "224", "225", "226"],
  11: ["22", "23", "24", "25"],
  20: ["76", "155", "93", "92", "157"],
  25: ["196", "201", "189", "193", "191", "194", "240", "195"],
  26: ["131", "132"],
  27: ["227", "232", "233", "234", "235", "236"],
  29: ["299", "300"],
  28: [
    "158",
    "159",
    "160",
    "162",
    "163",
    "164",
    "165",
    "166",
    "167",
    "168",
    "169",
    "170",
    "171",
    "172",
    "173",
    "174",
    "175",
    "176",
    "177",
    "253",
    "179",
    "180",
    "181",
    "182",
    "183",
    "184",
    "185",
    "186",
    "187",
    "188",
  ],
  9: ["290", "291"],
  30: ["207", "205", "206"],
  31: ["246", "247", "248", "249"],
  32: ["97"],
  33: ["214", "215"],
  38: ["250", "292"],
};

// Function to update product URLs with seq_title and control visibility
function updateProductDisplay(seqTitle) {
  const productElements = document.querySelectorAll(".pro_list");
  productElements.forEach((product) => {
    const links = product.querySelectorAll("a");
    const seq = getQueryParams(links[0].href).seq;

    // Update product URLs to include seq_title
    if (seqTitle !== "default" && categoryProducts[seqTitle]?.includes(seq)) {
      links.forEach((link) => {
        const params = getQueryParams(link.href);
        params.seq_title = seqTitle;
        const newQuery = Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
        link.href = `products.html?${newQuery}`;
      });
      product.style.display = "inline-block";
    } else if (seqTitle === "default") {
      // Remove seq_title from URLs for "ALL" tab
      links.forEach((link) => {
        const params = getQueryParams(link.href);
        delete params.seq_title;
        const newQuery = Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
        link.href = `products.html?${newQuery}`;
      });
      product.style.display = "inline-block";
    } else {
      product.style.display = "none";
    }
  });
}

// Handle tab clicks
document.querySelectorAll(".type_nav a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default navigation
    // Remove active class from all tabs
    document
      .querySelectorAll(".type_nav a")
      .forEach((a) => a.classList.remove("cate_on"));
    // Add active class to clicked tab
    this.classList.add("cate_on");
    // Update browser URL to match the clicked tab's href
    history.pushState({}, "", this.href);
    // Update product display based on seq_title
    const params = getQueryParams(this.href);
    const seqTitle = params.seq_title || "default";
    updateProductDisplay(seqTitle);
  });
});

// Update active tab and product display based on current URL on page load
window.addEventListener("load", () => {
  const currentParams = getQueryParams(window.location.href);
  const currentSeqTitle = currentParams.seq_title || "default";
  document.querySelectorAll(".type_nav a").forEach((link) => {
    const linkParams = getQueryParams(link.href);
    const linkSeqTitle = linkParams.seq_title || null;
    if (currentSeqTitle !== "default" && linkSeqTitle === currentSeqTitle) {
      link.classList.add("cate_on");
    } else if (
      currentSeqTitle === "default" &&
      !linkSeqTitle &&
      link.href.includes("products.asp") &&
      !link.href.includes("?")
    ) {
      link.classList.add("cate_on"); // For "ALL" tab
    } else {
      link.classList.remove("cate_on");
    }
  });
  // Update product display
  updateProductDisplay(currentSeqTitle);
});

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  const currentParams = getQueryParams(window.location.href);
  const currentSeqTitle = currentParams.seq_title || "default";
  document.querySelectorAll(".type_nav a").forEach((link) => {
    const linkParams = getQueryParams(link.href);
    const linkSeqTitle = linkParams.seq_title || null;
    if (currentSeqTitle !== "default" && linkSeqTitle === currentSeqTitle) {
      link.classList.add("cate_on");
    } else if (
      currentSeqTitle === "default" &&
      !linkSeqTitle &&
      link.href.includes("products.html") &&
      !link.href.includes("?")
    ) {
      link.classList.add("cate_on"); // For "ALL" tab
    } else {
      link.classList.remove("cate_on");
    }
  });
  // Update product display
  updateProductDisplay(currentSeqTitle);
});
