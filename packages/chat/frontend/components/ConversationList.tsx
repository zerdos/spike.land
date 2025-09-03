import type { Conversation } from "../../src/types";

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
}: ConversationListProps) {
  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h3>Conversations</h3>
        <button onClick={onCreateConversation} className="new-chat-btn">
          New Chat
        </button>
      </div>
      
      <div className="conversation-items">
        {conversations.length === 0 ? (
          <div className="empty-state">
            <p>No conversations yet</p>
            <button onClick={onCreateConversation}>Start your first chat</button>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                conversation.id === currentConversationId ? "active" : ""
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="conversation-title">{conversation.title}</div>
              <div className="conversation-meta">
                {new Date(conversation.updated_at).toLocaleDateString()}
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}