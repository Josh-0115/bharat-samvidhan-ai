import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, ExternalLink, Copy, ArrowRight } from 'lucide-react';
import ChatInput from '../layout/ChatInput';

const ChatView = (props) => {
  const { messages, isLoading, activeSessionId, sessions, user } = props;
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col pt-15 h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Active Session Header */}
      <div className="bg-white border border-gray-200 rounded-3xl px-6 py-4 mb-8 shadow-sm flex items-center justify-between border-l-8 border-l-blue-600 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Consultation</div>
            <div className="text-sm font-semibold truncate max-w-55 md:max-w-xs">
              {activeSessionId 
                ? sessions.find(s => s._id === activeSessionId)?.title 
                : 'New Inquiry'}
            </div>
          </div>
        </div>

        {!user && (
          <div className="hidden lg:flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl text-amber-700">
            <span className="text-[10px] font-bold uppercase whitespace-nowrap">Guest Mode: History not saved</span>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-10 pb-32 scrollbar-hide px-2 md:px-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-start pt-16 md:pt-20 lg:pt-5">
            <div className="w-28 h-28 bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-md">
              <MessageSquare className="text-blue-600" size={56} />
            </div>
            <h3 className="text-4xl font-bold serif mb-5">Constitutional Desk</h3>
            <p className="text-gray-600 max-w-md text-lg font-medium leading-relaxed mb-12">
              Ask complex legal questions or explore fundamental rights with precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl px-3">
              {["What is Article 32?", "Explain Directive Principles", "Recent amendments", "Powers of the President"].map((hint, i) => (
                <button
                  key={i}
                  onClick={() => props.handleSearch(null, hint)}
                  className="p-5 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:border-blue-300 hover:shadow-md transition-all text-left flex items-center justify-between group"
                >
                  {hint}
                  <ArrowRight 
                    size={16} 
                    className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" 
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group/msg animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div 
                className={`max-w-[92%] md:max-w-[82%] rounded-3xl p-6 md:p-8 shadow-md relative ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                }`}
              >
                <div className={`prose max-w-none prose-slate ${msg.role === 'user' ? 'prose-invert font-medium text-[1.05rem]' : 'md:prose-lg'}`}>
                  {msg.role === 'user' ? (
                    <p className="leading-relaxed">{msg.content}</p>
                  ) : (
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold serif mb-6 mt-3" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold serif mb-5 mt-8 border-b border-gray-200 pb-2" {...props} />,
                        p: ({node, ...props}) => <p className="mb-5 leading-relaxed" {...props} />,
                        blockquote: ({node, ...props}) => (
                          <blockquote className="border-l-4 border-blue-500 pl-5 py-1 my-6 italic bg-blue-50 rounded-r-xl" {...props} />
                        ),
                        code: ({node, ...props}) => (
                          <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded font-medium text-sm" {...props} />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wide mb-4">Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((s, si) => (
                        <a
                          key={si}
                          href={s.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-medium text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                          {s.title.slice(0, 28)}… <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div 
                  className={`absolute -bottom-7 flex items-center gap-3 ${msg.role === 'user' ? 'right-5' : 'left-5'}`}
                >
                  <span className="text-[10px] font-medium text-gray-500">
                    {msg.role === 'user' ? (user?.username || "You") : 'AI Scholar'} •{' '}
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.content)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg opacity-0 group-hover/msg:opacity-100 transition-opacity"
                    >
                      <Copy size={14} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-3xl rounded-tl-none p-8 shadow-md flex flex-col gap-5 max-w-md w-full">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Processing…</span>
              </div>
              <div className="space-y-2.5">
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-blue-500/30 animate-shimmer"></div>
                </div>
                <div className="h-2.5 w-3/4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-blue-500/20 animate-shimmer [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <ChatInput {...props} />
    </div>
  );
};

export default ChatView;