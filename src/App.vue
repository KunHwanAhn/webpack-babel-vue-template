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
        <VListItem link>
          <VListItemAction>
            <v-icon>mdi-home</v-icon>
          </VListItemAction>
          <VListItemContent>
            <VListItemTitle>Home</VListItemTitle>
          </VListItemContent>
        </VListItem>
        <VListItem link>
          <VListItemAction>
            <v-icon>mdi-contact-mail</v-icon>
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
