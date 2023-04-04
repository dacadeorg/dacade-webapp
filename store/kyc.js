/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import snsWebSdk from "@sumsub/websdk";
import { auth as firebaseAuth } from '@/plugins/firebase'
import { sleep } from "~/utilities";

let snsWebSdkInstance = null;
export const state = () => ({
  sumsubToken: null,
  showModal: false,
  loading: false,
  verifying: false,
  completed: false,
  reasonText: null,
  title: null,
  completedText: null,
  actionText: null,
  completedActionText: null,
  completedAction: null,
})

export const mutations = {
  setSumsubToken(state, payload) {
    state.sumsubToken = payload
  },
  setShowModal(state, payload) {
    state.showModal = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setVerifying(state, payload) {
    state.verifying = payload;
  },
  setCompleted(state, payload) {
    state.completed = payload
  },
  setText(state, payload) {
    state.reasonText = payload.reasonText;
    state.title = payload.title;
    state.completedText = payload.completedText;
    state.actionText = payload.actionText;
    state.completedActionText = payload.completedActionText;
    state.completedAction = payload.completedAction;
  },
}

export const actions = {

  async getSumsubToken({ commit }) {
    const user = firebaseAuth.currentUser
    if (user) {
      try {
        const { data } = await this.$api.post('users/sumsub/get-access-token')
        const token = data?.token
        commit('setSumsubToken', token)
        return token
      } catch (e) {
        console.log(e)
        return null
      }
    }
  },
  openVerificationModal({ commit, dispatch }, payload) {
    if(this.getters['user/isKycVerified']){
      dispatch('closeVerificationModal');
      dispatch('triggerCompleteAction');
      return;
    }
    commit('setShowModal', true);
    // dispatch('launchWebSdk');
    commit('setText', payload || {});
  },
  closeVerificationModal({ commit }) {
    commit('setShowModal', false);
    commit('setLoading', false);
    commit('setVerifying', false);
    if (snsWebSdkInstance) {
      snsWebSdkInstance?.destroy()
    }
  },
  async triggerCompleteAction({ commit, dispatch, state }) {
    if (!state.completedAction) return;
    try {
      await state.completedAction()
    } catch (e) {
      console.log(e)
    }
  },
  async completeSumSubVerification({ commit, dispatch }, payload) {
    // const {reviewStatus, reviewResult} = payload
    // if (reviewStatus === 'completed' && reviewResult?.reviewAnswer === 'GREEN') {
    // complete verification
    // delay for 2 seconds to allow the user to see the success message
    await sleep(2000);
    commit('setLoading', true);
    await this.dispatch('user/fetch');
    commit('setCompleted', true)
    commit('setVerifying', false);
    commit('setLoading', false);
    // }
  },
  async launchWebSdk({ commit, dispatch, getters }) {
    commit('setLoading', true);
    const accessToken = await dispatch('getSumsubToken');
    if (!accessToken) return;
    const user = this.getters['user/get'];
    snsWebSdkInstance = snsWebSdk.init(
      accessToken,
      // token update callback, must return Promise
      // Access token expired
      // get a new one and pass it to the callback to re-initiate the WebSDK
      () => dispatch('getSumsubToken')
    )
      .withConf({
        lang: 'en',
        email: user.email,
        // uiConf: {
        //   customCss: "https://url.com/styles.css"
        // },
      })
      .withOptions({ addViewportTag: false, adaptIframeHeight: true })
      .on('idCheck.applicantStatus', (payload) => {
        dispatch('completeSumSubVerification');
      })
      .build();

    // you are ready to go:
    // just launch the WebSDK by providing the container element for it
    await sleep(2000);
    snsWebSdkInstance.launch('#sumsub-websdk-container')

    await sleep(1000);
    commit('setLoading', false);
    commit('setVerifying', true);
  }
}

export const getters = {
  sumsubToken(state) {
    return state.sumsubToken
  },
  showModal(state) {
    return state.showModal;
  },
  loading(state) {
    return state.loading;
  },
  verifying(state) {
    return state.verifying;
  },
  completed(state) {
    return state.completed;
  },
  reasonText(state) {
    return state.reasonText;
  },
  title(state) {
    return state.title;
  },
  completedText(state) {
    return state.completedText;
  },
  actionText(state) {
    return state.actionText;
  },
  completedActionText(state) {
    return state.completedActionText;
  },
}
