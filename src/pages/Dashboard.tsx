import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  Layout,
  LogOut,
  BookOpen,
  Video,
  Building2,
  Phone,
  Flag,
  Users,
  GamepadIcon,
  Scale,
  Menu
} from 'lucide-react';
import RecoveryStories from './dashboard/RecoveryStories';
import VideoLinks from './dashboard/VideoLinks';
import RehabCenters from './dashboard/RehabCenters';
import Helplines from './dashboard/Helplines';
import Reports from './dashboard/Reports';
import SupportGroups from './dashboard/SupportGroups';
import Games from './dashboard/Games';
import LawInfo from './dashboard/LawInfo';

import AddGame from './dashboard/AddGame';
import AddVideo from './dashboard/AddVideo';
import AddStory from './dashboard/AddStory';
import AddRehabCenter from './dashboard/AddRehabCenter';
import AddHelpline from './dashboard/AddHelpline';
import AddSupportGroup from './dashboard/AddSupportGroup';
import AddLawInfo from './dashboard/AddLawInfo';



const navigation = [
  { name: 'Recovery Stories', href: '/recovery-stories', icon: BookOpen },
  { name: 'Video Links', href: '/video-links', icon: Video },
  { name: 'Rehab Centers', href: '/rehab-centers', icon: Building2 },
  { name: 'Helplines', href: '/helplines', icon: Phone },
  { name: 'Reports', href: '/reports', icon: Flag },
  { name: 'Support Groups', href: '/support-groups', icon: Users },
  { name: 'Games', href: '/games', icon: GamepadIcon },
  { name: 'To Know', href: '/law-info', icon: Scale },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-gray-500 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className={`fixed inset-0 z-40 flex ${sidebarOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Layout className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold text-white">Punerjani</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname.includes(item.href)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <button
              onClick={handleSignOut}
              className="group block w-full flex items-center text-gray-300 hover:text-white"
            >
              <LogOut className="mr-3 h-6 w-6" />
              <span className="text-sm font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Layout className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold text-white">Punarjani</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname.includes(item.href)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 bg-gray-700 p-4">
            <button
              onClick={handleSignOut}
              className="group block w-full flex items-center text-gray-300 hover:text-white"
            >
              <LogOut className="mr-3 h-6 w-6" />
              <span className="text-sm font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/" element={<RecoveryStories />} />
                <Route path="/recovery-stories" element={<RecoveryStories />} />
                <Route path="/video-links" element={<VideoLinks />} />
                <Route path="/rehab-centers" element={<RehabCenters />} />
                <Route path="/helplines" element={<Helplines />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/support-groups" element={<SupportGroups />} />
                <Route path="/games" element={<Games />} />
                <Route path="/law-info" element={<LawInfo />} />

                <Route path="/games/add" element={<AddGame />} />
                <Route path="/video-links/add" element={<AddVideo />} />
                <Route path="/recovery-stories/add" element={<AddStory />} />
                <Route path="/rehab-centers/add" element={<AddRehabCenter />} />
                <Route path="/helplines/add" element={<AddHelpline />} />
                <Route path="/support-groups/add" element={<AddSupportGroup />} />
                <Route path="/law-info/add" element={<AddLawInfo />} />


              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}