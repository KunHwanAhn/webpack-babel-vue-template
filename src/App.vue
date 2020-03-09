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
            <VIcon>mdi-contact-mail</VIcon>
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

    <VContent>
      <VContainer fluid>
        <RouterView />
      </VContainer>
    </VContent>
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
