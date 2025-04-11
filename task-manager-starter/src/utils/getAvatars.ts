function importAll(r: __WebpackModuleApi.RequireContext) {
    return r.keys().map(fileName => ({
      name: `Avatar ${fileName.replace('./', '').replace('.png', '')}`,
      image: `/avatars/${fileName.replace('./', '')}`
    }));
  }
  
  export function getAvatars() {
    try {
      // This will get all PNG files from the public/avatars directory
      const avatars = importAll(require.context('../../public/avatars', false, /\.png$/));
      return avatars;
    } catch (error) {
      console.error('Error loading avatars:', error);
      return [];
    }
  }