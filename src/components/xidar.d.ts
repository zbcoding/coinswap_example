interface Window {
    xidar: {
        v1: {
            hasWallet: () => Promise<boolean>
            isConnected: () => Promise<boolean>
            connect: () => Promise<string>
            disconnect: () => Promise<{ code: number }>
            sign: (challenge: string) => Promise<string>
            submitTransaction: (payload: {}) => Promise<any>
            encrypt: (message: string, fromAddress: string, toAddress: string) => Promise<string>
            decrypt: (message: string, fromAddress: string) => Promise<string>
            accounts: () => Promise<string[]>
            balances: () => Promise<{}>
            stakes: () => Promise<{}>
            unstakes: () => Promise<{}>
        }
    }
}