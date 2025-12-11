import { Notification } from "../model/notification_model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.status(200).json({
      message: "Notification marked as read",
      updated,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
