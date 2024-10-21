'use client'
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function TonProvider ({children}) {
  return (
    <TonConnectUIProvider manifestUrl="https://gist.githubusercontent.com/alexcraviotto/b5d974bc120c3b46a0d047ba79cb4874/raw/2b04202d388d9547173b56c6ef27734edba18b29/tonconnect-manifest.json">
        {children}
    </TonConnectUIProvider>
  )
}
