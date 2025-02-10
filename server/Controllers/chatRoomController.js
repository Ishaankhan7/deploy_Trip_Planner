const ChatRoomModel = require("../Models/ChatRoomModel");

exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const chatRoom = await ChatRoomModel.findById(chatRoomId).populate("messages.sender", "name email");
    if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

    res.status(200).json({ messages: chatRoom.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    const chatRoom = await ChatRoomModel.findById(chatRoomId);
    if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

    chatRoom.messages.push({ sender: senderId, message });
    await chatRoom.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
