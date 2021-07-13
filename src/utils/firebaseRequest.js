import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { fDate } from "./formatTime";

// ----------------------------------------------------------------------

export function fb_SetNotifications(uid, notifications) {
  const docRef = firebase.firestore().collection("notifications").doc(uid);
  return docRef.set(notifications);
}

// ----------------------------------------------------------------------

export async function fb_GetNotifications(uid) {
  const docRef = await firebase
    .firestore()
    .collection("notifications")
    .doc(uid)
    .get();
  return docRef.data() ? docRef.data() : {};
}

// ----------------------------------------------------------------------

export async function fb_GetUserProfile(uid) {
  const docRef = await firebase.firestore().collection("users").doc(uid).get();
  return docRef.data() ? docRef.data() : {};
}

// ----------------------------------------------------------------------

export async function fb_UpdateUserProfile(uid, data) {
  const docRef = await firebase.firestore().collection("users").doc(uid);
  return docRef.update(data);
}

// ----------------------------------------------------------------------

export async function fb_ChangePassword(newPassword) {
  const user = await firebase.auth().currentUser;
  return user.updatePassword(newPassword).then((data) => {
    return data;
  }).catch(err => {
    return { err };
  })
}

export async function fb_ConfirmOldPassword(oldPassword) {
  const user = await firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email, oldPassword);
  return user.reauthenticateAndRetrieveDataWithCredential(cred)
}

// ----------------------------------------------------------------------

export async function fb_AddPayment(uid, card) {
  const docRef = await firebase
    .firestore()
    .collection("cards")
    .doc(`${uid}`)
  return docRef.set(card);
}

// ----------------------------------------------------------------------

export async function fb_AddCustomer(uid, customer) {
  const docRef = await firebase
    .firestore()
    .collection("customers")
    .doc(`${uid}`)
  return docRef.set(customer);
}

// ----------------------------------------------------------------------

export async function fb_GetCardsInfo(uid) {
  const docRef = await firebase
    .firestore()
    .collection("cards")
    .doc(uid)
    .get()
  return docRef.data() ? docRef.data() : {};
}

// ----------------------------------------------------------------------

export async function fb_GetCustomerInfo(uid) {
  const docRef = await firebase
    .firestore()
    .collection("customers")
    .doc(uid)
    .get()
  return docRef.data() ? docRef.data() : {};
}

// ----------------------------------------------------------------------
export async function fb_AddSubscription(uid, subscription) {
  const docRef = await firebase
    .firestore()
    .collection("subscriptions")
    .doc(`${uid}`)
  return docRef.set(subscription);
}

//------------------------------------------------------------------------
export async function fb_GetSubscription(uid) {
  const docRef = await firebase
    .firestore()
    .collection("subscriptions")
    .doc(uid)
    .get()
  return docRef.data() ? docRef.data() : {};
}

//------------------------------------------------------------------------
export async function fb_DeleteSubscription(uid) {
  const docRef = await firebase
    .firestore()
    .collection("subscriptions")
    .doc(uid)
  return docRef.set({});
}

//------------------------------------------------------------------------
export async function fb_AddAccountByUserId(uid, data) {
  //add created_dt
  data.created_dt = fDate(new Date());

  //add id
  data.id = Date.now() + Math.random();

  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  if (updateData.account) {
    updateData.account.push(data);
  } else {
    updateData.account = [];
    updateData.account.push(data);
  }

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_AddAccountAdjustmentByUserId(uid, accountId, data) {

  //add created_dt
  data.created_dt = fDate(new Date());

  //add id
  data.id = Date.now() + Math.random();

  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  if (updateData.adjustment) {
    if (updateData.adjustment[accountId]) {
      updateData.adjustment[accountId].push(data)
    } else {
      updateData.adjustment[accountId] = [];
      updateData.adjustment[accountId].push(data);
    }
  } else {
    updateData.adjustment = {};
    updateData.adjustment[accountId] = [];
    updateData.adjustment[accountId].push(data);
  }
  console.log(updateData);

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_AddAPIByUserId(uid, data) {
  //add id
  data.id = Date.now() + Math.random();

  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  if (updateData.api) {
    updateData.api.push(data);
  } else {
    updateData.api = [];
    updateData.api.push(data);
  }

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_GetAccountsOfUser(uid) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  if (docRef.data().account)
    return docRef.data().account;
  else
    return []
}

//------------------------------------------------------------------------
export async function fb_GetAPIsOfUser(uid) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let result = docRef.data().api;
  if (result) {
    if (result.length > 5) {
      result.reverse()
      result.length = 5;
      return result;
    } else
      return result
  }
  else
    return []
}

//------------------------------------------------------------------------
export async function fb_UpdateAccountsOfUserByIndex(uid, index, updatedData) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let data = docRef.data();
  data.account[index] = updatedData;
  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(data);
}

//------------------------------------------------------------------------
export async function fb_UpdateAPIsOfUserById(uid, updatedData) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let data = docRef.data();
  let index = data.api.findIndex(ele => ele.id == updatedData.id)
  data.api[index] = updatedData;
  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(data);
}

//------------------------------------------------------------------------
export async function fb_UpdateTimezoneOfUserById(uid, updatedData) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let data = docRef.data();
  data.timezone = updatedData;
  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(data);
}

//------------------------------------------------------------------------
export async function fb_UpdateCurrencyOfUserById(uid, updatedData) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let data = docRef.data();
  data.currency = updatedData;
  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(data);
}

//------------------------------------------------------------------------
export async function fb_AddTagsOfUserById(uid, data) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  if (updateData.tags) {
    updateData.tags.push(data);
  } else {
    updateData.tags = [];
    updateData.tags.push(data);
  }

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_UpdateTagsOfUserById(uid, data, index) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  updateData.tags[index].tag = data.tag;

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_GetTagsOfUser(uid) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  if (docRef.data().tag)
    return docRef.data().tag;
  else
    return []
}

//------------------------------------------------------------------------
export async function fb_DeleteTagsOfUserById(uid, index) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  updateData.tags.splice(index, 1)

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_UpdateAccountAdjustmentOfUserByIndex(uid, adjustmentId, index, updatedData) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
  let data = docRef.data();
  updatedData.created_dt = data.adjustment[adjustmentId][index].created_dt;
  data.adjustment[adjustmentId][index] = updatedData;
  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(data);
}

//------------------------------------------------------------------------
export async function fb_DeleteAdjustmentOfUserByIdAndIndex(uid, adjustmentId, index) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  updateData.adjustment[adjustmentId].splice(index, 1)

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}

//------------------------------------------------------------------------
export async function fb_DeleteAccountOfUserByIndex(uid, index) {
  const docRef = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()

  let updateData = docRef.data();
  updateData.account.splice(index, 1)

  const updateDocRef = await firebase.firestore().collection("users").doc(uid);
  return updateDocRef.update(updateData);
}