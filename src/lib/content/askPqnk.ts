/**
 * Ask PQNK: the PQNK assistant (developer's n8n workflow, answers only from pedaver.com).
 * chatUrl = the n8n Chat Trigger's public Production URL (protocol: POST {action:"sendMessage", sessionId, chatInput} -> {output}).
 * Its CORS allows https://pedaver.com and Pages preview links. If this host changes, also update connect-src in public/_headers.
 */
export const askPqnk = {
  chatUrl: "https://vmi3734608.contaboserver.net/webhook/26d08229-6ffc-435a-b3d6-d79d54101817/chat",
  whatsappUrl: "https://wa.me/923437506442",
};
