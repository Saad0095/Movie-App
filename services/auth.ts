import { Account, Client } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client().setProject(PROJECT_ID).setEndpoint(ENDPOINT);
const account = new Account(client);

export const authService = {
  async signup(email: string, password: string, name: string) {
    try {
      const response = await account.create("unique()", email, password, name);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(name: string) {
    try {
      const response = await account.updateName(name);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      const response = await account.updatePassword(newPassword, oldPassword);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
