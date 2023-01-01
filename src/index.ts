import { Client } from 'discord-rpc';

const clientId = "YOUR-CLIENTID-HERE"

const rpcClient = new Client({ transport: 'ipc' });

rpcClient.on('ready', () => {
    updateActivity()
    setInterval(() => updateActivity(), 10000)
})

rpcClient.on('disconnect', () => {
    console.log("RPC Client disconnected, trying to reconnect after 10 seconds!")
    setTimeout(() => {
        connect();
    }, 10000)
})

const updateActivity = () => {

    const buttons = [
        {
            url: "https://discord.com/",
            label: "Discord Web Page"
        }
    ]

    rpcClient.setActivity({
        buttons: buttons,
        startTimestamp: 1529644667834,
        details: `This is custom Discord RPC Client`,
        largeImageKey: "k",
        largeImageText: "Image",
        state: "What is this state?"
    })
    .catch((error: Error) => console.error(error))
}

const connect = () => {
    rpcClient.login({ clientId: clientId })
        .then(() => console.log("RPC Client connected successfully"))
        .catch((error: Error) => console.error(error));
}

connect();