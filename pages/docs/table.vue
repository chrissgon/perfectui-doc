<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Table
      </template>

      Documentation and examples of tables using Perfect UI.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        Using the most basic table markup, here's how the tables look. All the
        examples are responsive - the tables allow them to be scrolled
        horizontally with ease.
      </p>

      <p>
        To create a table, simply add the <AtomToken>.table</AtomToken> class.
      </p>
      <p>
        To make your table responsive, simply add
        <AtomToken>.table-responsive</AtomToken> to its parent.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_BASIC" />
    </MoleculeDocsContent>

    <!-- bordered -->
    <MoleculeDocsContent id="bordered">
      <template #title>
        Bordered
      </template>

      <p>Add border on all sides of the table and cells.</p>

      <p>
        To create a bordered table, simply add the
        <AtomToken>.table-bordered</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_BORDERED" />
    </MoleculeDocsContent>

    <!-- striped -->
    <MoleculeDocsContent id="striped">
      <template #title>
        Striped
      </template>

      <p>Add zebra-striping to any table row.</p>

      <p>
        To create a striped table, simply add the
        <AtomToken>.table-striped</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_STRIPED" />
    </MoleculeDocsContent>

    <!-- hoverable -->
    <MoleculeDocsContent id="hoverable">
      <template #title>
        Hoverable
      </template>

      <p>
        To create a hoverable table, simply add the
        <AtomToken>.table-hoverable</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_HOVERABLE" />

      <p>These hoverable rows can also be combined with the striped variant:</p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_STRIPED_HOVERABLE" />
    </MoleculeDocsContent>

    <!-- borderless -->
    <MoleculeDocsContent id="borderless">
      <template #title>
        Borderless
      </template>

      <p>A table without borders.</p>

      <p>
        To create a borderless table, simply add the
        <AtomToken>.table-borderless</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_BORDERLESS" />
    </MoleculeDocsContent>

    <!-- headless -->
    <MoleculeDocsContent id="headless">
      <template #title>
        Headless
      </template>

      <p>
        A table can render without a table header if no
        <AtomToken>&lt;thead&gt;</AtomToken> is supplied.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_HEADLESS" />
    </MoleculeDocsContent>

    <!-- selection -->
    <MoleculeDocsContent id="selection">
      <template #title>
        Selection
      </template>

      <p>
        Rows can be selectable by making first column as a selectable column.
      </p>

      <p>Simply add a <AtomToken>checkbox</AtomToken> in the first column.</p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_SELECTION" />
    </MoleculeDocsContent>

    <!-- search -->
    <MoleculeDocsContent id="search">
      <template #title>
        Search input
      </template>

      <p>Search is used for making dropdown items searchable.</p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_SEARCH" />
    </MoleculeDocsContent>

    <!-- pagination -->
    <MoleculeDocsContent id="pagination">
      <template #title>
        Pagination
      </template>

      <p>
        Example with pagination using
        <NuxtLink
          class="style-link-primary"
          to="/docs/list"
        >
          Lists
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TABLE_PAGINATION" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const TABLE_CONTENT = `<thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>`;

const CODE_VIEW_TABLE_BASIC = `<table class="table">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_BORDERED = `<table class="table table-bordered">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_STRIPED = `<table class="table table-striped">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_HOVERABLE = `<table class="table table-hoverable">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_STRIPED_HOVERABLE = `<table class="table table-striped table-hoverable">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_BORDERLESS = `<table class="table table-borderless">
  ${TABLE_CONTENT}
</table>
`;
const CODE_VIEW_TABLE_HEADLESS = `<table class="table">
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
`;

const CODE_VIEW_TABLE_SELECTION = `<table class="table">
  <thead>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle"></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle"></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle"></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle"></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
`;
const CODE_VIEW_TABLE_SEARCH = `<table class="table table-bordered">
  <thead>
    <tr>
      <td colspan="5">
        <label class="input-group input !w-96">
          <i class="bi-search"></i>
          <input
            type="text"
            class="input"
            placeholder="Seach for items"
          />
        </label>
      </td>
    </tr>
    <tr class="bg-secondary">
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
`;
const CODE_VIEW_TABLE_PAGINATION = `<table class="table table-bordered">
  <thead>
    <tr>
      <td colspan="5">
        <label class="input-group input !w-96">
          <i class="bi-search"></i>
          <input type="text" class="input" placeholder="Seach for items" />
        </label>
      </td>
    </tr>
    <tr class="bg-secondary">
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
    <tr>
      <th><input type="checkbox" class="checkbox align-middle" /></th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="style-link-error">Delete</button></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="5">
        <ul class="list list-hoverable unmarker group-row">
          <a class="list-item">
            <i class="bi-chevron-left"></i>
          </a>
          <a class="list-item active">1</a>
          <a class="list-item">2</a>
          <a class="list-item">3</a>
          <a class="list-item">
            <i class="bi-chevron-right"></i>
          </a>
        </ul>
      </td>
    </tr>
  </tfoot>
</table>
`;
</script>

<style scoped></style>
