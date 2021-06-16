const gekEntityOptionsSelect = Vue.component("gek-entity-options-select", {
  props: {
    entityName: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      default: "",
    },
    labelKey: {
      type: String,
      default: null,
    }
  },
  template:
    /*html*/
    `
    <v-col class="d-flex flex-row">
    <v-subheader>
    {{ label() }}
    </v-subheader>
    <v-select
      v-model="selectedOptionValue"
      :items="items" 
      item-text="Value"
      item-value="ID"
      outlined 
      dense 
      @change="entityOptionSelected">
    </v-select>
  </v-col>
`,
  data() {
    return {
      selectedOptionValue: 0,
    };
  },
  created() {
    this.loadEntityOptions({entityName: this.entityName})
  },
  methods: {
    ...Vuex.mapActions(["loadEntityOptions"]),
    label() {
      if (this.labelKey === null) {
        return this.labelText;
      }
      else {
        return this.$t(this.labelKey);
      }
    },
    entityOptionSelected() {
      this.$emit("entity-options-select-" + this.entityName, this.selectedOptionValue)
    }
  },
  computed: {
    ...Vuex.mapGetters(["getOptionListByEntityName"]),
    items() {
      return this.getOptionListByEntityName(this.entityName);
    }
  },
});
