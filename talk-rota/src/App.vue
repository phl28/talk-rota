<script setup lang="ts">
import rota from './components/rota.vue'

import { ref, onMounted } from 'vue'
import { KButton } from "@cambridgekineticsltd/kinetic-ui";
import * as Msal from 'msal';

const msalConfig = {
  auth: {
    clientId: "3aa96f41-f75d-41e8-beca-57a0ec88ecc3",
    authority: "https://login.microsoftonline.com/397210ae-dd94-4871-8c7c-e17b325c128f"
  }
};

const loginRequest = {
  scopes: ["openid", "profile"]
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

onMounted(() => {
  if (myMSALObj.getAccount()) {
    isSignedIn.value = true;
  }
});

const onSignIn = () => {
  myMSALObj
    .loginPopup(loginRequest)
    .then(() => {
      isSignedIn.value = true;
    })
    .catch(function (error) {
      console.error(error);
    });
};



const isSignedIn = ref(false)

</script>

<template>
  <div class="box-container">
    <div>
      <div class="box" v-if="isSignedIn">
        <rota />
      </div>
      <div class="box text-center py-5" v-else>
        <img src="./assets/logo.svg" width="200" />
        <h1 class="my-4 h3">Sign in to continue</h1>
        <KButton variant="primary" size="lg" label="Sign in" @click="onSignIn" />
      </div>
    </div>
  </div>


</template>

<style scoped>
.box-container {
  display: grid;
  align-items: start;
  vertical-align: top;
  position: absolute;
  width: 100vw;
  min-height: 100%;
  background: transparent;
  background-image: url("@/assets/backdrop.svg");
  background-position: 50% 50%;
  background-size: cover;
}
.box {
  background: var(--k-background);
  padding: 1.5rem;
  border-radius: 20px;
  margin: calc(2rem + 10vh) auto 4rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 3px 80px -30px rgba(20, 137, 169, 0.7);
  border: 1px solid var(--k-border);
}
</style>
