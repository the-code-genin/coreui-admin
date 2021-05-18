<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <CIcon name="cil-user"/>
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownItem :to="{name: 'Profile'}">
      <CIcon name="cil-user" /> My Profile
    </CDropdownItem>

    <CDropdownItem :to="{name: 'Logout'}">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>