<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record && !loading">
      <div class="breadcrumb-wrap">
        <router-link tag="a" to="/history" class="breadcrumb">{{ 'Menu_History' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome') }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income',
          }">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>{{ 'RecordWithId' | localize }} {{$route.params.id}} {{ 'notFound' | localize }}</p>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  metaInfo() {
    return {
      title: this.$title('Detail')
    }
  },
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true,
    localizeFilter
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>

<style scoped>

</style>
