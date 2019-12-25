<template>
  <button @click="showDialog = true">
    Add to cart
    <PopupModalDialog
      v-if="showDialog"
      label="Add to cart"
      @yes="addToCart"
      @no="showDialog = false"
      @close="showDialog = false"
    >
      Are you sure you want to add this product to your cart?
    </PopupModalDialog>
  </button>
</template>

<script>
import PopupModelDialog from './PopupModelDialog.vue';

export default {
  name: 'AddToCartButton',
  components: {
    PopupModelDialog,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    addToCart() {
      // Do things...
      this.showDialog = false;
    }
  }
}
</script>
