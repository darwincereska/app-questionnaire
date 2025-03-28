import type { CapacitorConfig } from '@capacitor/cli';
// import { StatusBar } from '@capacitor/status-bar';

const config: CapacitorConfig = {
  appId: 'dev.darwincereska.chugbuddy',
  appName: 'ChugBuddy: The water app',
  webDir: 'out',
  plugins: {
    StatusBar: {
      style: 'dark', // or 'light'
      overlaysWebView: true, // allows content to go behind the status bar
    },
  }
};

export default config;
