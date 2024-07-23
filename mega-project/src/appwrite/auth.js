import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    //yah create account ka method bna lete hain
    try {
      // taaki baad m dikka nahi ho,aur baaki poora appwrite wala chiz likhe denge
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      ); // ye saara appwrite ka hai.

      if (userAccount) {
        // agar account create ho gaya to direct login karba denge.
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } 
    catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service::logout::error", error);
    }
  }

  async getCurrentuser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("Appwrite service: getCurrentUser::error", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
