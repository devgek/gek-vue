const playerModule = {
  namespaced: true,
  state() {
    return {
      player: "Stefanos Tsitsipas"
    };
  },
  mutations: {
    SET_PLAYER(state, player) {
      state.plaxer = player;
    },
  },
  actions: {
  },
  getters: {
    getPlayer(state) {
      return state.player;
    },
  },
};

export {playerModule};