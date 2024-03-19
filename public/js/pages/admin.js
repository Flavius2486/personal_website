/*------------------------------------*\
                Add icon 
/*------------------------------------*/

/*------Description variables------*/

const descriptionInput = document.querySelectorAll(".description-input");
const saveChangesBtn = document.querySelector(".save-changes-btn");

/*---------Add skill/icon variables------*/

const addSkillModalBtn = document.querySelector(".experience__icon--plus");
const closeSkillsModalBtn = document.querySelector(".btn-close-skills-modal");
const addIconBtn = document.querySelector(".add-icon-btn");
const discardIconBtn = document.querySelector(".discard-icon-btn");

const uploadIconInput = document.querySelector(".upload-icon-input");
const iconNameInput = document.querySelector(".icon-name-input");
const dragIconBox = document.querySelector(".drag-icon-box");

const uploadIconOuter = document.querySelector(".upload-icon-outer");
const addSkillModal = document.querySelector(".add-skill-modal");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const iconNameError = document.querySelector(".icon-name-error");
const iconImgInputError = document.querySelector(".icon-img-input-error");

/*---------Delete skill/icon ------------*/

const experienceIcons = [
  ...document.querySelectorAll(".experience__icon"),
].slice(0, -1);

/*-----------Add new project variables----------------*/
const addProjectOuter = document.querySelector(".upload-image-outer")

const openAddProjectModalBtn = document.querySelector(".add-new-project-btn");
const closeProjectsModalBtn = document.querySelector(
  ".btn-close-project-modal"
);
const discardNewProjectBtn = document.querySelector(".discard-project-btn");
const addNewProjectBtn = document.querySelector(".add-project-btn");

const newProjectImageInput = document.getElementById("image-input");
const newProjectTitleInput = document.querySelector(".project-title-input");
const newProjectTechnologiesInput = document.querySelector(
  ".project-technologies-input"
);
const newProjectContributionInput = document.querySelector(
  ".project-contribution-input"
);
const newProjectDetaliesInput = document.querySelector(
  ".project-detalies-input"
);
const newProjectAllSubtitlesInputs =
  document.querySelectorAll(".new-project-input");
const projectLinkInput = document.querySelector(".project-link-input");

const dragImageBox = document.querySelector(".drag-image-box");
const newProjectInputsErrorMessage = document.querySelectorAll(
  "#new-project-error-message"
);
const previewPhotoName = document.querySelector("#preview__file-name");
const addProjectModal = document.querySelector(".add-new-project-modal"); //the modal itself

/*-----------Delete new project variables-----------*/

const confirmationModal = document.querySelector(".confirmation-modal");
const cancelDeletionsBtn = document.querySelector(".cancel-deletion-btn");
const confirmDeletionBtn = document.querySelector(".confirm-deletion-btn");

const cards = [...document.querySelectorAll(".card")].slice(0, -1);

/*------------Edit contact variables-----------*/

const openContactModalBtn = document.querySelector(".edit-contact-btn");
const editContactModal = document.querySelector(".edit-contact-modal");
const closeEditContactModal = document.querySelector(
  ".btn-close-contact-modal"
);
const editContactInputs = document.querySelectorAll(".edit-contact-input");
const editContactErrors = document.querySelectorAll(
  "#edit-contact-error-message"
);
const saveEditContactBtn = document.querySelector(".save-edit-contact-btn");
const discardContactBtn = document.querySelector(".discard-contact-btn");

openContactModalBtn.addEventListener("click", () => {
  editContactModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.classList.add("modal-open");
});

closeEditContactModal.addEventListener("click", () => {
  editContactModal.classList.add("hidden");
  overlay.classList.add("hidden");
  body.classList.remove("modal-open");
  discardEditContact();
});

const discardEditContact = () => {
  editContactInputs.forEach((input, index) => {
    input.style.borderWidth = "0";
    editContactErrors[index].style.display = "none";
  });
};

/*----------Close modals(overlay click)----------*/

overlay.addEventListener("click", () => {
  addSkillModal.classList.add("hidden");
  addProjectModal.classList.add("hidden");
  editContactModal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector(".confirmation-modal").classList.add("hidden");
  body.classList.remove("modal-open");
  discardNewProject();
  discardNewSkill();
  discardEditContact();
});

/*----------Show save btn for description ------------*/

descriptionInput.forEach((element) => {
  element.addEventListener("input", (event) => {
    saveChangesBtn.classList.remove("hidden");
  });
});

/*------Add skill/icon logic adn events------*/

//remove icon and hide errors

const discardNewSkill = () => {
  iconImgInputError.style.display = "none";
  dragIconBox.style.borderColor = "#ccc";
  iconNameError.style.display = "none";
  iconNameInput.style.borderWidth = "0";
  iconNameInput.value = "";
  if (iconPreview) {
    //remove image from dom
    iconPreview.remove();
    uploadIconOuter.classList.remove("hidden");
  }
};

//add skil modal events

addSkillModalBtn.addEventListener("click", () => {
  addSkillModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.classList.add("modal-open");
});

closeSkillsModalBtn.addEventListener("click", () => {
  addSkillModal.classList.add("hidden");
  overlay.classList.add("hidden");
  body.classList.remove("modal-open");
  discardNewSkill();
});

//create image in DOM
let iconPreview;
let selecetedIcon = null;

uploadIconInput.addEventListener("change", (event) => {
  if (event.target.files[0].type.startsWith("image/")) {
    iconImgInputError.style.display = "none";
    dragIconBox.style.borderColor = "#ccc";
    let preview = document.getElementById("preview-icon");
    iconPreview = document.createElement("img");
    iconPreview.className = "uploaded-icon";
    selecetedIcon = event.target.files[0];
    iconPreview.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    preview.innerHTML = "";
    preview.appendChild(iconPreview);
    uploadIconOuter.classList.add("hidden");
  } else {
    iconImgInputError.innerText = "File type not supported";
    iconImgInputError.style.display = "block";
    dragIconBox.style.borderColor = "red";
  }
});

iconNameInput.addEventListener("focus", () => {
  iconNameError.style.display = "none";
  iconNameInput.style.borderWidth = "0";
});

//delete image from DOM and clear input
discardIconBtn.addEventListener("click", discardNewSkill);

//image input animation
uploadIconInput.addEventListener("dragover", () => {
  uploadIconInput.parentNode.classList.add("draging-img");
});

uploadIconInput.addEventListener("dragleave", () => {
  uploadIconInput.parentNode.classList.remove("draging-img");
});

uploadIconInput.addEventListener("drop", () => {
  uploadIconInput.parentNode.classList.remove("draging-img");
});

/*---------------Add new project----------------------*/


//functions to delete data of the new project and hide the errors
const discardNewProject = () => {
  newProjectInputsErrorMessage.forEach((input) => {
    input.style.display = "none";
  });
  dragImageBox.style.borderColor = "#ccc";
  document.querySelectorAll(".new-project-input").forEach((input) => {
    input.value = "";
    input.style.borderWidth = "0";
  });
  previewPhotoName.innerHTML = "No photos selected";
  newProjectImageInput.value = "";
  while (document.querySelector(".file-item")) {
    document.querySelector(".file-item").firstChild.remove();
  }
};

//Modal events

openAddProjectModalBtn.addEventListener("click", () => {
  addProjectModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.classList.add("modal-open");
});

closeProjectsModalBtn.addEventListener("click", () => {
  addProjectModal.classList.add("hidden");
  overlay.classList.add("hidden");
  body.classList.remove("modal-open");
  discardNewProject();
});

//insert images in DOM

//hide error when uploadin a file
newProjectImageInput.addEventListener("change", () => {
  dragImageBox.style.borderColor = "#ccc";
  newProjectInputsErrorMessage[0].style.display = "none";
});

let newProjectPhotos = [];

newProjectImageInput.addEventListener("change", (event) => {
  for (let i = 0; i < event.target.files.length; i++) {
    if (
      event.target.files[i].type.startsWith("image/") &&
      event.target.files[i] != " "
    )
      newProjectPhotos.push(event.target.files[i]);
  }

  if (newProjectPhotos.length !== event.target.files.length) {
    newProjectInputsErrorMessage[0].style.display = "block";
    newProjectInputsErrorMessage[0].innerHTML =
      "Some files were not added because the type was not supported";
  }

  let fileNames = "";

  for (let i = 0; i < newProjectPhotos.length; i++) {
    fileNames +=
      "<div class='file-item'><span class='file-name'>" +
      newProjectPhotos[i].name +
      "</span><span class='delete-file-btn' onclick='deleteNewProjectImage(event, " +
      i +
      ")'>&times;</span></div>";
  }

  if (newProjectPhotos.length === 0) {
    previewPhotoName.innerHTML = "No photos selected";
  } else {
    previewPhotoName.innerHTML = fileNames;
  }
});

// delete a file
const deleteNewProjectImage = (event, index) => {
  event.target.parentNode.remove();
  newProjectPhotos.splice(newProjectPhotos[index], 1);
  if (newProjectPhotos.length === 0) {
    previewPhotoName.innerHTML = "No photos selected";
  }
};

//delete all files and clear inputs
discardNewProjectBtn.addEventListener("click", discardNewProject);

//image input animation

newProjectImageInput.addEventListener("dragover", () => {
  newProjectImageInput.parentNode.classList.add("draging-img");
});

newProjectImageInput.addEventListener("dragleave", () => {
  newProjectImageInput.parentNode.classList.remove("draging-img");
});

newProjectImageInput.addEventListener("drop", () => {
  newProjectImageInput.parentNode.classList.remove("draging-img");
});

//hide error when clicking on input box
newProjectAllSubtitlesInputs.forEach((input, index) => {
  input.addEventListener("focus", () => {
    input.style.borderWidth = "0";
    newProjectInputsErrorMessage[index + 1].style.display = "none";
  });
});

/*-----------------------------*\
              Api
\*-----------------------------*/

saveChangesBtn.addEventListener("click", () => {
  fetch("/admin/update-detalies", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: descriptionInput[0].innerText,
      firstName: descriptionInput[1].innerText,
      description: descriptionInput[2].innerText,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      passwordInput.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  saveChangesBtn.classList.add("hidden");
});

addIconBtn.addEventListener("click", () => {
  iconNameError.style.display = "none";
  if (
    (selecetedIcon !== null && iconNameInput.value.length !== 0) ||
    iconNameInput.value.length > 10
  ) {
    const iconData = new FormData();
    iconData.append("icon", selecetedIcon);
    fetch("/admin/add-skill", {
      method: "POST",
      body: iconData,
      headers: {
        "text-data": JSON.stringify({
          technologyName: iconNameInput.value,
        }),
      },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        if (error) throw error;
      });
  } else {
    if (iconNameInput.value.length === 0) {
      iconNameError.innerText = "Field cannot be empty";
      iconNameError.style.display = "block";
      iconNameInput.style.borderWidth = "1px";
    }
    if (selecetedIcon === null) {
      iconImgInputError.innerText = "Select technology icon";
      dragIconBox.style.borderColor = "red";
      iconImgInputError.style.display = "block";
    }
  }
});


experienceIcons.forEach((experienceIcon) => {
  experienceIcon.addEventListener("click", () => {
    confirmationModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    confirmDeletionBtn.addEventListener("click", () => {
      fetch("/admin/delete-skill", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iconPath: experienceIcon.style.backgroundImage
            .replace('url("', "")
            .replace('")', ""),
        }),
      })
        .then((response) => {
          window.location.reload();
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    confirmationModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    confirmDeletionBtn.addEventListener("click", () => {
      fetch("/admin/delete-project", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: card.getAttribute("deletionId"),
        }),
      })
        .then((response) => {
          window.location.reload();
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});

cancelDeletionsBtn.addEventListener("click", () => {
  confirmationModal.classList.add("hidden");
  overlay.classList.add("hidden");
});

saveEditContactBtn.addEventListener("click", () => {
  let errors = false;
  editContactInputs.forEach((input, index) => {
    if (input.value.length === 0) {
      input.style.borderWidth = "1px";
      editContactErrors[index].style.display = "block";
      errors = true;
    }
  });
  if (!errors) {
    fetch("/admin/edit-contact", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instagram: editContactInputs[0].value,
        github: editContactInputs[2].value,
        mail: editContactInputs[3].value,
      }),
    })
      .then((response) => {
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});


addNewProjectBtn.addEventListener("click", () => {
  let hasError = false;
  if (newProjectPhotos.length === 0) {
    newProjectInputsErrorMessage[0].style.display = "block";
    newProjectInputsErrorMessage[0].innerHTML="Please select at least one photo"
    dragImageBox.style.borderColor = "red";
    hasError = true;
  }
  newProjectAllSubtitlesInputs.forEach((input, index) => {
    if (input.value.length === 0) {
      newProjectInputsErrorMessage[index + 1].style.display = "block";
      input.style.borderWidth = "1px";
      hasError = true;
    }
  });
  if (!hasError) {
    const projectImages = new FormData();
    newProjectPhotos.forEach((photo) => {
      projectImages.append("projectImg", photo);
    });
    fetch("/admin/add-project", {
      method: "POST",
      body: projectImages,
      headers: {
        "text-data": JSON.stringify({
          title: newProjectTitleInput.value,
          contribution: newProjectContributionInput.value,
          technologies: newProjectTechnologiesInput.value,
          detalies: newProjectDetaliesInput.value,
          projectLink: projectLinkInput.value,
        }),
      },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

