<template>
  <div class="hello">
    <h1>LeadHit</h1>
    <form action="#">
      <input
        v-model="inp"
        @focus="onFocus"
        @input="onFocus"
        type="text"
        placeholder="Введите id сайта"
      />
      <button @click.prevent="check">Войти</button>
    </form>
    <transition name="fade">
      <p v-show="info">id сайта должен содержать 24 символа</p>
    </transition>
    <transition name="fade">
      <p class="authorizationError" v-show="authorizationError">
        Ошибка авторизации, введите правильное id
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Authorization",
  data: function () {
    return {
      inp: "",
      info: false,
      authorizationError: false,
    };
  },
  methods: {
    check() {
      if (this.inp.length !== 24) {
        this.info = true;
      } else {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://track-api.leadhit.io/client/test_auth");
        xhr.setRequestHeader(
          "Api-Key",
          "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo"
        );
        xhr.setRequestHeader("leadhit-Site-Id", this.inp);
        xhr.send();
        xhr.onload = function () {
          if (xhr.response == JSON.stringify({ message: "ok" })) {
            localStorage.setItem("leadhit-site-id", "5f8475902b0be670555f1bb3");
            this.$router.push("/analytics");
          }
          if (xhr.status == 401) {
            this.authorizationError = true;
          }
        }.bind(this);
        xhr.onerror = function () {
          alert(`Ошибка соединения`);
        };
      }
    },
    onFocus() {
      this.info = false;
      this.authorizationError = false;
    },
  },
};
</script>

<style>

:focus,
:active {
  outline: none;
}

input {
  width: 250px;
  padding: 0.5rem 1.5rem;
  border: 1px solid #91f7d8;
  border-radius: 3px;
  margin-right: 2rem;
  transition: 0.2s ease;
}

input:hover {
  border: 1px solid #6fbda5;
  background-color: #6fbda618;
}

input:focus,
input:active {
  border: 1px solid #305349;
  background-color: #6fbda644;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.authorizationError {
  color: red;
}
</style>
