import { prisma } from '../utils/prisma';

class SettingsService {
  async getSettings(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { settings: true },
    });

    return user?.settings || {};
  }

  async updateSettings(userId: string, settings: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { settings },
      select: { settings: true },
    });

    return user.settings;
  }

  async getNotifications(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { settings: true },
    });

    const settings = (user?.settings as any) || {};
    return settings.notifications || {
      newFollower: true,
      unfollower: true,
      weeklyReport: true,
      emailNotifications: true,
    };
  }

  async updateNotifications(userId: string, notifications: any) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { settings: true },
    });

    const currentSettings = (user?.settings as any) || {};
    const updatedSettings = {
      ...currentSettings,
      notifications,
    };

    await prisma.user.update({
      where: { id: userId },
      data: { settings: updatedSettings },
    });

    return notifications;
  }

  async deleteAccount(userId: string) {
    // Soft delete or hard delete based on requirements
    await prisma.user.delete({
      where: { id: userId },
    });
  }
}

export const settingsService = new SettingsService();
