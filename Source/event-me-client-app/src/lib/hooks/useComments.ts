import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

export const useComments = (appEventId?: string) => {
    const isCreated = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(appEventId: string) {
            if (!appEventId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENT_URL}?appEventId=${appEventId}`, {
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().catch(error => 
                console.log('Error establishing connection: ', error))

            this.hubConnection.on('LoadComments', comments => {
                runInAction(() => {
                    this.comments = comments;
                })
            })

            this.hubConnection.on('ReceiveComment', comment => {
                runInAction(() => {
                    console.log('comment received')
                    console.log(comment);
                    this.comments.unshift(comment);
                })
            })
        },

        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error =>
                    console.log(`Error stopping connection: `, error)
                )
            }
        }
    }));

    useEffect(() => {
        if (appEventId && !isCreated.current) {
            commentStore.createHubConnection(appEventId)
            isCreated.current = true;
        }

        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    }, [appEventId, commentStore])

    return {
        commentStore,
    }
}