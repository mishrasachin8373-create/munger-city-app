import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type ServiceId = bigint;
export interface BusinessProfile {
    id: BusinessProfileId;
    isApproved: boolean;
    contactInfo: ContactInfo;
    ownerPrincipal: Principal;
    createdAt: bigint;
    tier: BusinessTier;
    businessName: string;
    description: string;
    isFeatured: boolean;
    address: string;
    category: string;
}
export type NewsId = bigint;
export interface Listing {
    id: ListingId;
    title: string;
    postedAt: bigint;
    postedBy: Principal;
    contactInfo: ContactInfo;
    description: string;
    isActive: boolean;
    isFeatured: boolean;
    category: string;
    price: bigint;
    images: Array<ExternalBlob>;
}
export type EventId = bigint;
export interface Service {
    id: ServiceId;
    title: string;
    postedAt: bigint;
    postedBy: Principal;
    contactInfo: ContactInfo;
    description: string;
    isActive: boolean;
    priceRange: string;
    isFeatured: boolean;
    category: string;
}
export type JobId = bigint;
export interface Event {
    id: EventId;
    organizer: string;
    title: string;
    postedAt: bigint;
    postedBy: Principal;
    contactInfo: ContactInfo;
    date: bigint;
    time: bigint;
    description: string;
    isFeatured: boolean;
    location: string;
}
export interface Job {
    id: JobId;
    title: string;
    postedAt: bigint;
    postedBy: Principal;
    contactInfo: ContactInfo;
    salary: bigint;
    description: string;
    isActive: boolean;
    company: string;
    isFeatured: boolean;
    location: string;
}
export type ListingId = bigint;
export interface News {
    id: NewsId;
    title: string;
    content: string;
    publishedAt: bigint;
    author: string;
    isFeatured: boolean;
    category: NewsCategory;
    images: Array<ExternalBlob>;
}
export type BusinessProfileId = bigint;
export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum BusinessTier {
    premium = "premium",
    basic = "basic",
    standard = "standard"
}
export enum NewsCategory {
    culture = "culture",
    national = "national",
    local = "local",
    sports = "sports",
    politics = "politics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveBusiness(businessId: BusinessProfileId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBusinessProfile(profile: BusinessProfile): Promise<BusinessProfileId>;
    createEvent(event: Event): Promise<EventId>;
    createJob(job: Job): Promise<JobId>;
    createListing(listing: Listing): Promise<ListingId>;
    createNews(news: News): Promise<NewsId>;
    createService(service: Service): Promise<ServiceId>;
    deleteBusinessProfile(businessId: BusinessProfileId): Promise<void>;
    deleteEvent(eventId: EventId): Promise<void>;
    deleteJob(jobId: JobId): Promise<void>;
    deleteListing(listingId: ListingId): Promise<void>;
    deleteNews(newsId: NewsId): Promise<void>;
    deleteService(serviceId: ServiceId): Promise<void>;
    getAllBusinessProfiles(): Promise<Array<BusinessProfile>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllJobs(): Promise<Array<Job>>;
    getAllListings(): Promise<Array<Listing>>;
    getAllNews(): Promise<Array<News>>;
    getAllServices(): Promise<Array<Service>>;
    getBusinessProfile(businessId: BusinessProfileId): Promise<BusinessProfile | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEvent(eventId: EventId): Promise<Event | null>;
    getFeaturedBusinessProfiles(): Promise<Array<BusinessProfile>>;
    getFeaturedEvents(): Promise<Array<Event>>;
    getFeaturedJobs(): Promise<Array<Job>>;
    getFeaturedListings(): Promise<Array<Listing>>;
    getFeaturedNews(): Promise<Array<News>>;
    getFeaturedServices(): Promise<Array<Service>>;
    getJob(jobId: JobId): Promise<Job | null>;
    getListing(listingId: ListingId): Promise<Listing | null>;
    getNews(newsId: NewsId): Promise<News | null>;
    getPendingBusinessProfiles(): Promise<Array<BusinessProfile>>;
    getService(serviceId: ServiceId): Promise<Service | null>;
    getStats(): Promise<{
        listingsCount: bigint;
        servicesCount: bigint;
        businessesCount: bigint;
        newsCount: bigint;
        jobsCount: bigint;
        eventsCount: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchAll(keyword: string): Promise<{
        businesses: Array<BusinessProfile>;
        listings: Array<Listing>;
        jobs: Array<Job>;
        news: Array<News>;
        events: Array<Event>;
        services: Array<Service>;
    }>;
    searchBusinessProfiles(keyword: string): Promise<Array<BusinessProfile>>;
    searchEvents(keyword: string): Promise<Array<Event>>;
    searchJobs(keyword: string): Promise<Array<Job>>;
    searchListings(keyword: string): Promise<Array<Listing>>;
    searchNews(keyword: string): Promise<Array<News>>;
    searchServices(keyword: string): Promise<Array<Service>>;
    toggleBusinessFeatured(businessId: BusinessProfileId): Promise<void>;
    toggleEventFeatured(eventId: EventId): Promise<void>;
    toggleJobFeatured(jobId: JobId): Promise<void>;
    toggleListingFeatured(listingId: ListingId): Promise<void>;
    toggleNewsFeatured(newsId: NewsId): Promise<void>;
    toggleServiceFeatured(serviceId: ServiceId): Promise<void>;
    updateBusinessProfile(businessId: BusinessProfileId, profile: BusinessProfile): Promise<void>;
    updateEvent(eventId: EventId, event: Event): Promise<void>;
    updateJob(jobId: JobId, job: Job): Promise<void>;
    updateListing(listingId: ListingId, listing: Listing): Promise<void>;
    updateNews(newsId: NewsId, news: News): Promise<void>;
    updateService(serviceId: ServiceId, service: Service): Promise<void>;
}
