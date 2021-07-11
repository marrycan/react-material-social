import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

import { fb_GetNotifications, fb_GetUserProfile, fb_GetCardsInfo, fb_GetCustomerInfo, fb_GetSubscription, fb_GetAccountsOfUser, fb_GetAPIsOfUser, fb_GetTagsOfUser } from "../../utils/firebaseRequest";
import { stripe_GetPlans, stripe_GetSubscriptionsByCustomer, } from "../../utils/stripeRequest";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: {},
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  card: {},
  customer: {},
  plans: {},
  addressBook: [],
  invoices: [],
  notifications: {},
  subscription: {},
  transaction: {},
  accounts: [],
  api: []
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    //GET SUBSCRIPTION
    getSubscriptionsSuccess(state, action) {
      state.isLoading = false;
      state.subscription = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(
        state.userList,
        (user) => user.id !== action.payload
      );
      state.userList = deleteUser;
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed,
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },

    // GET GALLERY
    getGallerySuccess(state, action) {
      state.isLoading = false;
      state.gallery = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET CARDS
    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.card = action.payload;
    },

    //GET CUSTOMERS
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    //GET Plans
    getPlansSuccess(state, action) {
      state.isLoading = false;
      state.plans = action.payload;
    },

    //GET Transations
    getTransationSuccess(state, action) {
      state.isLoading = false;
      state.transaction = action.payload;
    },

    //GET Accounts
    getAccountsSuccess(state, action) {
      state.isLoading = false;
      state.accounts = action.payload;
    },

    //GET APIs
    getAPIsSuccess(state, action) {
      state.isLoading = false;
      state.api = action.payload;
    },

    //GET Tags
    getTagsSuccess(state, action) {
      state.isLoading = false;
      state.tag = action.payload;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // GET INVOICES
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const data = await fb_GetUserProfile(uid);
    dispatch(slice.actions.getProfileSuccess(data));
  };
}

// ----------------------------------------------------------------------

export function getSubscription(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = await fb_GetSubscription(uid);
      dispatch(slice.actions.getSubscriptionsSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/posts");
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/social/followers");
      dispatch(slice.actions.getFollowersSuccess(response.data.followers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFriends() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/social/friends");
      dispatch(slice.actions.getFriendsSuccess(response.data.friends));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getGallery() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/social/gallery");
      dispatch(slice.actions.getGallerySuccess(response.data.gallery));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/manage-users");
      dispatch(slice.actions.getUserListSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCards(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fb_GetCardsInfo(uid);
      dispatch(slice.actions.getCardsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCustomers(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fb_GetCustomerInfo(uid);
      dispatch(slice.actions.getCustomersSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPlans() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await stripe_GetPlans();
      dispatch(slice.actions.getPlansSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getTransactionOfCustomer(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await stripe_GetSubscriptionsByCustomer({ id });
      console.log(response);
      dispatch(slice.actions.getTransationSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAccountsOfUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fb_GetAccountsOfUser(id);
      dispatch(slice.actions.getAccountsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAPIsOfUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fb_GetAPIsOfUser(id);
      dispatch(slice.actions.getAPIsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAddressBook() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/account/address-book");
      dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInvoices() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/account/invoices");
      dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const data = await fb_GetNotifications(uid);
    dispatch(slice.actions.getNotificationsSuccess(data));
  };
}

// ----------------------------------------------------------------------

export function getTags(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const data = await fb_GetTagsOfUser(uid);
    dispatch(slice.actions.getTagsSuccess(data));
  };
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/all");
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

