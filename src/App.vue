<template lang="html">
  <div>
    <HeaderC></HeaderC>
    <main>
      <router-view></router-view>
      <!--//contents-->
    </main>
    <!--//container-->
    <FooterC></FooterC>
  </div>
  <!--//wrap-->
</template>

<script type="text/javascript">
import { mapActions, mapState } from 'vuex';
import HeaderC from '@/components/common/HeaderC';
import FooterC from '@/components/common/FooterC';
// import { setLocalStorageItem, getLocalStorageItem } from '@/util/util';

import { isMobile as isMobileCheck } from 'mobile-device-detect';

export default {
  name: 'app',
  components: {
    HeaderC,
    FooterC,
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.env.isMobile,
    }),
  },
  mounted: async function() {
    console.log('isMobileCheck', isMobileCheck); // eslint-disable-line
    this.setIsMobile({ isMobile: isMobileCheck });
  },
  methods: {
    ...mapActions(['setIsMobile']),
  },
};
</script>
