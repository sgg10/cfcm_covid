<template>
  <div>
    <b-card
      :title="title"
      :img-src="img"
      img-top
      style="max-width: 20rem;"
      class="mb-5"
      img-width="100"
      img-height="150"
    >
      <b-card-text>{{ msg }}</b-card-text>
      <b-button variant="success" @click="emite">Entrar</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      required: true,
      type: String
    },
    img: {
      required: true,
      type: String
    },
    msg: {
      required: true,
      type: String
    }
  },
  methods: {
    emite () {
      this.$emit('action', true)
    }
  }
}
</script>
