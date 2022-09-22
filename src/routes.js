import { createRouter, createWebHistory } from "vue-router";

// Import Component
import HeaderComp from "./components/shared/HeaderComp.vue"
import LoginComp from "./components/user/LoginComp.vue";
import RegisterComp from "./components/user/RegisterComp.vue";
import EditComp from "./components/user/EditComp.vue";
import CreateComp from "./components/note/CreateComp.vue";
import ViewComp from "./components/note/ViewComp.vue";
import HomeNote from "./components/note/HomeNote.vue";
import ViewRawComp from "./components/note/ViewRawComp.vue";
import EditNoteComp from "./components/note/EditNoteComp.vue";
import ViewAllComp from "./components/note/ViewAllComp.vue";
import SearchComp from "./components/note/SearchComp.vue";

// Import Page
import UserView from "./pages/user_view.vue";
import HomeView from "./pages/home_view.vue";
import NoteView from "./pages/note_view.vue";

const routes = [
    {
        path: '/',
        name: 'home-container',
        components: {
            default: HomeView,
            'header-view': HeaderComp
        }, children: [
            { path: '', name: 'home-view', component: HomeNote },
            { path: 'create', name: 'create-view', component: CreateComp },
            { path: 'all', name: 'all-note-view', component: ViewAllComp },
            { path: 'me', name: 'edit-view', component: EditComp },
            { path: 'search', name: 'search-view', component: SearchComp }
        ]
    },
    {
        path: '/user',
        name: 'user-view',
        component: UserView,
        children: [
            {
                path: 'login', name: 'login-view', component: LoginComp
            },
            {
                path: 'register', name: 'register-view', component: RegisterComp
            }
        ]
    },
    {
        path: '/:id', name: 'note-view', components: {
            default: NoteView
        }, children: [
            {
                path: '', name: 'note-content-view', components: {
                    default: ViewComp,
                    'header-view': HeaderComp
                }
            },
            {
                path: 'raw', name: 'note-raw-view', component: ViewRawComp
            },
            {
                path: 'edit', name: 'note-edit-view', components: {
                    default: EditNoteComp,
                    'header-view': HeaderComp
                }
            }
        ]
    }
]

ViewComp;

const router = createRouter(
    {
        routes,
        history: createWebHistory()
    });

export default router;