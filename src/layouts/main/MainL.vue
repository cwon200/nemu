<template>
  <div>
    main
    <br />
    <div>
      <p>notice</p>
      <ul>
        <li v-for="(item, index) in list" :item="item" :key="index">
          <span>{{ item.no }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import API from '@/config/api';

export default {
  name: 'MainL',
  data: function() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.env.isMobile,
    }),
  },
  mounted: function() {
    const result = API.noticeList();
    console.log('result', result); // eslint-disable-line
    if (result.status === 200) this.list = result.list;
  },
};
</script>
