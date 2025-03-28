import pb from '@/app/lib/pocketbase'
export const authCommands = {
  login: async (email: string, password: string) => {
    return await pb.collection('users').authWithPassword(email, password);
  },
  logout: () => {
    pb.authStore.clear();
  }, 
  register: async (email: string, password: string, passwordConfirm: string) => {
    const data = {
      email,
      password,
      passwordConfirm
    };
    return await pb.collection('users').create(data);
  },
  isAuthenticated: () => {
    return pb.authStore.isValid;
  },
  getUser: () => {
    return pb.authStore.record;
  },
  syncAuth: async() => {
    if (!pb.authStore.isValid) return false;
    try {
      await pb.collection('users').authRefresh();
      return true;
    } catch (err) {
      pb.authStore.clear();
      console.error(err)
      return false;
    }  
  }
};