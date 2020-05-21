import { mapActions } from 'vuex';
import { i18n } from '@/config/i18n';

export const textCopy = {
  data: function() {
    return {
      textCopy: {
        value: '',
        message: i18n.t('dialogue_copy_desc'),
      },
    };
  },
  methods: {
    ...mapActions(['showPopup']),
    doCopy: function() {
      const txt = this.textCopy.message;
      const showPopup = this.showPopup;
      this.$copyText(this.textCopy.value).then(
        function() {
          const popupInfo = {
            buttonPopup: {
              description: txt,
              buttons: [
                {
                  title: i18n.t('dialogue_copy_btn'),
                  class: '',
                  type: 'cancel',
                  callback: null,
                },
              ],
            },
          };

          showPopup(popupInfo);
        },
        function() {
          const popupInfo = {
            buttonPopup: {
              description: 'Can not copied',
              buttons: [
                {
                  title: i18n.t('dialogue_copy_btn'),
                  class: '',
                  type: 'cancel',
                  callback: null,
                },
              ],
            },
          };

          showPopup(popupInfo);
        }
      );
    },
  },
};
