<template>
  <modal
    classes="modal-container"
    name="save-discount-note"
    height="auto"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <div class="title-row space-between">
      <div class="section-header">note</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </el-tooltip>
    </div>
    <el-checkbox v-model="important" class="note-vertical-space"
      >Mark as important</el-checkbox
    >
    <div class="note-message-container">
      <div
        v-for="(note, index) in noteList"
        :key="index"
        class="note-message-content"
        :class="{ 'edit-note': editMode && note.id === noteId }"
      >
        <div>{{ note.message }}</div>
        <div class="note-message-row sub-content">
          <span
            >By {{ note.author.name }} | {{ formatDate(note.date) }} | Assigned
            to {{ note.assignee.name }}</span
          >
          <div
            v-if="
              (!editMode || note.id !== noteId) && user.id === note.author.id
            "
          >
            <el-tooltip effect="dark" content="Edit Note" placement="top">
              <i
                class="fas fa-pencil-alt icon-spacer"
                @click="enableEditMode(note.message, note.assignee.id, note.id)"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="Delete Note" placement="top">
              <i
                class="fas fa-trash-alt"
                @click="deleteDiscountNote(note.id)"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <el-input
      v-model="message"
      class="note-vertical-space"
      placeholder="Enter note here"
      type="textarea"
      :autosize="{ minRows: 6 }"
    />
    <div class="note-assign-container">
      <div class="note-assign-text">Assign note to:</div>
      <el-select v-model="assigneeId" placeholder="Select User">
        <el-option
          v-for="item in assigneeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div v-if="editMode" class="note-button-container">
      <button class="button" @click="disableEditMode">CANCEL</button>
      <button class="button" @click="saveDiscountNote">UPDATE NOTE</button>
    </div>
    <div v-else class="note-button-container">
      <button class="button" @click="saveDiscountNote">SAVE</button>
    </div>
  </modal>
</template>

<script>
import { GET_USER, GET_USER_LIST, GET_DISCOUNT_LIST } from '@/graphql/queries';
import { SAVE_DISCOUNT_NOTE, DELETE_DISCOUNT_NOTE } from '@/graphql/mutations';
import { formatDate } from '@/helper';
export default {
  name: 'DiscountNoteModal',
  apollo: {
    userList: {
      query: GET_USER_LIST
    },
    user: {
      query: GET_USER,
      update(data) {
        this.assigneeId = data.user.id;
        return data.user;
      }
    }
  },
  data() {
    return {
      pricingTermId: null,
      id: null,
      important: false,
      noteList: [],
      noteId: null,
      message: '',
      assigneeId: null,
      userList: [],
      user: {
        email: null
      },
      editMode: false
    };
  },
  computed: {
    assigneeList: function() {
      return this.userList
        .map(user => ({
          ...user,
          name: this.user.id === user.id ? 'Myself' : user.name
        }))
        .sort((a, b) => {
          if (a.name === 'Myself') return -1;
          return a.name.localeCompare(b.name);
        });
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('save-discount-note');
    },
    async saveDiscountNote() {
      try {
        await this.$apollo.mutate({
          mutation: SAVE_DISCOUNT_NOTE,
          variables: {
            id: this.id,
            important: this.important,
            message: this.message,
            assigneeId: this.assigneeId,
            noteId: this.noteId
          },
          update: (store, data) => {
            const note = data.data.saveDiscountNote;
            const newData = store.readQuery({
              query: GET_DISCOUNT_LIST,
              variables: {
                pricingTermId: this.pricingTermId
              }
            });
            const discount = newData.discountList.filter(
              d => d.id === this.id
            )[0];
            discount.note = note;
            store.writeQuery({
              query: GET_DISCOUNT_LIST,
              data: newData,
              variables: {
                pricingTermId: this.pricingTermId
              }
            });
          }
        });
        this.$modal.show('success', {
          message: 'Note saved.',
          name: 'save-discount-note'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    async deleteDiscountNote(noteId) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_DISCOUNT_NOTE,
          variables: {
            id: this.id,
            noteId
          },
          update: (store, data) => {
            const note = data.data.saveDiscountNote;
            const newData = store.readQuery({
              query: GET_DISCOUNT_LIST,
              variables: {
                pricingTermId: this.pricingTermId
              }
            });
            const discount = newData.discountList.filter(
              d => d.id === this.id
            )[0];
            discount.note = note;
            store.writeQuery({
              query: GET_DISCOUNT_LIST,
              data: newData,
              variables: {
                pricingTermId: this.pricingTermId
              }
            });
          }
        });
        this.$modal.show('success', {
          message: 'Note deleted.',
          name: 'save-discount-note'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    formatDate(date) {
      return formatDate(date);
    },
    beforeOpen(event) {
      const { note, id, pricingTermId } = event.params;
      this.id = id;
      this.pricingTermId = pricingTermId;
      this.important = note ? note.important : false;
      this.noteList = note ? note.noteList.sort((a, b) => b.date - a.date) : [];
      this.assigneeId = this.user.id;
    },
    beforeClose() {
      this.important = false;
      this.noteList = [];
      this.message = '';
      this.editMode = false;
      this.noteId = null;
    },
    enableEditMode(message, assigneeId, noteId) {
      this.editMode = true;
      this.message = message;
      this.assigneeId = assigneeId;
      this.noteId = noteId;
    },
    disableEditMode() {
      this.editMode = false;
      this.message = '';
      this.assigneeId = this.user.id;
      this.noteId = null;
    }
  }
};
</script>
