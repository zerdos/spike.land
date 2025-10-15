import type { Conversation } from "../src/types";

interface ConversationListProps {
  conversations: Conversation[];
  currentConversation?: Conversation | null;
  onSelect: (conversation: Conversation) => void;
  onDelete: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  currentConversation,
  onSelect,
  onDelete,
}: ConversationListProps) {
  const currentConversationId = currentConversation?.id;
  return (
    <div className="conversation-list">
      <div className="conversation-items">
        {conversations.length === 0
          ? (
            <div className="empty-state">
              <p>No conversations yet</p>
              <p className="empty-state-hint">Click &quot;New Chat&quot; to start</p>
            </div>
          )
          : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${
                  conversation.id === currentConversationId ? "active" : ""
                }`}
                onClick={() => onSelect(conversation)}
              >
                <div className="conversation-title">
                  {conversation.title || "New Conversation"}
                </div>
                <div className="conversation-meta">
                  {new Date(conversation.updated_at).toLocaleDateString()}
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conversation.id);
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
