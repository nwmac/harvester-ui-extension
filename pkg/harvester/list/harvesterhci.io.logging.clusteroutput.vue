<script>
import { allHash } from '@shell/utils/promise';
import ResourceTable from '@shell/components/ResourceTable';
import Banner from '@components/Banner/Banner.vue';
import MessageLink from '@shell/components/MessageLink';
import Loading from '@shell/components/Loading';
import { SCHEMA, LOGGING } from '@shell/config/types';
import { HCI } from '../types';

const schema = {
  id:         HCI.CLUSTER_OUTPUT,
  type:       SCHEMA,
  attributes: {
    kind:       HCI.CLUSTER_OUTPUT,
    namespaced: true
  },
  metadata: { name: HCI.CLUSTER_OUTPUT },
};

const LOGGING_ID = 'cattle-logging-system/rancher-logging';

export default {
  name:       'ListApps',
  components: {
    Loading, ResourceTable, Banner, MessageLink
  },

  async fetch() {
    const inStore = this.$store.getters['currentProduct'].inStore;
    const _hash = {};

    this.listSchema = this.$store.getters[`${ inStore }/schemaFor`](LOGGING.CLUSTER_OUTPUT);

    if (this.listSchema) {
      _hash.rows = this.$store.dispatch(`${ inStore }/findAll`, { type: LOGGING.CLUSTER_OUTPUT });
    }

    if (this.$store.getters[`${ inStore }/schemaFor`](HCI.ADD_ONS )) {
      _hash.loggingAddon = this.$store.dispatch(`${ inStore }/find`, { type: HCI.ADD_ONS, id: LOGGING_ID });
    }

    const hash = await allHash(_hash);

    this.rows = hash.rows;
    this.loggingAddon = hash.loggingAddon;

    this.$store.dispatch('type-map/configureType', { match: HCI.CLUSTER_OUTPUT, isCreatable: this.listSchema && this.listSchema?.collectionMethods.find((x) => x.toLowerCase() === 'post') });
  },

  data() {
    return {
      rows: [], listSchema: null, loggingAddon: null
    };
  },

  computed: {
    schema() {
      return schema;
    },

    to() {
      return `${ HCI.ADD_ONS }/cattle-logging-system/rancher-logging?mode=edit#basic`;
    },

    loggingEnabled() {
      return this.loggingAddon?.spec?.enabled;
    },
  },

  typeDisplay() {
    return this.$store.getters['type-map/labelFor'](schema, 99);
  }
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else-if="listSchema">
    <Banner
      v-if="loggingEnabled === false"
      color="info"
    >
      <MessageLink
        :to="to"
        prefix-label="harvester.logging.diabledTips.prefix"
        middle-label="harvester.logging.diabledTips.middle"
        suffix-label="harvester.logging.diabledTips.suffix"
      />
    </Banner>

    <ResourceTable
      :schema="schema"
      :rows="rows"
      :ignore-filter="true"
      :groupable="false"
    />
  </div>
  <Banner
    v-else
    color="warning"
  >
    {{ t('harvester.generic.noSchema', {schema: schema.id}) }}
  </Banner>
</template>
