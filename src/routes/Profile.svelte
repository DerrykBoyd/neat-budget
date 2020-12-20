<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { fade } from "svelte/transition";
  import Cropper from "cropperjs";
  import "cropperjs/dist/cropper.css";
  import Button from "../components/Base/Button.svelte";
  import Input from "../components/Base/Input.svelte";
  import InputPwd from "../components/Base/InputPwd.svelte";
  import Modal from "../components/Base/Modal.svelte";
  import { displayName, photoURL } from "../store/user";
  import { cropSrc, cropImg } from "../store/profile";
  import { modalLoaded, showModal } from "../store/modal";
  import { auth, db, functions, storage } from "../utils/firebase";
  import Loader from "../components/Base/Loader.svelte";
  import InfoMessage from "../components/Base/InfoMessage.svelte";

  // Component State
  let uploadingProfile = false;
  let nameChangePending = false;
  let nameChangeSuccess = null; // null -> true for testing
  let nameChangeError = null;
  let newPassword = "";
  let showNewPassword = false;
  let newPasswordConfirm = "";
  let showNewPasswordConfirm = false;
  let newPasswordError = "Passwords do not match";

  currentPath.set("/profile");
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  const toggleModal = () => {
    if ($showModal) {
      modalLoaded.set(false);
      cropSrc.set("");
    }
    $showModal ? showModal.set(false) : showModal.set(true);
  };

  const toggleShowNewPassword = () => {
    showNewPassword ? (showNewPassword = false) : (showNewPassword = true);
  };

  async function updateDisplayName() {
    nameChangePending = true;
    let userId = auth.currentUser.uid;
    let userRef = db.collection("users").doc(userId);
    userRef
      .update({
        displayName: $displayName,
      })
      .then(() => {
        console.log("Display Name Updated");
        nameChangeSuccess = true;
        setTimeout(() => {
          nameChangeSuccess = null;
        }, 1000);
      })
      .catch((e) => {
        console.error("Error updating displayName: " + e);
        nameChangeError = true;
        setTimeout(() => {
          nameChangeError = null;
        }, 1000);
      })
      .finally(() => {
        nameChangePending = false;
      });
  }

  async function uploadProfileImg() {
    let profileInput = document.getElementById("profile-upload");
    profileInput.addEventListener("change", async (e) => {
      // If we are here the user has selected a file
      if (!$showModal) showModal.set(true);
      if (profileInput?.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          // TODO - Limit file size accepted
          // once the file data is set, the cropper will load
          cropSrc.set(reader.result);
        };
        reader.readAsDataURL(profileInput.files[0]);
      }
    });
    // open the file picker
    profileInput.click();
  }

  // load the cropper when the img src is set
  $: if ($cropImg?.src) {
    let cropper = new Cropper($cropImg, {
      aspectRatio: 1 / 1,
      viewMode: 2,
      ready() {
        // save the image when the user clicks upload
        let uploadBtn = document.getElementById("upload-button");
        uploadBtn.addEventListener("click", (e) => {
          // TODO set loading state here
          uploadingProfile = true;
          let profileImgFunction = functions.httpsCallable("saveProfileImg");
          const { imageData, cropBoxData } = cropper;
          profileImgFunction({ imageData, cropBoxData, profileImg: $cropSrc })
            .then((res) => {
              let fileName = res.data?.name;
              if (fileName) {
                storage
                  .ref(fileName)
                  .getDownloadURL()
                  .then((url) => {
                    photoURL.set(url);
                    db.collection("users")
                      .doc(auth.currentUser.uid)
                      .update({
                        photoURL: url,
                      })
                      .then(() => console.log("Profile photo updated"))
                      .catch((e) => console.log(e));
                  });
              }
            })
            .catch((e) => console.error(e))
            .finally(() => {
              // TODO set not loading state here
              uploadingProfile = false;
              showModal.set(false);
              cropSrc.set(null);
            });
        });
      },
    });
  }
</script>

<style>
  .cam-icon {
    transform: translate(-1px, -1px);
  }
  .add-photo-btn {
    transform: translate(4px, 4px);
  }
  #image {
    display: block;
    max-width: 100%;
  }
</style>

<Modal>
  <div>
    {#if $cropSrc}<img id="image" bind:this={$cropImg} src={$cropSrc} alt="cropper" />{/if}
  </div>
  <div slot="actions" class="relative flex justify-end items-center">
    {#if uploadingProfile}
      <div class="absolute flex w-full h-full justify-center items-center bg-black opacity-40">
        <Loader size="1.5rem" />
      </div>
    {/if}
    <Button handleClick={toggleModal} color="grey">Cancel</Button>
    <Button id="upload-button" color="green">Upload</Button>
  </div>
</Modal>
<div class="flex flex-col items-center justify-center">
  <h1 class="text-2xl text-green-800">PROFILE</h1>
  <div class="profile-image flex flex-wrap justify-center m-4">
    <div class="mx-12 my-4 w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center shadow relative">
      {#if $photoURL}
        <img class="object-cover rounded-full" src={$photoURL} alt="profile" />
      {:else}
        <img class="w-16 h-16 rounded-full" src="images/placeholder-profile-img.svg" alt="placeholder-profile" />
      {/if}
      {#if !uploadingProfile}
        <div
          class="add-photo-btn cursor-pointer rounded-full w-9 h-9 bg-green-600 absolute right-0 bottom-0 shadow flex justify-center items-center"
          on:click={uploadProfileImg}>
          <span class="cam-icon material-icons md-light">add_a_photo</span>
        </div>
      {:else}
        <div class="add-photo-btn rounded-full w-9 h-9 bg-green-600 opacity-80 absolute right-0 bottom-0 shadow" />
      {/if}
    </div>
    <div class="profile-settings w-full sm:w-96">
      <Input autocomplete="name" name="displayName" label="Display Name" bind:value={$displayName} />
      <div class="flex items-center">
        <Button disabled={nameChangePending} handleClick={updateDisplayName}>Save</Button>
        {#if nameChangeSuccess}
          <InfoMessage icon="cloud_done">Saved</InfoMessage>
        {/if}
        {#if nameChangeError}
          <InfoMessage icon="error" color="red-600">Error updating dispaly name</InfoMessage>
        {/if}
      </div>
      <p class="py-2 mt-4">Change Password</p>
      <!-- {#if !showNewPassword} -->
      <InputPwd autocomplete="new-password" name="newPassword" label="New Password" bind:value={newPassword} />
      <InputPwd autocomplete="new-password" name="newPassword" label="New Password" bind:value={newPasswordConfirm} />
      {#if newPasswordError}
        <InfoMessage icon="error" color="red-800">{newPasswordError}</InfoMessage>
      {/if}
      <Button disabled handleClick={() => console.log('save password')}>Save</Button>
    </div>
  </div>
</div>
<input id="profile-upload" class="hidden" type="file" accept="image/jpg, image/png" />
