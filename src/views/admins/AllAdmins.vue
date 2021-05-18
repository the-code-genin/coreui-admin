<template>
  <CCard class="shadow-sm">
    <CCardHeader class="d-flex align-items-center">
      <h1 class="h3 d-inline-block m-0">Admins</h1>
      <CButton :to="{name: 'Create Admin'}" color="primary" class="ml-auto">Add New</CButton>
    </CCardHeader>

    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"

        :items-per-page="perPage"
        :items-per-page-select="{external: true}"
        @pagination-change="updatePerPage"

        :table-filter="{placeholder: 'Keyword', external: true}"
        :tableFilterValue="tableFilterValue"
        @update:table-filter-value="updateTableFilter"

        :sorter="{external: true, resetable: true}"
        :sorterValue="sorterValue"
        @update:sorter-value="updateSorterValue"

        hover
        responsive
        :loading="loading"
      >
        <template #status="{item}">
          <td>
            <CBadge :color="item.status == 'active' ? 'success' : 'danger'" shape="pill">
              {{item.status}}
            </CBadge>
          </td>
        </template>

        <template #created_at="{item}">
          <td>
            {{item.created_at.format('MMM DD, YYYY h:mm a')}}
          </td>
        </template>

        <template #actions="{item}">
          <td class="d-flex justify-content-center">
            <CDropdown color="primary" :caret="false" v-if="item.id != authUser.id">
              <template #toggler-content>
                <CIcon name="cil-settings"/>
              </template>

              <CDropdownItem :to="{name: 'Edit Admin', params: {id: item.id}}">
                <CIcon name="cil-pencil" class="mr-2"/>
                Edit
              </CDropdownItem>

              <CDropdownItem @click="switchItemStatus(item)">
                <CIcon name="cil-ban" class="mr-2"/>
                {{item.status == 'active' ? 'Ban' : 'Unban'}}
              </CDropdownItem>

              <CDropdownItem @click="deleteItem(item.id)">
                <CIcon name="cil-trash" class="mr-2"/>
                Delete
              </CDropdownItem>
            </CDropdown>
          </td>
        </template>
      </CDataTable>

      <CRow>
        <CCol md="6">
          Showing {{fromItem}} to {{toItem}} of {{totalItems}} results
        </CCol>

        <CCol md="6">
          <CPagination
            :activePage="currentPage"
            :pages="totalPages"
            align="end"
            @update:activePage="updateCurrentPage"
          />
        </CCol>
      </CRow>
    </CCardBody>

    <ConfirmationModal 
      :show.sync="showDeleteModal"
      :centered="true"
      color="danger"
      :disabled="disableDeleteModal"
      @confirm="$emit('confirm-delete')"
    >
      Are you sure you want to delete this admin? This action will remove the admin and all of their data from the app.

      <CAlert v-if="deleteError != null" color="danger" class="mt-2">
        <strong>An error occured!</strong> {{ deleteError }}
      </CAlert>
    </ConfirmationModal>
  </CCard>
</template>

<script lang="ts">
import Vue from 'vue'
import admins from '@/services/api/admins'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import Admin from '@/models/admin'

export default Vue.extend<any, any, any, any>({
  name: 'AllAdmins',
  components: {
    ConfirmationModal
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'name',
          sorter: true,
        },
        {
          key: 'email',
          sorter: true,
        },
        {
          key: 'status',
          sorter: false,
        },
        {
          key: 'created_at',
          label: 'Date Added',
          sorter: true,
        },
        {
          key: 'actions',
          label: '',
          sorter: false,
        },
      ],

      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      fromItem: 1,
      toItem: 1,
      totalItems: 1,

      tableFilterValue: '',

      sorterValue: { 
        column: 'name',
        asc: true 
      },

      draw: null,
      loading: false,

      showDeleteModal: false,
      disableDeleteModal: false,
      deleteCallback: null,
      deleteError: null,
    }
  },
  computed: {
    parsedSorterValue() {
      let sorterValue = this.sorterValue as {column: string|null, asc: Boolean};
      if (sorterValue.column == null) return null;
      
      let sorter = sorterValue.column + ',';
      sorter += sorterValue.asc ? 'asc' : 'desc';

      return sorter;
    },
  },
  methods: {
    updatePerPage(perPage: number) {
      this.perPage = perPage;
      this.fetchItems();
    },
    updateCurrentPage(page: number, reduced: Boolean) {
      this.currentPage = page;
      this.fetchItems();
    },
    updateTableFilter(value: string) {
      this.tableFilterValue = value;
      this.fetchItems();
    },
    updateSorterValue(value: {column: string|null, asc: Boolean}) {
      this.sorterValue = value;
      this.fetchItems();
    },
    deleteItem(id: number) {
      if (this.deleteCallback != null) this.$off('confirm-delete', this.deleteCallback);

      this.deleteCallback = async () => {
        this.disableDeleteModal = true;
        this.deleteError = null;
        
        try {
          let response = await admins.delete(id);
          this.showDeleteModal = false;
          this.fetchItems();
        } catch(e) {
          this.deleteError = e;
        } finally {
          this.disableDeleteModal = false;
        }
      };
      this.$on('confirm-delete', this.deleteCallback);

      this.showDeleteModal = true;
      this.disableDeleteModal= false;
      this.deleteError = null;
    },
    async switchItemStatus(admin: Admin) {
      let draw = Math.random();
      this.draw = draw;
      this.loading = true;

      try {
        let response = await admins.update(admin.id, {
          name: admin.name,
          status: admin.status == 'active' ? 'banned' : 'active'
        });
      } catch(e) {
        //
      } finally {
        this.fetchItems();
      }
    },
    async fetchItems() {
      let draw = Math.random();
      this.draw = draw;
      this.loading = true;

      try {
        let response = await admins.getAll({
          page: this.currentPage,
          perPage: this.perPage,
          keyword: this.tableFilterValue,
          order: this.parsedSorterValue
        });

        if (draw != this.draw) return;

        this.items = response.data;
        this.perPage = Number(response.per_page);
        this.currentPage = Number(response.current_page);
        this.totalPages = Math.ceil((response.total as number) / (response.per_page as number));
        this.fromItem = Number(response.from);
        this.toItem = Number(response.to);
        this.totalItems = Number(response.total);
      } catch(e) {} finally {
        this.loading = false;
      }
    }
  },
  async created() {
    this.fetchItems();
  },
  metaInfo() {
    return {
      title: 'All Admins'
    }
  }
})
</script>