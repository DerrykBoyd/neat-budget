<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Cropper from "cropperjs";
  import "cropperjs/dist/cropper.css";
  import Button from "../components/Base/Button.svelte";
  import Input from "../components/Base/Input.svelte";
  import InputPwd from "../components/Base/InputPwd.svelte";
  import Modal from "../components/Base/Modal.svelte";
  import { displayName, photoURL } from "../store/user";
  import { cropSrc, cropImg, cropImgLoaded } from "../store/profile";
  import { modalLoaded, showModal } from "../store/modal";
  import { auth, db, functions } from "../utils/firebase";

  export let newPassword = "";
  export let confirmPassword = "";
  export let uploadingProfile = false;

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

  async function updateDisplayName(e) {
    console.log("send " + $displayName);
    let userId = auth.currentUser.uid;
    let userRef = db.collection("users").doc(userId);
    return userRef
      .update({
        displayName: $displayName,
      })
      .then(() => console.log("Display Name Updated")) // TODO - Add saved feedback
      .catch((e) => {
        console.error("Error updating displayName: " + e);
        // TODO add error feedback
      });
  }

  // $: if ($cropImg) {
  //   debugger;
  //   cropImg.onload = () => cropImgLoaded.set(true);
  // }

  $: if ($cropImg?.src) {
    const cropper = new Cropper($cropImg, {
      aspectRatio: 1 / 1,
      viewMode: 2,
      crop(e) {
        console.log(e);
      },
    });
  }

  async function uploadProfileImg() {
    // Firebase function - same image to storage here and update photoURL
    // let profileImgFunction = functions.httpsCallable("saveProfileImg");
    // profileImgFunction({ message: "hi there" })
    //   .then((res) => console.log(res.data))
    //   .catch((e) => console.error(e))
    //   .finally(() => (uploadingProfile = false));

    let profileInput = document.getElementById("profile-upload");
    profileInput.addEventListener("change", async (e) => {
      // If we are here the user has selected a file
      if (!$showModal) showModal.set(true);
      uploadingProfile = true;
      if (profileInput?.files[0]) {
        // file selected
        const reader = new FileReader();
        reader.onload = () => {
          cropSrc.set(reader.result);
        };
        reader.readAsDataURL(profileInput.files[0]);
      }
      uploadingProfile = false;
      // TODO get file from filereader
      // TODO write image to canvas on modal and crop
      // save cropped image to firebase
      // set url of profile in user db
    });
    profileInput.click();
    uploadingProfile = false;
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
  <div slot="actions">
    <Button handleClick={toggleModal} color="grey">Cancel</Button>
    <Button color="green">Upload</Button>
  </div>
</Modal>
<div class="flex flex-col items-center justify-center">
  <h1 class="text-2xl text-green-800">PROFILE</h1>
  <div class="profile-image flex flex-wrap justify-center m-4">
    <div class="mx-12 my-4 w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center shadow relative">
      {#if $photoURL}
        <img class="object-cover" src={$photoURL} alt="profile" />
      {:else}<img class="w-16 h-16" src="images/placeholder-profile-img.svg" alt="placeholder-profile" />{/if}
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
    <div class="profile-settings w-full sm:w-60">
      <Input autocomplete="name" name="displayName" label="Display Name" bind:value={$displayName} />
      <Button handleClick={updateDisplayName}>Save</Button>
      <p class="py-2 mt-4">Change Password</p>
      <InputPwd autocomplete="new-password" name="newPassword" label="New Password" bind:value={newPassword} />
      <InputPwd
        autocomplete="new-password"
        name="confirmPassword"
        label="Re-enter New Password"
        bind:value={confirmPassword} />
      <Button disabled handleClick={() => console.log('save password')}>Save</Button>
    </div>
  </div>
</div>
<input id="profile-upload" class="hidden" type="file" accept="image/jpg, image/png" />
