'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatList() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      // Get all chats for this user
      const { data: chatData } = await supabase
        .from('chats')
        .select('*')
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (chatData && chatData.length > 0) {
        // Get other user IDs
        const otherIds = chatData.map((c: any) => c.user_a_id === user.id ? c.user_b_id : c.user_a_id);
        const uniqueIds = Array.from(new Set(otherIds));

        // Get user profiles
        const { data: profiles } = await supabase
          .from('users')
          .select('id, name, blood_group, city')
          .in('id', uniqueIds);

        const profileMap = new Map(profiles?.map((p: any) => [p.id, p]) || []);

        // Get last message for each chat
        const chatsWithMeta = await Promise.all(chatData.map(async (chat: any) => {
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('text, sent_at, sender_id')
            .eq('chat_id', chat.id)
            .order('sent_at', { ascending: false })
            .limit(1)
            .single();

          const otherId = chat.user_a_id === user.id ? chat.user_b_id : chat.user_a_id;
          return {
            ...chat,
            otherUser: profileMap.get(otherId) || { name: 'Unknown', blood_group: '?', city: '' },
            lastMessage: lastMsg,
          };
        }));

        setChats(chatsWithMeta);
      }
      setLoading(false);
    };
    loadChats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">Messages</h1>
        <p className="text-neutral-500 mb-8">Your conversations with donors and requesters</p>

        {chats.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">No conversations yet</h3>
            <p className="text-neutral-500 mb-6">Start by searching for donors and sending a request.</p>
            <Link href="/search" className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all">
              Find Donors
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat, idx) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.user_a_id === userId ? chat.user_b_id : chat.user_a_id}`}
                className="block bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {chat.otherUser.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white truncate">{chat.otherUser.name}</h3>
                      {chat.lastMessage && (
                        <span className="text-xs text-neutral-400 flex-shrink-0 ml-2">
                          {new Date(chat.lastMessage.sent_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">{chat.otherUser.blood_group}</span>
                      <p className="text-sm text-neutral-500 truncate">
                        {chat.lastMessage ? chat.lastMessage.text : 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
