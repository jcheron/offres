window.addEventListener("load", () => {
    if (window.location.href.includes("candidat")) {
        // Partie 1 - Switch du listage standard des candidats au listage par formation
        document.querySelector("#toggl_formation").addEventListener("change", () => {
            let headers = new Headers();
            headers.append("x-partial_request", "true")
            if (document.querySelector("#toggl_formation").checked) {
                fetch("/candidat/getByFormation", {
                    method: "GET",
                    headers: headers
                }).then(request => {
                    request.text().then(requestBody => {
                        setTableContent(request, requestBody);
                        checkAll();
                        showHideActionButtons();
                    })
                });
            } else {
                fetch("/candidat/index", {
                    method: "GET",
                    headers: headers
                }).then(request => {
                    request.text().then(requestBody => {
                        setTableContent(request, requestBody);
                        checkAll();
                        showHideActionButtons();
                    })
                });
            }
        });

        function setTableContent(request, requestBody) {
            if (request.ok === true) {
                document.querySelector("table").innerHTML = requestBody;
            }
        }

        // Partie 2 - (Un/)Check all checkboxes on click on select all checkbox
        function checkAll() {
            // Check all checkboxes if select all checkbox is checked
            document.querySelector("#select_all").addEventListener("change", () => {
                if (document.querySelector("#select_all").checked) {
                    document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                        oneCheckbox.checked = true;
                    })
                } else {
                    document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                        oneCheckbox.checked = false;
                    })
                }
            });

            // (Un)/Check select all checkbox if all checkboxes are checked
            document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                oneCheckbox.addEventListener("change", () => {
                    if(document.querySelectorAll(".checkbox_candidat").length === document.querySelectorAll(".checkbox_candidat:checked").length) {
                        document.querySelector("#select_all").checked = true;
                    } else {
                        document.querySelector("#select_all").checked = false;
                    }
                });
            });
        }

        checkAll();

        // Show/hide actions buttons on click on checkbox(es)
        function showHideActionButtons() {
            document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                oneCheckbox.addEventListener("change", () => {
                    let numberOfCheckedCandidates = document.querySelectorAll(".checkbox_candidat:checked").length;
                    if (oneCheckbox.checked && numberOfCheckedCandidates > 1) {
                        document.querySelector(".buttons_action").style.display = "flex";
                        document.querySelector(".btn_contact").innerHTML = "Contacter les " + numberOfCheckedCandidates + " candidats sélectionnés <i class=\"fa-solid fa-envelope ml-1\"></i>";
                        document.querySelector(".btn_cv").innerHTML = "Télécharger les CV des " + numberOfCheckedCandidates + " candidats sélectionnés <i class=\"fa-solid fa-download ml-1\"></i>";
                        document.querySelector(".btn_archiver").innerHTML = "Archiver les " + numberOfCheckedCandidates + " candidats sélectionnés  <i class=\"fa-solid fa-box-archive ml-1\"></i>";
                    } else if (oneCheckbox.checked) {
                        document.querySelector(".buttons_action").style.display = "flex";
                        document.querySelector(".btn_contact").innerHTML = "Contacter <i class=\"fa-solid fa-envelope ml-1\"></i>";
                        document.querySelector(".btn_cv").innerHTML = "Télécharger le CV <i class=\"fa-solid fa-download ml-1\"></i>";
                        document.querySelector(".btn_archiver").innerHTML = "Archiver <i class=\"fa-solid fa-box-archive ml-1\"></i>";
                    } else {
                        document.querySelector(".buttons_action").style.display = "none";
                    }
                });
            });
        }

        showHideActionButtons();
    }
});