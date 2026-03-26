import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BusinessProfile,
  Event,
  Job,
  Listing,
  News,
  Service,
  UserRole,
} from "../backend.d";
import {
  sampleEvents,
  sampleJobs,
  sampleListings,
  sampleNews,
  sampleServices,
} from "../data/sampleData";
import { useActor } from "./useActor";

export function useAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return sampleNews as unknown as News[];
      const data = await actor.getAllNews();
      return data.length > 0 ? data : (sampleNews as unknown as News[]);
    },
    enabled: !isFetching,
  });
}

export function useAllJobs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return sampleJobs as unknown as Job[];
      const data = await actor.getAllJobs();
      return data.length > 0 ? data : (sampleJobs as unknown as Job[]);
    },
    enabled: !isFetching,
  });
}

export function useAllListings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      if (!actor) return sampleListings as unknown as Listing[];
      const data = await actor.getAllListings();
      return data.length > 0 ? data : (sampleListings as unknown as Listing[]);
    },
    enabled: !isFetching,
  });
}

export function useAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return sampleServices as unknown as Service[];
      const data = await actor.getAllServices();
      return data.length > 0 ? data : (sampleServices as unknown as Service[]);
    },
    enabled: !isFetching,
  });
}

export function useAllEvents() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return sampleEvents as unknown as Event[];
      const data = await actor.getAllEvents();
      return data.length > 0 ? data : (sampleEvents as unknown as Event[]);
    },
    enabled: !isFetching,
  });
}

export function useAllBusinessProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      if (!actor) return [] as BusinessProfile[];
      return actor.getAllBusinessProfiles();
    },
    enabled: !isFetching,
  });
}

export function usePendingBusinesses() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["pending-businesses"],
    queryFn: async () => {
      if (!actor) return [] as BusinessProfile[];
      return actor.getPendingBusinessProfiles();
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}

export function useCallerRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["caller-role"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !isFetching,
  });
}

export function useCreateNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (news: News) => {
      if (!actor) throw new Error("Not authenticated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actor.createNews(news as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useCreateJob() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (job: Job) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createJob(job as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
}

export function useCreateListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (listing: Listing) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createListing(listing as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useCreateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createService(service as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useCreateEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (event: Event) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createEvent(event as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useCreateBusiness() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: BusinessProfile) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createBusinessProfile(profile as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["businesses"] }),
  });
}

export function useApproveBusiness() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.approveBusiness(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["businesses"] });
      qc.invalidateQueries({ queryKey: ["pending-businesses"] });
    },
  });
}

export function useToggleNewsFeatured() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.toggleNewsFeatured(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useSearchAll(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!actor || !keyword) return null;
      return actor.searchAll(keyword);
    },
    enabled: !isFetching && keyword.length > 2,
  });
}
