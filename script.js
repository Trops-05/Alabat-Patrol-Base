const adminPassword = "Tropicales2025";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const isAdmin = params.get("admin") === "1";

if (id) {
    const row = document.getElementById(id);
    if (row) {
        row.classList.add("highlight");
        row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

if (isAdmin) {
    const entered = prompt("Enter admin password:");
    if (entered === adminPassword) {
        document.getElementById("admin-section").style.display = "block";

        window.addEventListener("DOMContentLoaded", () => {
            const qrcodeContainer = document.getElementById("qrcodes");
            const rows = document.querySelectorAll("#roster tbody tr");
            let qrCanvases = [];

            rows.forEach(row => {
                const troopId = row.id;
                const troopName = row.cells[0].textContent;
                const serial = row.cells[1].textContent;

                const url = window.location.origin + window.location.pathname.replace("index.html", "") + "?id=" + troopId;

                const block = document.createElement("div");
                block.classList.add("qr-block");

                const label = document.createElement("p");
                label.textContent = troopName + " (" + serial + ")";

                const canvas = document.createElement("canvas");

                new QRious({
                    element: canvas,
                    value: url,
                    size: 150
                });


                qrCanvases.push({ id: troopId, canvas: canvas});

                const downloadBtn = document.createElement("a");
                downloadBtn.textContent = "Download QR";
                downloadBtn.href = canvas.toDataURL("image/png");
                downloadBtn.download = troopId + ".png";
                downloadBtn.style.display = "block";

                block.appendChild(canvas);
                block.appendChild(label);
                block.appendChild(downloadBtn);
                qrcodeContainer.appendChild(block);
            });


            const downloadAllBtn = document.getElementById("button");
            downloadAllBtn.textContent = "Download All QR Codes (ZIP)";
            downloadAllBtn.style.display = "block";
            downloadAllBtn.style.margin = "20px auto";
            downloadAllBtn.style.padding = "10px 20px";

            downloadAllBtn.addEventListener("click", () => {
                const zip = new JSZip();
                const folder = zip.folder("qrcodes");

                qrCanvases.forEach(({ id, canvas }) => {
                    const imgData = canvas.toDataURL("image/png").split(",")[1];
                    folder.file(id + ".png", imgData, { base64: true });
                });

                zip.generateAsync({ type: "blob" }).then(content => {
                    saveAs(content, "all_qrcodes.zip");
                });
            });

            qrcodeContainer.appendChild(downloadAllBtn);
        });
    } else {
        alert("Access denied! Wrong password.");
    }
}
