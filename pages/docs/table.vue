<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Base Components
      </template>
      <template #title>
        Table
      </template>

      Documentation and examples of tables using Perfect UI.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
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
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_TABLE_BASIC = `<table class="table">
  <thead>
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
      <td><button class="btn-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td><button class="btn-link-error">Delete</button></td>
    </tr>
    <tr>
      <th>3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td><button class="btn-link-error">Delete</button></td>
    </tr>
  </tbody>
</table>
`;
</script>

<style scoped></style>
