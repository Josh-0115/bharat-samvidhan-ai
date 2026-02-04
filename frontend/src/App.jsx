import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { sendChatMessage, getChatHistory } from './services/api';
import { ViewMode } from './utils/constants';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import MobileDrawer from './components/layout/MobileDrawer';

// View Components
import HomeView from './components/views/HomeView';
import ChatView from './components/views/ChatView';
import ExploreView from './components/views/ExploreView';
import ContactsView from './components/views/ContactsView';
import HistoryView from './components/views/HistoryView';
import ProfileView from './components/views/ProfileView';

// Modals
import LoginModal from './components/common/LoginModal';
import LanguageSelector from './components/common/LanguageSelector';

const App = () => {
  // Global Auth State
  const { user, logout } = useContext(AuthContext);

  // UI State
  const [view, setView] = useState(ViewMode.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  // Chat Data State
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');

  // Load Chat History when User logs in
  useEffect(() => {
    if (user) {
      getChatHistory()
        .then(data => setSessions(data))
        .catch(err => console.error("Failed to load history:", err));
    } else {
      setSessions([]);
      setMessages([]);
      setActiveSessionId(null);
    }
  }, [user]);

  // --- Handlers ---

  const handleSearch = async (e, customQuery) => {
    if (e) e.preventDefault();
    const activeQuery = customQuery || query;
    if (!activeQuery.trim() || isLoading) return;

    // UI Updates
    const userMessageContent = activeQuery.trim();
    if (!customQuery) setQuery('');
    if (view !== ViewMode.CHAT) setView(ViewMode.CHAT);

    // Optimistic UI Update
    const newUserMsg = { role: 'user', content: userMessageContent, timestamp: Date.now() };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // API Call to Backend
      const response = await sendChatMessage(userMessageContent, language, activeSessionId);
      
      const assistantMsg = { 
        role: 'assistant', 
        content: response.text,
        sources: response.sources,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      // Handle New Session Creation
      if (!activeSessionId && response.sessionId) {
        setActiveSessionId(response.sessionId);
        // Refresh session list to show new chat in sidebar
        if (user) {
           const updatedHistory = await getChatHistory();
           setSessions(updatedHistory);
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "### Connection Error\nI was unable to reach the server. Please check your internet connection or try logging in again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setActiveSessionId(null);
    setQuery('');
    setView(ViewMode.CHAT);
  };

  const loadSession = (session) => {
    setActiveSessionId(session._id); // MongoDB uses _id
    setMessages(session.messages);
    setLanguage(session.language || 'English');
    setView(ViewMode.CHAT);
    if (window.innerWidth < 768) setIsMenuOpen(false); // Close mobile drawer
  };

  const handleLogoutWrapper = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
      setView(ViewMode.HOME);
      startNewChat();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc] text-gray-900">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        user={user} 
        setView={setView} 
        view={view}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogoutWrapper}
        sessions={sessions}
        loadSession={loadSession}
        startNewChat={startNewChat}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 pb-32">
        <div className="max-w-5xl mx-auto">
          
          {view === ViewMode.HOME && (
            <HomeView 
              user={user} 
              language={language}
              query={query} 
              setQuery={setQuery} 
              handleSearch={handleSearch}
              setView={setView}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          )}

          {view === ViewMode.CHAT && (
            <ChatView 
               messages={messages}
               isLoading={isLoading}
               user={user}
               activeSessionId={activeSessionId}
               sessions={sessions}
               language={language}
               startNewChat={startNewChat}
               handleSearch={handleSearch}
               query={query}
               setQuery={setQuery}
               showLangDropdown={showLangDropdown}
               setShowLangDropdown={setShowLangDropdown}
               setLanguage={setLanguage}
            />
          )}

          {view === ViewMode.EXPLORE && (
            <ExploreView handleSearch={handleSearch} />
          )}

          {view === ViewMode.CONTACTS && (
            <ContactsView />
          )}

          {view === ViewMode.HISTORY && (
            <HistoryView 
              sessions={sessions} 
              loadSession={loadSession} 
              startNewChat={startNewChat} 
            />
          )}

          {view === ViewMode.PROFILE && (
            <ProfileView 
              user={user} 
              sessions={sessions} 
              setView={setView} 
              handleLogout={handleLogoutWrapper} 
            />
          )}

        </div>
      </main>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        view={view}
        setView={setView}
        startNewChat={startNewChat}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogoutWrapper}
      />

      {/* Mobile Header Toggle (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="font-bold serif text-lg">Bharat Samvidhan</div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
      
      {/* Overlays */}
      {showLangDropdown && (
        <LanguageSelector 
          language={language} 
          setLanguage={setLanguage} 
          setShowLangDropdown={setShowLangDropdown} 
        />
      )}
      
      {isLoginModalOpen && (
        <LoginModal 
          setIsLoginModalOpen={setIsLoginModalOpen} 
        />
      )}
    </div>
  );
};

export default App;