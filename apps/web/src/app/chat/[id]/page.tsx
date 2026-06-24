'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const donorId = params.id;
  const [userId, setUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      if (!isMounted) return;
      setUserId(user.id);

      // Fetch other user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id, name, blood_group, city, locality')
        .eq('id', donorId)
        .maybeSingle();

      if (!isMounted) return;

      if (profileError) {
        console.error('Failed to fetch profile:', profileError);
        setError(`Could not load user profile: ${profileError.message}`);
      }
      setOtherUser(profile);

      // Find existing chat
      const { data: existingChats } = await supabase
        .from('chats')
        .select('*')
        .or(`and(user_a_id.eq.${user.id},user_b_id.eq.${donorId}),and(user_a_id.eq.${donorId},user_b_id.eq.${user.id})`);

      if (!isMounted) return;

      let currentChatId: string;

      if (existingChats && existingChats.length > 0) {
        currentChatId = existingChats[0].id;
      } else {
        // Create new chat
        const { data: newChat, error: chatError } = await supabase
          .from('chats')
          .insert([{ user_a_id: user.id, user_b_id: donorId }])
          .select()
          .single();
        if (chatError || !newChat) {
          console.error('Failed to create chat:', chatError);
          setError(`Could not create chat: ${chatError?.message || 'Unknown error'}`);
          setLoading(false);
          return;
        }
        currentChatId = newChat.id;
      }

      setChatId(currentChatId);

      // Load messages
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', currentChatId)
        .order('sent_at', { ascending: true });

      if (!isMounted) return;
      setMessages(msgs || []);
      setLoading(false);

      // Subscribe to realtime — set up the channel with listeners BEFORE calling subscribe()
      const channel = supabase
        .channel(`chat-${currentChatId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${currentChatId}`
        }, (payload: any) => {
          if (isMounted) {
            setMessages(prev => {
              // Prevent duplicates (the sender already adds the message optimistically)
              const exists = prev.some(m => m.id === payload.new.id);
              if (exists) return prev;
              return [...prev, payload.new];
            });
          }
        });

      // Subscribe after setting up listeners
      channel.subscribe();
      channelRef.current = channel;
    };

    init();

    return () => {
      isMounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [donorId, router, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !chatId || !userId) return;
    setSending(true);

    const msgText = newMsg.trim();
    setNewMsg('');

    // Optimistically add message to UI
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      chat_id: chatId,
      sender_id: userId,
      text: msgText,
      sent_at: new Date().toISOString(),
      read_at: null,
      _optimistic: true
    };
    setMessages(prev => [...prev, optimisticMsg]);

    const { data, error: sendError } = await supabase.from('messages').insert([{
      chat_id: chatId,
      sender_id: userId,
      text: msgText
    }]).select().single();

    if (sendError) {
      console.error('Failed to send message:', sendError);
      // Remove the optimistic message on failure
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
      setNewMsg(msgText); // Restore the message text
      setError(`Failed to send: ${sendError.message}`);
    } else if (data) {
      // Replace optimistic message with real one
      setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? data : m));
    }

    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Chat Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 px-4 py-4 flex items-center gap-4 shadow-sm">
        <Link href="/chat" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all">
          <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
          {otherUser?.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-neutral-900 dark:text-white truncate">{otherUser?.name || 'Loading...'}</h2>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            {otherUser?.blood_group && <span className="font-bold text-red-600">{otherUser.blood_group}</span>}
            {otherUser?.city && (
              <>
                <span>·</span>
                <span>{otherUser?.locality ? `${otherUser.locality}, ` : ''}{otherUser.city}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border-b border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 text-sm font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-2 font-bold hover:text-red-800">✕</button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-neutral-500 font-medium">No messages yet</p>
            <p className="text-neutral-400 text-sm mt-1">Say hello to start the conversation!</p>
          </div>
        )}
        {messages.map((msg, idx) => {
          const isMine = msg.sender_id === userId;
          return (
            <div key={msg.id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                isMine
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white rounded-br-md shadow-lg shadow-red-500/10'
                  : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-md shadow-sm border border-neutral-100 dark:border-neutral-700'
              } ${msg._optimistic ? 'opacity-70' : ''}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMine ? 'text-red-200' : 'text-neutral-400'}`}>
                  {new Date(msg.sent_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  {isMine && msg.read_at && ' · Read'}
                  {msg._optimistic && ' · Sending...'}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-5 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
          />
          <button
            type="submit"
            disabled={sending || !newMsg.trim()}
            className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all active:scale-95"
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
