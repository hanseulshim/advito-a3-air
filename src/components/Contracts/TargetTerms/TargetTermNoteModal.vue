<template>
  <modal
    classes="modal-container"
    name="save-target-term-note"
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
    <div v-loading="$apollo.loading" class="note-message-container">
      <div
        v-for="(note, index) in noteList"
        :key="index"
        class="note-message-content"
        :class="{ 'edit-note': editMode && note.id === noteId }"
      >
        <div>{{ note.text }}</div>
        <div class="note-message-row sub-content">
          <span
            >By {{ note.assigneeName }} | {{ formatDate(note.lastUpdate) }} |
            Assigned to {{ note.assignedToName }}</span
          >
          <div
            v-if="
              (!editMode || note.id !== noteId) && user.id === note.assigneeId
            "
          >
            <el-tooltip effect="dark" content="Edit Note" placement="top">
              <i
                class="fas fa-pencil-alt icon-spacer"
                @click="enableEditMode(note.text, note.assignedToId, note.id)"
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
      v-model="text"
      v-loading="$apollo.loading"
      class="note-vertical-space"
      placeholder="Enter note here"
      type="textarea"
      :autosize="{ minRows: 6 }"
    />
    <div class="note-assign-container">
      <div class="note-assign-text">Assign note to:</div>
      <el-select v-model="assignedToId" filterable placeholder="Select User">
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
      <button class="button" @click="editNote">UPDATE NOTE</button>
    </div>
    <div v-else class="note-button-container">
      <button
        class="button"
        :class="{ disabled: noteList.length === 0 && !text }"
        :disabled="noteList.length === 0 && !text"
        @click="addNote"
      >
        SAVE
      </button>
    </div>
  </modal>
</template>

<script>
import {
  GET_USER,
  GET_USER_LIST,
  GET_TARGET_TERM,
  GET_NOTE_LIST,
  GET_CLIENT
} from '@/graphql/queries';
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '@/graphql/mutations';
import { formatDate } from '@/helper';
export default {
  name: 'TargetTermNoteModal',
  apollo: {
    client: {
      query: GET_CLIENT
    },
    userList: {
      query: GET_USER_LIST,
      variables() {
        return {
          clientId: this.client ? this.client.id : null
        };
      }
    },
    user: {
      query: GET_USER,
      update(data) {
        this.assigneeId = data.user.id;
        return data.user;
      }
    },
    noteList: {
      query: GET_NOTE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentTable: this.parentTable
        };
      }
    }
  },
  data() {
    return {
      client: null,
      parentId: null,
      parentTable: 'targetterm_v2',
      important: false,
      noteList: [],
      noteId: null,
      text: '',
      assignedToId: null,
      userList: [],
      user: {
        id: null
      },
      editMode: false
    };
  },
  computed: {
    assigneeList() {
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
      this.$modal.hide('save-target-term-note');
    },
    formatDate(date) {
      return formatDate(date);
    },
    beforeOpen(event) {
      const { parentId, important } = event.params;
      if (parentId !== this.parentId) {
        this.noteList = [];
      }
      this.parentId = parentId;
      this.important = important;
      this.assignedToId = this.user.id;
    },
    beforeClose() {
      this.text = '';
      this.editMode = false;
      this.noteId = null;
    },
    enableEditMode(text, assignedToId, noteId) {
      this.editMode = true;
      this.text = text;
      this.assignedToId = assignedToId;
      this.noteId = noteId;
    },
    disableEditMode() {
      this.editMode = false;
      this.text = '';
      this.assignedToId = this.user.id;
      this.noteId = null;
    },
    async addNote() {
      try {
        await this.$apollo.mutate({
          mutation: ADD_NOTE,
          variables: {
            parentId: this.parentId,
            parentTable: this.parentTable,
            important: this.important,
            text: this.text,
            assignedToId: this.assignedToId
          },
          update: (store, { data: { addNote } }) => {
            const query = {
              query: GET_NOTE_LIST,
              variables: {
                parentId: this.parentId,
                parentTable: this.parentTable
              }
            };
            const data = store.readQuery(query);
            if (addNote) data.noteList.unshift(addNote);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_TARGET_TERM,
              variables: { id: this.parentId }
            }
          ]
        });
        this.disableEditMode();
        this.$modal.show('success', {
          message: 'Note saved.'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    async editNote() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_NOTE,
          variables: {
            parentId: this.parentId,
            parentTable: this.parentTable,
            important: this.important,
            text: this.text,
            assignedToId: this.assignedToId,
            noteId: this.noteId
          },
          refetchQueries: () => [
            {
              query: GET_TARGET_TERM,
              variables: { id: this.parentId }
            }
          ]
        });
        this.disableEditMode();
        this.$modal.show('success', {
          message: 'Note saved.'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    async deleteNote(noteId) {
      try {
        if (this.noteList.length === 1) {
          this.important = false;
        }
        await this.$apollo.mutate({
          mutation: DELETE_NOTE,
          variables: {
            parentId: this.parentId,
            parentTable: this.parentTable,
            resetImportant: this.noteList.length === 1,
            important: this.important,
            noteId
          },
          update: (store, { data: { deleteNote } }) => {
            const query = {
              query: GET_NOTE_LIST,
              variables: {
                parentId: this.parentId,
                parentTable: this.parentTable
              }
            };
            const data = store.readQuery(query);
            data.noteList = data.noteList.filter(n => n.id !== deleteNote);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_TARGET_TERM,
              variables: { id: this.parentId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Note deleted.'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    }
  }
};
</script>
