import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";

export const useAppEvents = (id?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const { data: appEvents, isPending } = useQuery({
        queryKey: ['appEvents'],
        queryFn: async () => {
            const response = await agent.get<PaginatedResults<AppEvent>>('/event?pagesize=25');

            return response.data.items;
        },
        enabled: !id && location.pathname === '/events'
    });

    const { data: appEvent, isLoading: isLoadingAppEvent } = useQuery({
        queryKey: ['appEvents', id],
        queryFn: async () => {
            const response = await agent.get<AppEvent>(`/event/${id}`);

            return response.data;
        },
        enabled: !!id//enabled if we have an id, !! converts to boolean
    });

    const updateAppEvent = useMutation({
        mutationFn: async (appEvent: AppEvent) => {
            await agent.put(`/event/${appEvent.id}`, appEvent)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['appEvents'],
            })
        }
    })

    const createAppEvent = useMutation({
        mutationFn: async (appEvent: AppEvent) => {
            const response = await agent.post('/event/', appEvent)

            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['appEvents'],
            })
        }
    })

    const deleteAppEvent = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/event/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['appEvents'],
            })
        }
    })

    return {
        appEvents,
        isPending,
        updateAppEvent,
        createAppEvent,
        deleteAppEvent,
        appEvent,
        isLoadingAppEvent,
    }
}