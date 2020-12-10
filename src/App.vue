<template>
  <VApp id="inspire">
    <VNavigationDrawer
      v-model="drawer"
      disable-resize-watcher
      app
    >
      <VList
        nav
        dense
      >
        <VListItem
          link
          to="/"
        >
          <VListItemAction>
            <VIcon>mdi-home</VIcon>
          </VListItemAction>
          <VListItemContent>
            <VListItemTitle>Home</VListItemTitle>
          </VListItemContent>
        </VListItem>
        <VListItem
          link
          to="/contact"
        >
          <VListItemAction>
            <VIcon>mdi-card-account-mail</VIcon>
          </VListItemAction>
          <VListItemContent>
            <VListItemTitle>Contact</VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VAppBar
      app
      color="indigo"
      dark
    >
      <VAppBarNavIcon @click.stop="drawer = !drawer" />
      <VToolbarTitle>Application</VToolbarTitle>
    </VAppBar>

    <VMain>
      <VContainer fluid>
        <RouterView />
      </VContainer>
    </VMain>
    <VFooter
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </VFooter>
  </VApp>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
