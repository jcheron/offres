window.addEventListener("load", () => {
    if (window.location.href.includes("candidat") && window.location.href.includes("getCandidat") == false) {
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
                        callActionButtonsEvent();
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
                        callActionButtonsEvent();
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
                        showHideActionButtons();
                    })
                } else {
                    document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                        oneCheckbox.checked = false;
                        showHideActionButtons();
                    })
                }
            });

            // (Un)/Check select all checkbox if all checkboxes are checked
            document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                oneCheckbox.addEventListener("change", () => {
                    if(document.querySelectorAll(".checkbox_candidat").length === document.querySelectorAll(".checkbox_candidat:checked").length) {
                        document.querySelector("#select_all").checked = true;
                        showHideActionButtons();
                    } else {
                        document.querySelector("#select_all").checked = false;
                        showHideActionButtons();
                    }
                });
            });
        }

        checkAll();

        // Show/hide actions buttons on click on checkbox(es)
        function showHideActionButtons() {
                    let numberOfCheckedCandidates = document.querySelectorAll(".checkbox_candidat:checked").length;
                    if (numberOfCheckedCandidates > 1) {
                        document.querySelector(".buttons_action").style.display = "flex";
                        document.querySelector(".btn_contact").innerHTML = "Contacter les " + numberOfCheckedCandidates + " candidats sélectionnés <i class=\"fa-solid fa-envelope ml-1\"></i>";
                        document.querySelector(".btn_cv").innerHTML = "Télécharger les CV des " + numberOfCheckedCandidates + " candidats sélectionnés <i class=\"fa-solid fa-download ml-1\"></i>";
                        document.querySelector(".btn_archiver").innerHTML = "Archiver les " + numberOfCheckedCandidates + " candidats sélectionnés  <i class=\"fa-solid fa-box-archive ml-1\"></i>";
                    } else if (numberOfCheckedCandidates == 1) {
                        document.querySelector(".buttons_action").style.display = "flex";
                        document.querySelector(".btn_contact").innerHTML = "Contacter <i class=\"fa-solid fa-envelope ml-1\"></i>";
                        document.querySelector(".btn_cv").innerHTML = "Télécharger le CV <i class=\"fa-solid fa-download ml-1\"></i>";
                        document.querySelector(".btn_archiver").innerHTML = "Archiver <i class=\"fa-solid fa-box-archive ml-1\"></i>";
                    } else {
                        document.querySelector(".buttons_action").style.display = "none";
                    }
        }

        function callActionButtonsEvent() {
            document.querySelectorAll(".checkbox_candidat").forEach((oneCheckbox) => {
                oneCheckbox.addEventListener("change", () => {
                    showHideActionButtons();
                });
            });
        }

        callActionButtonsEvent();
    }  else if(window.location.href.includes("getCandidat")) {
        // Partie 3 - Candidat + ou -
        function setPrevAndNextHrefs() {
            let previous_candidate_id = parseInt(document.querySelector(".current_candidate_id").innerHTML) - 1;
            let candidat_length = parseInt(document.querySelector(".candidats_list_length").innerHTML);
            let current_candidate_id = parseInt(document.querySelector(".current_candidate_id").innerHTML);

            if(previous_candidate_id > 0) {
                document.querySelector(".previous_candidate").href = "/candidat/getCandidat/" + previous_candidate_id;
                document.querySelector(".previous_candidate").style.display = "initial";
            } else {
                document.querySelector(".previous_candidate").style.display = "none";
            }

            if(current_candidate_id < candidat_length) {
                let next_candidate_id = parseInt(document.querySelector(".current_candidate_id").innerHTML) + 1;
                document.querySelector(".next_candidate").href = "/candidat/getCandidat/" + next_candidate_id;
            } else {
                document.querySelector(".next_candidate").style.display = "none";
            }
        }

        setPrevAndNextHrefs();
    }
});