export interface IElectronAPI {
  setTitle: (str: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
