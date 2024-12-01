export const useUser = () => {
    const state = reactive({
      token: null,
    });
  
    const actions = {
      async setUser() {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        state.token = cookieValue || null;
      },
    };
  
    return {
      state,
      ...actions,
    };
  };
  