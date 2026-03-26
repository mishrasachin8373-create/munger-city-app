import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type NewsId = Nat;
  type JobId = Nat;
  type ListingId = Nat;
  type ServiceId = Nat;
  type EventId = Nat;
  type BusinessProfileId = Nat;

  type ContactInfo = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type BusinessTier = {
    #basic;
    #standard;
    #premium;
  };

  public type NewsCategory = {
    #local;
    #national;
    #sports;
    #politics;
    #culture;
  };

  public type News = {
    id : NewsId;
    title : Text;
    content : Text;
    images : [Storage.ExternalBlob];
    category : NewsCategory;
    author : Text;
    publishedAt : Int;
    isFeatured : Bool;
  };

  public type Job = {
    id : JobId;
    title : Text;
    company : Text;
    description : Text;
    location : Text;
    salary : Int;
    contactInfo : ContactInfo;
    postedBy : Principal;
    postedAt : Int;
    isActive : Bool;
    isFeatured : Bool;
  };

  public type Listing = {
    id : ListingId;
    title : Text;
    description : Text;
    price : Int;
    category : Text;
    images : [Storage.ExternalBlob];
    contactInfo : ContactInfo;
    postedBy : Principal;
    postedAt : Int;
    isActive : Bool;
    isFeatured : Bool;
  };

  public type Service = {
    id : ServiceId;
    title : Text;
    description : Text;
    priceRange : Text;
    category : Text;
    contactInfo : ContactInfo;
    postedBy : Principal;
    postedAt : Int;
    isActive : Bool;
    isFeatured : Bool;
  };

  public type Event = {
    id : EventId;
    title : Text;
    description : Text;
    date : Int;
    time : Int;
    location : Text;
    organizer : Text;
    contactInfo : ContactInfo;
    postedBy : Principal;
    postedAt : Int;
    isFeatured : Bool;
  };

  public type BusinessProfile = {
    id : BusinessProfileId;
    ownerPrincipal : Principal;
    businessName : Text;
    description : Text;
    category : Text;
    contactInfo : ContactInfo;
    address : Text;
    tier : BusinessTier;
    isApproved : Bool;
    isFeatured : Bool;
    createdAt : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  module News {
    public func compare(news1 : News, news2 : News) : Order.Order {
      Text.compare(news1.title, news2.title);
    };
  };

  module Job {
    public func compare(job1 : Job, job2 : Job) : Order.Order {
      Text.compare(job1.title, job2.title);
    };
  };

  module Listing {
    public func compare(listing1 : Listing, listing2 : Listing) : Order.Order {
      Text.compare(listing1.title, listing2.title);
    };
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : Order.Order {
      Text.compare(service1.title, service2.title);
    };
  };

  module Event {
    public func compare(event1 : Event, event2 : Event) : Order.Order {
      Text.compare(event1.title, event2.title);
    };
  };

  module BusinessProfile {
    public func compare(business1 : BusinessProfile, business2 : BusinessProfile) : Order.Order {
      Text.compare(business1.businessName, business2.businessName);
    };
  };

  var nextNewsId = 1;
  var nextJobId = 1;
  var nextListingId = 1;
  var nextServiceId = 1;
  var nextEventId = 1;
  var nextBusinessProfileId = 1;

  let newsItems = Map.empty<NewsId, News>();
  let jobs = Map.empty<JobId, Job>();
  let listings = Map.empty<ListingId, Listing>();
  let services = Map.empty<ServiceId, Service>();
  let events = Map.empty<EventId, Event>();
  let businessProfiles = Map.empty<BusinessProfileId, BusinessProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // News Management (Admin only)
  public shared ({ caller }) func createNews(news : News) : async NewsId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create news");
    };
    let newsId = nextNewsId;
    nextNewsId += 1;
    let newNews = {
      news with
      id = newsId;
      publishedAt = Time.now();
    };
    newsItems.add(newsId, newNews);
    newsId;
  };

  public shared ({ caller }) func updateNews(newsId : NewsId, news : News) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update news");
    };
    if (not newsItems.containsKey(newsId)) {
      Runtime.trap("News not found");
    };
    let updatedNews = {
      news with
      id = newsId;
    };
    newsItems.add(newsId, updatedNews);
  };

  public shared ({ caller }) func deleteNews(newsId : NewsId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete news");
    };
    if (not newsItems.containsKey(newsId)) {
      Runtime.trap("News not found");
    };
    newsItems.remove(newsId);
  };

  public shared ({ caller }) func toggleNewsFeatured(newsId : NewsId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (newsItems.get(newsId)) {
      case (null) { Runtime.trap("News not found") };
      case (?news) {
        let updated = { news with isFeatured = not news.isFeatured };
        newsItems.add(newsId, updated);
      };
    };
  };

  // Job Management
  public shared ({ caller }) func createJob(job : Job) : async JobId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create jobs");
    };
    let jobId = nextJobId;
    nextJobId += 1;
    let newJob = {
      job with
      id = jobId;
      postedBy = caller;
      postedAt = Time.now();
      isActive = true;
      isFeatured = false;
    };
    jobs.add(jobId, newJob);
    jobId;
  };

  public shared ({ caller }) func updateJob(jobId : JobId, job : Job) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update jobs");
    };
    switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?existingJob) {
        if (existingJob.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own jobs");
        };
        let updatedJob = {
          job with
          id = jobId;
          postedBy = existingJob.postedBy;
          postedAt = existingJob.postedAt;
        };
        jobs.add(jobId, updatedJob);
      };
    };
  };

  public shared ({ caller }) func deleteJob(jobId : JobId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete jobs");
    };
    switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        if (job.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own jobs");
        };
        jobs.remove(jobId);
      };
    };
  };

  public shared ({ caller }) func toggleJobFeatured(jobId : JobId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (jobs.get(jobId)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) {
        let updated = { job with isFeatured = not job.isFeatured };
        jobs.add(jobId, updated);
      };
    };
  };

  // Listing Management
  public shared ({ caller }) func createListing(listing : Listing) : async ListingId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create listings");
    };
    let listingId = nextListingId;
    nextListingId += 1;
    let newListing = {
      listing with
      id = listingId;
      postedBy = caller;
      postedAt = Time.now();
      isActive = true;
      isFeatured = false;
    };
    listings.add(listingId, newListing);
    listingId;
  };

  public shared ({ caller }) func updateListing(listingId : ListingId, listing : Listing) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update listings");
    };
    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?existingListing) {
        if (existingListing.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own listings");
        };
        let updatedListing = {
          listing with
          id = listingId;
          postedBy = existingListing.postedBy;
          postedAt = existingListing.postedAt;
        };
        listings.add(listingId, updatedListing);
      };
    };
  };

  public shared ({ caller }) func deleteListing(listingId : ListingId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete listings");
    };
    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        if (listing.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own listings");
        };
        listings.remove(listingId);
      };
    };
  };

  public shared ({ caller }) func toggleListingFeatured(listingId : ListingId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        let updated = { listing with isFeatured = not listing.isFeatured };
        listings.add(listingId, updated);
      };
    };
  };

  // Service Management
  public shared ({ caller }) func createService(service : Service) : async ServiceId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create services");
    };
    let serviceId = nextServiceId;
    nextServiceId += 1;
    let newService = {
      service with
      id = serviceId;
      postedBy = caller;
      postedAt = Time.now();
      isActive = true;
      isFeatured = false;
    };
    services.add(serviceId, newService);
    serviceId;
  };

  public shared ({ caller }) func updateService(serviceId : ServiceId, service : Service) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update services");
    };
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?existingService) {
        if (existingService.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own services");
        };
        let updatedService = {
          service with
          id = serviceId;
          postedBy = existingService.postedBy;
          postedAt = existingService.postedAt;
        };
        services.add(serviceId, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(serviceId : ServiceId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete services");
    };
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) {
        if (service.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own services");
        };
        services.remove(serviceId);
      };
    };
  };

  public shared ({ caller }) func toggleServiceFeatured(serviceId : ServiceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) {
        let updated = { service with isFeatured = not service.isFeatured };
        services.add(serviceId, updated);
      };
    };
  };

  // Event Management
  public shared ({ caller }) func createEvent(event : Event) : async EventId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create events");
    };
    let eventId = nextEventId;
    nextEventId += 1;
    let newEvent = {
      event with
      id = eventId;
      postedBy = caller;
      postedAt = Time.now();
      isFeatured = false;
    };
    events.add(eventId, newEvent);
    eventId;
  };

  public shared ({ caller }) func updateEvent(eventId : EventId, event : Event) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update events");
    };
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?existingEvent) {
        if (existingEvent.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own events");
        };
        let updatedEvent = {
          event with
          id = eventId;
          postedBy = existingEvent.postedBy;
          postedAt = existingEvent.postedAt;
        };
        events.add(eventId, updatedEvent);
      };
    };
  };

  public shared ({ caller }) func deleteEvent(eventId : EventId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete events");
    };
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?event) {
        if (event.postedBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own events");
        };
        events.remove(eventId);
      };
    };
  };

  public shared ({ caller }) func toggleEventFeatured(eventId : EventId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?event) {
        let updated = { event with isFeatured = not event.isFeatured };
        events.add(eventId, updated);
      };
    };
  };

  // Business Profile Management
  public shared ({ caller }) func createBusinessProfile(profile : BusinessProfile) : async BusinessProfileId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create business profiles");
    };
    let businessId = nextBusinessProfileId;
    nextBusinessProfileId += 1;
    let newProfile = {
      profile with
      id = businessId;
      ownerPrincipal = caller;
      isApproved = false;
      isFeatured = false;
      createdAt = Time.now();
    };
    businessProfiles.add(businessId, newProfile);
    businessId;
  };

  public shared ({ caller }) func updateBusinessProfile(businessId : BusinessProfileId, profile : BusinessProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update business profiles");
    };
    switch (businessProfiles.get(businessId)) {
      case (null) { Runtime.trap("Business profile not found") };
      case (?existingProfile) {
        if (existingProfile.ownerPrincipal != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own business profile");
        };
        let updatedProfile = {
          profile with
          id = businessId;
          ownerPrincipal = existingProfile.ownerPrincipal;
          createdAt = existingProfile.createdAt;
          isApproved = existingProfile.isApproved;
        };
        businessProfiles.add(businessId, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func deleteBusinessProfile(businessId : BusinessProfileId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete business profiles");
    };
    switch (businessProfiles.get(businessId)) {
      case (null) { Runtime.trap("Business profile not found") };
      case (?profile) {
        if (profile.ownerPrincipal != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own business profile");
        };
        businessProfiles.remove(businessId);
      };
    };
  };

  public shared ({ caller }) func approveBusiness(businessId : BusinessProfileId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve businesses");
    };
    switch (businessProfiles.get(businessId)) {
      case (null) { Runtime.trap("Business not found") };
      case (?business) {
        let updatedBusiness = {
          business with
          isApproved = true;
        };
        businessProfiles.add(businessId, updatedBusiness);
      };
    };
  };

  public shared ({ caller }) func toggleBusinessFeatured(businessId : BusinessProfileId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (businessProfiles.get(businessId)) {
      case (null) { Runtime.trap("Business not found") };
      case (?business) {
        let updated = { business with isFeatured = not business.isFeatured };
        businessProfiles.add(businessId, updated);
      };
    };
  };

  // Public Query Functions (No authentication required)
  public query func getAllNews() : async [News] {
    newsItems.values().toArray().sort();
  };

  public query func getNews(newsId : NewsId) : async ?News {
    newsItems.get(newsId);
  };

  public query func searchNews(keyword : Text) : async [News] {
    newsItems.values().toArray().sort().filter(
      func(news) {
        news.title.contains(#text keyword) or news.content.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedNews() : async [News] {
    newsItems.values().toArray().sort().filter(
      func(news) { news.isFeatured }
    );
  };

  public query func getAllJobs() : async [Job] {
    jobs.values().toArray().sort();
  };

  public query func getJob(jobId : JobId) : async ?Job {
    jobs.get(jobId);
  };

  public query func searchJobs(keyword : Text) : async [Job] {
    jobs.values().toArray().sort().filter(
      func(job) {
        job.title.contains(#text keyword) or job.description.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedJobs() : async [Job] {
    jobs.values().toArray().sort().filter(
      func(job) { job.isFeatured }
    );
  };

  public query func getAllListings() : async [Listing] {
    listings.values().toArray().sort();
  };

  public query func getListing(listingId : ListingId) : async ?Listing {
    listings.get(listingId);
  };

  public query func searchListings(keyword : Text) : async [Listing] {
    listings.values().toArray().sort().filter(
      func(listing) {
        listing.title.contains(#text keyword) or listing.description.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedListings() : async [Listing] {
    listings.values().toArray().sort().filter(
      func(listing) { listing.isFeatured }
    );
  };

  public query func getAllServices() : async [Service] {
    services.values().toArray().sort();
  };

  public query func getService(serviceId : ServiceId) : async ?Service {
    services.get(serviceId);
  };

  public query func searchServices(keyword : Text) : async [Service] {
    services.values().toArray().sort().filter(
      func(service) {
        service.title.contains(#text keyword) or service.description.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedServices() : async [Service] {
    services.values().toArray().sort().filter(
      func(service) { service.isFeatured }
    );
  };

  public query func getAllEvents() : async [Event] {
    events.values().toArray().sort();
  };

  public query func getEvent(eventId : EventId) : async ?Event {
    events.get(eventId);
  };

  public query func searchEvents(keyword : Text) : async [Event] {
    events.values().toArray().sort().filter(
      func(event) {
        event.title.contains(#text keyword) or event.description.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedEvents() : async [Event] {
    events.values().toArray().sort().filter(
      func(event) { event.isFeatured }
    );
  };

  public query func getAllBusinessProfiles() : async [BusinessProfile] {
    businessProfiles.values().toArray().sort();
  };

  public query func getBusinessProfile(businessId : BusinessProfileId) : async ?BusinessProfile {
    businessProfiles.get(businessId);
  };

  public query func searchBusinessProfiles(keyword : Text) : async [BusinessProfile] {
    businessProfiles.values().toArray().sort().filter(
      func(business) {
        business.businessName.contains(#text keyword) or business.description.contains(#text keyword)
      }
    );
  };

  public query func getFeaturedBusinessProfiles() : async [BusinessProfile] {
    businessProfiles.values().toArray().sort().filter(
      func(business) { business.isFeatured }
    );
  };

  public query func getPendingBusinessProfiles() : async [BusinessProfile] {
    businessProfiles.values().toArray().sort().filter(
      func(business) { not business.isApproved }
    );
  };

  public query func getStats() : async {
    newsCount : Nat;
    jobsCount : Nat;
    listingsCount : Nat;
    servicesCount : Nat;
    eventsCount : Nat;
    businessesCount : Nat;
  } {
    {
      newsCount = newsItems.size();
      jobsCount = jobs.size();
      listingsCount = listings.size();
      servicesCount = services.size();
      eventsCount = events.size();
      businessesCount = businessProfiles.size();
    };
  };

  public query func searchAll(keyword : Text) : async {
    news : [News];
    jobs : [Job];
    listings : [Listing];
    services : [Service];
    events : [Event];
    businesses : [BusinessProfile];
  } {
    {
      news = searchNewsInternal(keyword);
      jobs = searchJobsInternal(keyword);
      listings = searchListingsInternal(keyword);
      services = searchServicesInternal(keyword);
      events = searchEventsInternal(keyword);
      businesses = searchBusinessProfilesInternal(keyword);
    };
  };

  func searchNewsInternal(keyword : Text) : [News] {
    newsItems.values().toArray().sort().filter(
      func(news) {
        news.title.contains(#text keyword) or news.content.contains(#text keyword)
      }
    );
  };

  func searchJobsInternal(keyword : Text) : [Job] {
    jobs.values().toArray().sort().filter(
      func(job) {
        job.title.contains(#text keyword) or job.description.contains(#text keyword)
      }
    );
  };

  func searchListingsInternal(keyword : Text) : [Listing] {
    listings.values().toArray().sort().filter(
      func(listing) {
        listing.title.contains(#text keyword) or listing.description.contains(#text keyword)
      }
    );
  };

  func searchServicesInternal(keyword : Text) : [Service] {
    services.values().toArray().sort().filter(
      func(service) {
        service.title.contains(#text keyword) or service.description.contains(#text keyword)
      }
    );
  };

  func searchEventsInternal(keyword : Text) : [Event] {
    events.values().toArray().sort().filter(
      func(event) {
        event.title.contains(#text keyword) or event.description.contains(#text keyword)
      }
    );
  };

  func searchBusinessProfilesInternal(keyword : Text) : [BusinessProfile] {
    businessProfiles.values().toArray().sort().filter(
      func(business) {
        business.businessName.contains(#text keyword) or business.description.contains(#text keyword)
      }
    );
  };
};
