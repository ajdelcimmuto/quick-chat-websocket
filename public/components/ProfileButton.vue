<template>
  <button id="profileButton" @click="showDropdown">
            <img class="brand-logo right" src="../assets/account_circle-24px.svg" alt="Avatar" style="border-radius: 50%; width: 35px;">
  </button>
</template>

<script>

export default {
  name: 'ProfileButton',
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    showDropdown() {
      // Do things...
      
      this.showDropdown = !showDropdown;
    }
  }
}
</script>
