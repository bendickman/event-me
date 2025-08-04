import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useAppEvents = () => {
    const queryClient = useQueryClient();

    const { data: appEvents, isPending } = useQuery({
        queryKey: ['appEvents'],
        queryFn: async () => {
            const response = await agent.get<PaginatedResults<AppEvent>>('/event?pagesize=25');

            return response.data.items;
        }
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
            await agent.post('/event/', appEvent)
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
    }
}