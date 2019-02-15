<template>
  <v-layout wrap>
    <v-flex xs3>
      <img alt="Vue logo" src="@/assets/logo.png" />
    </v-flex>
    <v-flex xs2>
      <v-select v-model="selected" :options="options"></v-select>
    </v-flex>
    <v-flex xs2></v-flex>
    <v-flex class="icon-container-row">
      <div class="icon-container">
        <i class="far fa-comment-alt" />
        <span>Ask Addy</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      selected: null,
      options: [
        { label: "foo", value: "Foo" },
        { label: "bar", value: "Bar" },
        { label: "car", value: "Car" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-container-row {
  display: flex;
  justify-content: flex-end;
}
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4baaa3;
  cursor: pointer;
}
.fa-comment-alt {
  font-size: 2.5em;
}
</style>
