import { mapActions, mapState } from 'vuex';

export const initialize = {
  computed: {
    ...mapState({
      dAppInfo: (state) => state.dapp.dAppInfo,
    }),
  },
  methods: {
    ...mapActions(['getdAppInfo', 'setSelectedApp']),

    initialize: async function(callback) {
      if (
        this.$router.history.current.params.dAppId &&
        this.$router.history.current.params.dAppId !== this.selectedApp.id
      ) {
        const param = {
          dAppId: this.$router.history.current.params.dAppId,
        };
        await this.getdAppInfo(param);
        await this.setSelectedApp(this.dAppInfo);
      }
      if (callback) callback();
    },
  },
};
