<template>
  <modal
    classes="modal-container"
    name="save-note"
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
              <i class="fas fa-trash-alt" @click="deleteNote(note.id)" />
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
      <button class="button" @click="saveNote">UPDATE NOTE</button>
    </div>
    <div v-else class="note-button-container">
      <button class="button" @click="saveNote">SAVE</button>
    </div>
  </modal>
</template>

<script>
import {
  GET_USER,
  GET_USER_LIST,
  GET_PRICING_TERM_LIST
} from '@/graphql/queries';
import { SAVE_NOTE, DELETE_NOTE } from '@/graphql/mutations';
import { formatDate } from '@/helper';
export default {
  name: 'NoteModal',
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
      this.$modal.hide('save-note');
    },
    async saveNote() {
      try {
        await this.$apollo.mutate({
          mutation: SAVE_NOTE,
          variables: {
            id: this.id,
            important: this.important,
            message: this.message,
            assigneeId: this.assigneeId,
            noteId: this.noteId
          },
          update: (store, data) => {
            const note = data.data.saveNote;
            const newData = store.readQuery({
              query: GET_PRICING_TERM_LIST
            });
            const index = newData.pricingTermList.findIndex(
              term => term.id === this.id
            );
            newData.pricingTermList[index].note = note;
            store.writeQuery({
              query: GET_PRICING_TERM_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Note saved.',
          name: 'save-note'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    async deleteNote(noteId) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_NOTE,
          variables: {
            id: this.id,
            noteId
          },
          update: (store, data) => {
            const note = data.data.deleteNote;
            const newData = store.readQuery({
              query: GET_PRICING_TERM_LIST
            });
            const index = newData.pricingTermList.findIndex(
              term => term.id === this.id
            );
            newData.pricingTermList[index].note = note;
            store.writeQuery({
              query: GET_PRICING_TERM_LIST,
              data: newData
            });
          }
        });
        this.$modal.show('success', {
          message: 'Note deleted.',
          name: 'save-note'
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
      const note = event.params.note;
      this.id = event.params.id;
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

<style lang="scss">
@import '@/styles/global.scss';
.note-vertical-space {
  margin-top: 1em;
}
.note-message-container {
  max-height: 300px;
  overflow: auto;
  margin-top: 1em;
  .edit-note {
    border: 1px solid $tree-poppy;
  }
  .note-message-content {
    background: $ebb;
    padding: 1em;
    margin: 0.5em 0;
    .note-message-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5em;
    }
  }
}
.note-assign-container {
  display: flex;
  align-items: center;
  margin-top: 1em;
  .note-assign-text {
    width: 150px;
  }
}
.note-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2em;
  .button {
    margin: 0 5px;
  }
}
</style>
