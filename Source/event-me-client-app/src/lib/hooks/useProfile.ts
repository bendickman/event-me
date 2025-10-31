import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useMemo, useState } from "react";
import type { EditProfileSchema } from "../schemas/editProfileSchema";

export const useProfile = (id?: string, predicate?: string) => {
    const [filter, setFilter] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profile/${id}`);
            return response.data
        },
        enabled: !!id && !predicate
    })

    const { data: followings, isLoading: loadingFollowings } = useQuery<Profile[]>({
        queryKey: ['followings', id, predicate],
        queryFn: async () => {
            const response =
                await agent.get<Profile[]>(`/profile/${id}/follow-list?predicate=${predicate}`);
            return response.data;
        },
        enabled: !!id && !!predicate
    });

    const { data: userEvents, isLoading: loadingUserEvents } = useQuery({
        queryKey: ['user-events', filter],
        queryFn: async () => {
            const response = await agent.get<AppEvent[]>(`/profile/${id}/events`, {
                params: {
                    filter
                }
            });
            return response.data
        },
        enabled: !!id && !!filter
    });

    const updateProfile = useMutation({
        mutationFn: async (profile: EditProfileSchema) => {
            await agent.put(`/profile`, profile);
        },
        onSuccess: (_, profile) => {
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    displayName: profile.displayName,
                    bio: profile.bio
                }
            });
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    displayName: profile.displayName
                }
            });
        }
    })

    const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`/profile/${id}/follow`)
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                queryClient.invalidateQueries({ queryKey: ['followings', id, 'followers'] })
                if (!profile || profile.followersCount === undefined) return profile;
                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following
                        ? profile.followersCount - 1
                        : profile.followersCount + 1
                }
            })
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

    return {
        profile,
        loadingProfile,
        isCurrentUser,
        updateProfile,
        updateFollowing,
        followings,
        loadingFollowings,
        userEvents: userEvents,
        loadingUserEvents: loadingUserEvents,
        setFilter,
        filter
    }
}

