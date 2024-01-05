<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle> License </template>
      <template #title>
        Learn more about the licensing terms for Perfect UI
      </template>

      Perfect UI is released under the MIT license and is copyright
      {{ new Date().getFullYear() }}
      Chrissgon. Boiled down to smaller chunks, it can be described with the
      following conditions.
    </MoleculeDocsHeader>

    <!-- mit license -->
    <MoleculeDocsContent>
      <template #title> MIT License </template>
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </p>

      <p>
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </p>

      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </MoleculeDocsContent>

    <!-- it requires -->
    <MoleculeDocsContent>
      <template #title> It requires you to: </template>

      <ul class="list">
        <li class="list-item">
          Keep the license and copyright notice included in Perfect UI's CSS and
          JavaScript files when you use them in your works.
        </li>
        <li class="list-item">
          If the source code is downloaded and used as a JS script, follow the
          terms of the MIT license.
        </li>
      </ul>
    </MoleculeDocsContent>

    <!-- it permits -->
    <MoleculeDocsContent>
      <template #title> It requires you to: </template>

      <ul class="list">
        <li class="list-item">
          Freely download and use Perfect UI, in whole or in part, for personal,
          private, company internal, or commercial purposes.
        </li>
        <li class="list-item">
          Use Perfect UI in packages or distributions that you create.
        </li>
        <li class="list-item">Modify the source code.</li>
        <li class="list-item">
          Grant a sublicense to modify and distribute Perfect UI to third
          parties not included in the license.
        </li>
      </ul>
    </MoleculeDocsContent>

    <!-- it forbids -->
    <MoleculeDocsContent>
      <template #title> It requires you to: </template>

      <ul class="list">
        <li class="list-item">
          Hold the authors and license owners liable for damages as Perfect UI
          is provided without warranty.
        </li>
        <li class="list-item">
          Hold the creators or copyright holders of Perfect UI liable.
        </li>
        <li class="list-item">
          Redistribute any piece of Perfect UI without proper attribution.
        </li>
        <li class="list-item">
          Use any marks owned by Chrissgon in any way that might state or imply
          that Chrissgon endorses your distribution.
        </li>
        <li class="list-item">
          Use any marks owned by Chrissgon in any way that might state or imply
          that you created the Chrissgon software in question
        </li>
      </ul>
    </MoleculeDocsContent>

    <!-- its not require -->
    <MoleculeDocsContent>
      <template #title> It does not require you to: </template>

      <ul class="list">
        <li class="list-item">
          Include the source of Perfect UI itself, or of any modifications you
          may have made to it, in any redistribution you may assemble that
          includes it.
        </li>
        <li class="list-item">
          Submit changes that you make to Perfect UI back to the Perfect UI
          project (though such feedback is encouraged).
        </li>
        <li class="list-item">
          Credit Perfect UI when using HTML components only.
        </li>
      </ul>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts"></script>

<style scoped>
.list-item{
  opacity: .7;
}
</style>
