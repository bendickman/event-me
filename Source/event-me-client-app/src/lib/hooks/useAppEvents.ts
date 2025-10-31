import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";
import { useStore } from "./useStore";

export const useAppEvents = (id?: string) => {
    const { appEventStore: { filter, startDate } } = useStore();
    const queryClient = useQueryClient();
    const location = useLocation();
    const { currentUser } = useAccount();

    const { data: eventsGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage }
        = useInfiniteQuery<PaginatedResults<AppEvent, string>>({
            queryKey: ['appEvents', filter, startDate],
            queryFn: async ({ pageParam = null }) => {
                const response = await agent.get<PaginatedResults<AppEvent, string>>('/event', {
                    params: {
                        cursor: pageParam,
                        pageSize: 3,
                        filter,
                        startDate
                    }
                });
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData,
            initialPageParam: null,
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            enabled: !id && location.pathname === '/events' && !!currentUser,
            select: data => ({
                ...data,
                pages: data.pages.map((page) => ({
                    ...page,
                    items: page.items.map(appEvent => {
                        const host = appEvent.attendees.find(x => x.id === appEvent.hostId);
                        return {
                            ...appEvent,
                            isHost: currentUser?.id === appEvent.hostId,
                            isGoing: appEvent.attendees.some(x => x.id === currentUser?.id),
                            hostImageUrl: host?.imageUrl
                        }
                    })
                }))
            })
        });

    const { data: appEvent, isLoading: isLoadingAppEvent } = useQuery({
        queryKey: ['appEvents', id],
        queryFn: async () => {
            const response = await agent.get<AppEvent>(`/event/${id}`);

            return response.data;
        },
        enabled: !!id && !!currentUser//enabled if we have an id & logged in user, (!! converts to boolean)
    });

    const updateAppEvent = useMutation({
        mutationFn: async (updatedAppEvent: AppEvent) => {
            await agent.put('event', updatedAppEvent)
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
        eventsGroup,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        updateAppEvent,
        createAppEvent,
        deleteAppEvent,
        appEvent,
        isLoadingAppEvent,
    }
}