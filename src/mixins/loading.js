import { mapActions, mapState } from 'vuex';

export const loading = {
  data: function() {
    return {
      apiCall: {
        limit: 4,
        count: 0,
      },
    };
  },
  computed: {
    ...mapState({
      isMobileCheck: (state) => state.env.isMobile,
    }),
  },
  mounted: function() {
    if (this.isMobileCheck) {
      const hideLoading = this.hideLoading;
      setTimeout(function() {
        hideLoading();
      }, 100);
    }
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),

    checkLoading: function() {
      this.apiCall.count++;
      if (this.apiCall.count >= this.apiCall.limit) this.hideLoading();
    },
  },
};
