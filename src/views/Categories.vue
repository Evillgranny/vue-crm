<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"  />

        <CategoryEdit
            v-if="categories.length"
            :key="categories.length + updateCount"
            :categories="categories"
            @updated="updateCategories"
        />

        <p v-else class="center">
          {{ 'NoСategoriesYet' | localize }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  components: {CategoryEdit, CategoryCreate},
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

<style scoped>

</style>
