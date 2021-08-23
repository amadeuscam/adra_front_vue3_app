<template>
  <div class="col-md-6 col-lg-3 mb-3">
    <div
      class="card wow fadeIn"
      data-wow-duration="2s"
      style="box-shadow: 0px 0px 23px -2px rgba(186, 186, 186, 1)"
    >
      <div class="card-body">
        <div class="mx-auto d-block text-center">
          <img
            v-if="persona.sexo == 'hombre'"
            class="rounded-circle mx-auto d-block"
            src="../assets/chico.png"
            alt="Card image cap"
            width="70"
            height="70"
          />

          <img
            v-else
            class="rounded-circle mx-auto d-block"
            src="../assets/girl.png"
            alt="Card image cap"
            width="70"
            height="70"
          />

          <h5 class="text-sm-center mt-2 mb-1 text-truncate">
            {{ persona.nombre_apellido }}
          </h5>
          <div class="location text-sm-center">{{ persona.numero_adra }}</div>
          <div class="card-text text-sm-center">
            <i
              class="large material-icons"
              v-if="persona.are_acte"
              style="color: green; font-size: 34px"
              >verified_user</i
            >

            <i
              v-else
              class="large material-icons"
              style="color: red; font-size: 34px"
              >verified_user</i
            >

            <i
              class="large material-icons"
              v-if="persona.discapacidad"
              style="font-size: 34px"
              >accessible</i
            >
            <i
              class="large material-icons"
              v-if="persona.covids"
              title="covid "
              style="font-size: 34px; color: #370617"
              >grain</i
            >
            <div
              v-if="get_childs(persona) > 0"
              style="display: inline-block !important"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center +;
                "
              >
                <i
                  class="large material-icons"
                  title="covid "
                  style="font-size: 34px; color: #168ae2"
                  >child_friendly</i
                >
                <span style="margin-left: 2px">
                  x {{ get_childs(persona) }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <p
          class="card-text text-center p-2"
          style="
            box-shadow: inset 1px 0px 6px 0px #00000014;
            border-radius: 13px;
            margin: 10px;
          "
        >
          Total: {{ persona.hijo.length + 1 }}
          {{ persona.hijo.length + 1 == 1 ? "familiar" : "familiares" }}
        </p>
        <div class="card-text text-center">
          <a class="mr-2">
            <router-link
              :to="{ name: 'Detail', params: { id: persona.id } }"
            >
              <i
                class="large material-icons"
                style="font-size: 34px; color: darkslategrey"
                >remove_red_eye</i
              >
            </router-link>
          </a>
          <a :href="persona.update" class="mr-2">
            <i class="large material-icons" style="font-size: 34px">settings</i>
          </a>
          <!-- {% if user.is_staff %}
            <a :href="persona.delete">
              <i
                class="large material-icons"
                style="font-size: 34px; color: red"
                >delete</i
              >
            </a>

            {% endif %} -->
        </div>
      </div>
      <div class="card-footer">
        <strong class="card-title mb-3">
          <p
            class="text-center"
            v-if="persona.alimentos.length > 0"
            style="color: #484848"
          >
            Recogido:

            <span>{{ persona.alimentos[0].created_at }}</span>
            <br />
            <span>{{ format_date(persona.alimentos[0].created_at) }}</span>
          </p>
          <p v-else class="text-center text-danger">Sin entrega</p>
        </strong>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
export default {
  props: ["persona"],
  methods: {
    format_date(dater) {
      moment().locale("es");
      return moment(dater).fromNow();
    },
    get_childs(data) {
      return data.hijo.filter((el) => el.edads < 3).length;
    },
  },
};
</script>

<style>
</style>