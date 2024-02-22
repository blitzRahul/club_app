import { io } from "socket.io-client";

const URL = 'https://api.thefusionclub.in';

export const connectToAdminSocket = (token) => {
    return io(`${URL}/admin`, { 
        reconnectionDelayMax: 10000, 
        autoConnect: false,
        auth: {
            token: token
        },
        transports: ['websocket'],
    });
}

export const connectToUserSocket = (token) => {
    return io(`${URL}/user`, { 
        reconnectionDelayMax: 10000, 
        autoConnect: false,
        auth: {
            token: token
        },
        transports: ['websocket'],
    });
}

export const generalSocket = io(URL, { 
    reconnectionDelayMax: 10000, 
    autoConnect: true,
    transports: ['websocket'],
});

