import React from 'react';
import Sidebar from './components/layout/Sidebar';
import ContentPlanner from './components/planner/ContentPlanner';
import { CalendarProvider } from './context/CalendarContext';
import { ModalProvider } from './context/ModalContext';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <ModalProvider>
      <PostProvider>
        <CalendarProvider>
          <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <ContentPlanner />
          </div>
        </CalendarProvider>
      </PostProvider>
    </ModalProvider>
  );
}

export default App;