import { lazy } from 'react';
import GymEquipmentPage from '../pages/GymEquipmentPage';
import NewMessagePage from '../pages/inbox/newMessagePage';
import ExistingChats from '../pages/inbox/existingChats';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Inbox = lazy(() => import('../pages/inbox'));
const Alcopilot = lazy(() => import('../pages/al-co-pilot'));
const Programming = lazy(() => import('../pages/Programming/programming'));
const Members = lazy(() => import('../pages/Members/members'));
const Team = lazy(() => import('../pages/Team/team'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const teamWorkoutPage = lazy(() => import('../pages/Team/teamworkoutpage'));
const MemberDetail = lazy(() => import('../pages/Members/memberdetail'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/al-co-pilot',
    title: 'Alcopilot',
    component: Alcopilot,
  },
  {
    path: '/members',
    title: 'Members',
    component: Members,
  },
  {
    path: '/member-detail',
    title: 'MemberDetail',
    component: MemberDetail,
  },
  {
    path: '/programming',
    title: 'Programming',
    component: Programming,
  },
  {
    path: '/team-workout-page',
    title: 'teamWorkoutPage',
    component: teamWorkoutPage,
  },

  {
    path: '/team',
    title: 'Team',
    component: Team,
  },
  {
    path: '/equipment',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/gym-equipment/:id',
    title: 'GymEquipmentPage',
    component: GymEquipmentPage,
  },
  {
    path: '/new-message',
    title: 'NewMessagePage',
    component: NewMessagePage,
  },
  {
    path: '/existing-chats',
    title: 'ExistingChats',
    component: ExistingChats,
  },
  {
    path: '/inbox',
    title: 'Inbox',
    component: Inbox,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
