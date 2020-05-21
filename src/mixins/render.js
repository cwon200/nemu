import { mapActions, mapState } from 'vuex';

export const render = {
  data: function() {
    return {
      isComponentDisplay: true,
    };
  },
  mounted: function() {
    if (this.isMobileCheck && !this.$router.history.current.meta.isMobile) {
      this.isComponentDisplay = false;

      const popupInfo = {
        buttonPopup: {
          description: this.$t('mo_dialogue_mcant_desc'),
          buttons: [
            {
              title: this.$t('mo_dialogue_mcant_btn_ok'),
              class: 'green_type',
              type: 'confirm',
              callback: () => {
                this.$router.push({
                  name: 'main',
                });
              },
            },
          ],
        },
      };

      this.showPopup(popupInfo);
    }
  },
  computed: {
    ...mapState({
      isMobileCheck: (state) => state.env.isMobile,
    }),
  },
  methods: {
    ...mapActions(['showPopup']),
  },
};
